var app = angular.module("internal");

app.controller("LoginController", function($scope, $http, $location) {
	$scope.user = {};

	$scope.login = function() {
		$http.post(getURL() + '/login', $scope.user)
		.success(function(response) {
			if(response.email == $scope.user.username) {
				$location.path('/profile');
			}
		});
	};
});