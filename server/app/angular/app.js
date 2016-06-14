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
		controller: "ProfileController"
	})
	.otherwise({redirectTo: "/login"});
});