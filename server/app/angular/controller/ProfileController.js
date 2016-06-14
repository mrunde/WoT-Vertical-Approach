var app = angular.module("internal");

app.controller("ProfileController", function($scope, $http) {
	$scope.user = {};

	$http.get('http://localhost:3000/user', $scope.user)
		.success(function(response) {
			if(response.email)
				$scope.user = response;
		});
});