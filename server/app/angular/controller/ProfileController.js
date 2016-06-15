var app = angular.module("internal");

app.controller("ProfileController", function($scope, $http) {
	$scope.user = {};
	$scope.things = {};

	$http.get(getURL() + '/user').success(function(response) {
		if(response.email){
			$scope.user = response;
			$scope.queryThings($scope.user._id);
		} else {
			window.location.href = '/internal#/';
		}
	});

	$scope.queryThings = function(userid) {
		$http.get(getURL() + '/api/users/' + userid + '/things').success(function(response) {
			$scope.things = response;
		});
	};

});