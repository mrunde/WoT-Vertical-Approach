var app = angular.module("internal");

app.controller("LoginController", function($scope, $http) {
	$scope.user = {};

	$scope.login = function() {
		$http.post(getURL() + '/login', $scope.user)
		.success(function(response) {
			if(response.email == $scope.user.username) {
				window.location.href = '/internal#/profile';
			}
		});
	};
});