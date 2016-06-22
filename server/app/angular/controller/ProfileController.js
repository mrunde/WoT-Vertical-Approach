var app = angular.module("internal");

app.controller("ProfileController", function($scope, $http, $rootScope) {
	socketEnabled = false;
	$scope.user = {};
	$scope.things = {};

	// adjust navbar to login status
	if($rootScope.user) {
		$('.navbar-right li:nth-child(2)').html('<a href="/profile"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;Profile</a>');
		$('.navbar-right li:nth-child(3)').html('<a href="/logout" target="_self"><i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Logout</a>');
	} else {
		$('.navbar-right li:nth-child(2)').html('<a href="/register"><i class="fa fa-user-plus" aria-hidden="true"></i>&nbsp;Sign Up</a>');
		$('.navbar-right li:nth-child(3)').html('<a href="/login"><i class="fa fa-sign-in" aria-hidden="true"></i>&nbsp;Login</a>');
	}

	$http.get(getURL() + '/user').success(function(response) {
		if(response.email){
			$scope.user = response;
			$scope.queryThings($scope.user._id);
		} else {
			window.location.href = '/login';
		}
	});

	$scope.queryThings = function(userid) {
		$http.get(getURL() + '/api/users/' + userid + '/things').success(function(response) {
			$scope.things = response;
		});
	};

});