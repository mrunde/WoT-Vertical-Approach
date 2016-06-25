var app = angular.module("internal");

app.controller("ProfileController", function($scope, $http, $rootScope, $location, $timeout) {
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
			$timeout(function() {
				$scope.initMaps();
			}, 1000);
		});
	};

	$scope.showThing = function(thingId) {
		$location.path('/thing/' + thingId);
	};

	$scope.initMaps = function() {
		L.mapbox.accessToken = getMapboxAccessToken();

		for (var i = 0; i < $scope.things.length; i++) {
			var container = $('#map-' + $scope.things[i]._id);
	
			var tGeojson = [
				{
					'type': 'Feature',
					'geometry': {
						'type': 'Point',
						'coordinates': [
							$scope.things[i].loc.coordinates[1],
							$scope.things[i].loc.coordinates[0]
						]
					},
					'properties': {
						'icon': {
							'iconUrl': '../img/marker.png',
							'iconSize': [32, 32],
							'iconAnchor': [16, 16],
							'popupAnchor': [0, -16]
						}
					}
				}
			];

			var tMap = L.mapbox.map('map-' + $scope.things[i]._id, 'mapbox.dark', {
				scrollWheelZoom: false,
				zoomControl: false,
				dragging: false,
				touchZoom: false,
				doubleClickZoom: false,
				boxZoom: false,
				attributionControl: false
			}).setView($scope.things[i].loc.coordinates, 14);

			$('.leaflet-container').css('cursor', 'default');

			// Add Thing marker to the map
			var tMarker = L.mapbox.featureLayer().addTo(tMap);
			tMarker.off('click');
			tMarker.on('layeradd', function(e) {
				var marker = e.layer;
				marker.setIcon(L.icon(marker.feature.properties.icon));
			});
			tMarker.setGeoJSON(tGeojson);
		}
	};
});