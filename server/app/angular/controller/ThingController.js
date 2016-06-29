var app = angular.module("internal");

app.controller("ThingController", function($scope, $http, $routeParams, $rootScope) {
	socketEnabled = false;
	let thingId = $routeParams.thingId;
	let sensor;

	$scope.user = {};
	$scope.thing = {};
	$scope.sensors = {};

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
			$scope.queryThing();
		} else {
			window.location.href = '/login';
		}
	});

	$scope.queryThing = function() {
		$http.get(getURL() + '/api/things/' + thingId).success(function(response) {
			$scope.thing = response;
			$scope.querySensors();
		});
	};

	$scope.querySensors = function() {
		$http.get(getURL() + '/api/things/' + thingId + '/sensors').success(function(response) {
			$scope.sensors = response;
		});
	};

	$scope.fillConfigDialog = function(sensorId) {
		for(let i = 0; i < $scope.sensors.length; i++) {
			if($scope.sensors[i]._id == sensorId) {
				sensor = $scope.sensors[i];
				break;
			}
		}
		if(sensor) {
			$('#sensor_config_name').val(sensor.name);
			$('#sensor_config_refLevel').val(sensor.refLevel);
			$('#sensor_config_warnLevel').val(sensor.warnLevel);
			$('#sensor_config_riskLevel').val(sensor.riskLevel);
			$('#sensor_config_interval').val(sensor.interval);
		}
	};


	$scope.saveConfig = function() {
		let sensorUpdate = {
			name: $('#sensor_config_name').val(),
			thingId: $scope.thing._id,
			featureId: sensor.featureId,
			refLevel: $('#sensor_config_refLevel').val(),
			warnLevel: $('#sensor_config_warnLevel').val(),
			riskLevel: $('#sensor_config_riskLevel').val(),
			interval: $('#sensor_config_interval').val(),
			token: $scope.user.token
		};

		$http.put(getURL() + '/api/sensors/' + sensor._id, sensorUpdate).success(function(response) {
			for(let i = 0; i < $scope.sensors.length; i++) {
				if($scope.sensors[i]._id == sensor._id) {
					$scope.sensors[i] = response;
					break;
				}
			}
			$('#sensorModal').modal('hide');
			sensor = null;
		});
	};

	$scope.removeSensor = function(sensorId) {
		$http({
			url: getURL() + '/api/sensors/' + sensorId,
			method: 'DELETE',
			data: {token: $scope.user.token},
			headers: {"Content-Type": "application/json;charset=utf8"} 
		}).success(function(response) {
			for(let i = 0; i < $scope.sensors.length; i++) {
				if($scope.sensors[i]._id == sensorId) {
					$scope.sensors.splice(i, 1);
					break;
				}
			}
		});
	};
});