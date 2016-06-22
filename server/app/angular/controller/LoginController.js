var app = angular.module("internal");

app.controller("LoginController", function($scope, $http, $location, $rootScope) {
	socketEnabled = false;

	$scope.user = {};

	// adjust navbar to login status
	if($rootScope.user) {
		$('.navbar-right li:nth-child(2)').html('<a href="/profile"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;Profile</a>');
		$('.navbar-right li:nth-child(3)').html('<a href="/logout" target="_self"><i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Logout</a>');
	} else {
		$('.navbar-right li:nth-child(2)').html('<a href="/register"><i class="fa fa-user-plus" aria-hidden="true"></i>&nbsp;Sign Up</a>');
		$('.navbar-right li:nth-child(3)').html('<a href="/login"><i class="fa fa-sign-in" aria-hidden="true"></i>&nbsp;Login</a>');
	}

	$scope.login = function() {
		$http.post(getURL() + '/login', $scope.user)
		.success(function(response) {
			if(response.email == $scope.user.username) {
				$location.path('/profile');
			}
		});
	};
});