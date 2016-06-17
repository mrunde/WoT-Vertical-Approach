var app = angular.module("internal");

app.controller("ThingController", function($scope, $http, $routeParams) {
	let thingId = $routeParams.thingId;
	let sensor;

	$scope.user = {};
	$scope.thing = {};
	$scope.sensors = {};

	$http.get(getURL() + '/user').success(function(response) {
		if(response.email){
			$scope.user = response;
			$scope.queryThing();
		} else {
			window.location.href = '/internal#/';
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
			interval: $('#sensor_config_interval').val()
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
		$http.delete(getURL() + '/api/sensors/' + sensorId).success(function(response) {
			for(let i = 0; i < $scope.sensors.length; i++) {
				if($scope.sensors[i]._id == sensorId) {
					$scope.sensors.splice(i, 1);
					break;
				}
			}
		});
	};
});