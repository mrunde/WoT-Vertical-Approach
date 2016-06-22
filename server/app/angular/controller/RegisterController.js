var app = angular.module("internal");

app.controller("RegisterController", function($scope, $http, $rootScope) {
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

	$('#register_success').hide();
	$('#register_error').hide();

	$scope.register = function() {
		$('#register_success').hide();
		$('#register_error').hide();
		$http.post(getURL() + '/register', $scope.user)
		.success(function(response) {
			$('#register_email').val('');
			$('#register_password').val('');
			if(response.email == $scope.user.email) {
				$('#register_success').show(800);
			}
			else if(response.message) {
				$('#register_error').html("<strong>Error: </strong>" + response.message);
				$('#register_error').show(800);
			}
		});
	}
});