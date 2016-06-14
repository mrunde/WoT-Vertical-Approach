var app = angular.module("internal");

app.controller("LoginController", function($scope, $http) {
	$scope.user = {};

	$scope.login = function() {
		console.log($scope.user);
		$http.post('http://localhost:3000/login', $scope.user)
		.success(function(response) {
			if(response.email == $scope.user.username) {
				window.location.href = '/internal#/profile';
			}
		});
	};
});