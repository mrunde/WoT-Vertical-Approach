var app = angular.module("internal", ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider.when("/login", {
		templateUrl: "/angular/templates/login.html",
		controller: "LoginController"
	})
	.when("/register", {
		templateUrl: "/angular/templates/register.html",
		controller: "RegisterController"
	})
	.when("/profile", {
		templateUrl: "/angular/templates/profile.html",
		controller: "ProfileController",
		resolve: {
			loggedIn: checkLoggedin
		}
	})
	.when("/thing/:thingId", {
		templateUrl: "/angular/templates/thing.html",
		controller: "ThingController",
		resolve: {
			loggedIn: checkLoggedin
		}
	})
	.otherwise({redirectTo: "/login"});
});

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){ 
	// Initialize a new promise 
	var deferred = $q.defer(); 

	// Make an AJAX call to check if the user is logged in 
	$http.get('/user').success(function(user){ 
		// Authenticated 
		if (user._id) 
			deferred.resolve(); 
		// Not Authenticated
		 else { 
			 $rootScope.message = 'You need to log in.'; 
			 deferred.reject(); 
			 $location.url('/login'); 
		 } 
	 }); 
	return deferred.promise; 
}; 