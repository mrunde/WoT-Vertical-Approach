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
						'title': $scope.things[i].name,
						'icon': {
							'iconUrl': '../img/marker.png',
							'iconSize': [32, 32],
							'iconAnchor': [16, 16],
							'popupAnchor': [0, -16]
						}
					}
				}
			];

			var tMap = L.mapbox.map('map-' + $scope.things[i]._id, 'mapbox.streets', {
				scrollWheelZoom: false,
				zoomControl: true,
				dragging: true,
				touchZoom: false,
				doubleClickZoom: true,
				boxZoom: false,
				attributionControl: false
			}).setView($scope.things[i].loc.coordinates, 10);

			$('.leaflet-container').css('cursor', 'default');

			// Add Thing marker to the map
			var tMarker = L.mapbox.featureLayer().addTo(tMap);
			tMarker.on('layeradd', function(e) {
				var marker = e.layer;
				marker.setIcon(L.icon(marker.feature.properties.icon));
			});
			tMarker.setGeoJSON(tGeojson);
		}
	};

	$scope.fillSettingsDialog = function() {
		$('#profile_settings_email').val($scope.user.email);
		if($scope.user.twitter) {
			$('#profile_settings_twitterConsumerKey').val($scope.user.twitter.twitterConsumerKey);
			$('#profile_settings_twitterConsumerSecret').val($scope.user.twitter.twitterConsumerSecret);
			$('#profile_settings_twitterAccessToken').val($scope.user.twitter.twitterAccessTokenKey);
			$('#profile_settings_twitterAccessSecret').val($scope.user.twitter.twitteraccessTokenSecret);
		}
	};

	$scope.saveSettings = function() {
		let userUpdate = {
			email: $('#profile_settings_email').val(),
			twitter: {
				twitterConsumerKey: $('#profile_settings_twitterConsumerKey').val(),
				twitterConsumerSecret: $('#profile_settings_twitterConsumerSecret').val(),
				twitterAccessTokenKey: $('#profile_settings_twitterAccessToken').val(),
				twitteraccessTokenSecret: $('#profile_settings_twitterAccessSecret').val()
			},
			token: $scope.user.token
		};

		$http.put(getURL() + '/api/users/' + $scope.user._id, userUpdate).success(function(response) {
			console.log(response);
			$scope.user = response;
			$('#profileModal').modal('hide');
		});
	};

});