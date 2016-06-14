var app = angular.module("internal");

app.controller("RegisterController", function($scope, $http) {
	$scope.user = {};

	$('#register_success').hide();
	$('#register_error').hide();

	$scope.register = function() {
		$('#register_success').hide();
		$('#register_error').hide();
		$http.post('http://localhost:3000/register', $scope.user)
		.success(function(response) {
			console.log(response);
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