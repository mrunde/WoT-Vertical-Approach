var app = angular.module("internal", ["ngRoute"]);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when("/", {
		templateUrl: "/angular/templates/map.html",
		controller: "MapController",
		resolve: {
			loggedIn: checkLoggedIn
		}
	})
	.when("/docs", {
		templateUrl: "/docs/index.html"
	})
	.when("/imprint", {
		templateUrl: "/angular/templates/imprint.html",
		controller: "ImprintController",
		resolve: {
			loggedIn: checkLoggedIn
		}
	})
	.when("/login", {
		templateUrl: "/angular/templates/login.html",
		controller: "LoginController",
		resolve: {
			loggedIn: checkLoggedIn
		}
	})
	.when("/register", {
		templateUrl: "/angular/templates/register.html",
		controller: "RegisterController",
		resolve: {
			loggedIn: checkLoggedIn
		}
	})
	.when("/profile", {
		templateUrl: "/angular/templates/profile.html",
		controller: "ProfileController",
		resolve: {
			loggedIn: checkLoggedInWithRedirect
		}
	})
	.when("/thing/:thingId", {
		templateUrl: "/angular/templates/thing.html",
		controller: "ThingController",
		resolve: {
			loggedIn: checkLoggedInWithRedirect
		}
	})
	.when("/help", {
		templateUrl: "/angular/templates/help.html",
		controller: "HelpController",
		resolve: {
			loggedIn: checkLoggedIn
		}
	})
	.otherwise({redirectTo: "/"});

	$locationProvider.html5Mode(true);
});

var checkLoggedInWithRedirect = function($q, $timeout, $http, $location, $rootScope) { 
	// Initialize a new promise 
	var deferred = $q.defer(); 

	// Make an AJAX call to check if the user is logged in 
	$http.get('/user').success(function(user) { 
		// Authenticated 
		if (user._id) {
			$rootScope.user = user;
			deferred.resolve(); 
		}
		// Not Authenticated
		 else { 
			 deferred.reject(); 
			 $location.url('/login'); 
		 } 
	 }); 

	return deferred.promise; 
}; 

var checkLoggedIn = function($q, $timeout, $http, $rootScope) {
	var deferred = $q.defer();

	$http.get('/user').success(function(user) {
		if(user._id) {
			$rootScope.user = user;
			deferred.resolve();
		} else {
			deferred.resolve();
		}
	});

	return deferred.promise;
};