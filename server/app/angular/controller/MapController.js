var app = angular.module("internal");

app.controller("MapController", function($scope, $http, $location, $rootScope) {
	socketEnabled = true;

	$scope.mapInitiated = false;

	// init Filter functions and river autofill
	customFilterFactory = new CustomFilterFactory();
	customFilterFactory.init();
	$("#custom-filter-river-input").typeahead({ source:waterbody_names });
	
	// adjust navbar to login status
	if($rootScope.user) {
		$('.navbar-right li:nth-child(2)').html('<a href="/profile"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;Profile</a>');
		$('.navbar-right li:nth-child(3)').html('<a href="/logout" target="_self"><i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Logout</a>');

		$http.get(getURL() + '/api/filters/' + $rootScope.user._id).success(function(response) {
			customFilterSaves = response;
			for(let i = 0; i < customFilterSaves.length; i++)
				customFilterSaves[i].settings = JSON.parse(customFilterSaves[i].settings);
			customFilterFactory.setUser($rootScope.user);
		});
	} else {
		$('.navbar-right li:nth-child(2)').html('<a href="/register"><i class="fa fa-user-plus" aria-hidden="true"></i>&nbsp;Sign Up</a>');
		$('.navbar-right li:nth-child(3)').html('<a href="/login"><i class="fa fa-sign-in" aria-hidden="true"></i>&nbsp;Login</a>');

		// disbale custom filter saves
		$('#customFilterSaves').replaceWith('<a href="#" class="list-group-item" style="pointer-events: none; curser: default;"><h4 class="list-group-item-heading">Saved Filters</h4><p class="list-group-item-text">Only available to logged in users.</p></a>');
	}


	// Handle filter events
	$('#filter_all').on('click', function() {
		$('#filter_all').removeClass('btn-default').addClass('btn-primary');
		$('#filter_last_24h').removeClass('btn-primary').addClass('btn-default');
		$('#filter_last_7d').removeClass('btn-primary').addClass('btn-default');
		$('#filter_my_things').removeClass('btn-primary').addClass('btn-default');
		$('#filter_custom').removeClass('btn-primary').addClass('btn-default');
		requestThings();
	});

	$('#filter_last_24h').on('click', function() {
		$('#filter_all').removeClass('btn-primary').addClass('btn-default');
		$('#filter_last_24h').removeClass('btn-default').addClass('btn-primary');
		$('#filter_last_7d').removeClass('btn-primary').addClass('btn-default');
		$('#filter_my_things').removeClass('btn-primary').addClass('btn-default');
		$('#filter_custom').removeClass('btn-primary').addClass('btn-default');
		requestLast24h();
	});

	$('#filter_last_7d').on('click', function() {
		$('#filter_all').removeClass('btn-primary').addClass('btn-default');
		$('#filter_last_24h').removeClass('btn-primary').addClass('btn-default');
		$('#filter_last_7d').removeClass('btn-default').addClass('btn-primary');
		$('#filter_my_things').removeClass('btn-primary').addClass('btn-default');
		$('#filter_custom').removeClass('btn-primary').addClass('btn-default');
		requestLast7d();
	});

	$('#filter_my_things').on('click', function() {
		$('#filter_all').removeClass('btn-primary').addClass('btn-default');
		$('#filter_last_24h').removeClass('btn-primary').addClass('btn-default');
		$('#filter_last_7d').removeClass('btn-primary').addClass('btn-default');
		$('#filter_my_things').removeClass('btn-default').addClass('btn-primary');
		$('#filter_custom').removeClass('btn-primary').addClass('btn-default');
		$scope.requestMyThings();
	});

	$('#filter_custom').on('click', function() {
		$('#filter_all').removeClass('btn-primary').addClass('btn-default');
		$('#filter_last_24h').removeClass('btn-primary').addClass('btn-default');
		$('#filter_last_7d').removeClass('btn-primary').addClass('btn-default');
		$('#filter_my_things').removeClass('btn-primary').addClass('btn-default');
		$('#filter_custom').removeClass('btn-default').addClass('btn-primary');
	});

	L.mapbox.accessToken = getMapboxAccessToken();
	
	map = L.mapbox.map('livemap')
		.setView([51.973387, 7.700213], 10)
		.addControl(L.mapbox.geocoderControl('mapbox.places'));

	resize();
	map._onResize();
	
	L.control.layers({
		'Mapbox Streets':   L.mapbox.tileLayer('mapbox.streets').on('load', function(){ $scope.zoomToThingsOnLoad(); }).addTo(map),
		'Mapbox Dark':      L.mapbox.tileLayer('mapbox.dark'),
		'Mapbox Satellite': L.mapbox.tileLayer('mapbox.satellite')
	}).addTo(map);

	
	thingName            = document.getElementById('thingName');
	thingMetaInformation = document.getElementById('thingMetaInformation');
	thingDetails         = document.getElementById('thingDetails');

	// init Chart
	chartHandler = new ChartHandler('waterLevelChart');

	// Request all things of the currently logged in user or redirect to login
	// page if no user is logged in.
	$scope.requestMyThings = function() {
		if($rootScope.user) {
			return $.ajax({
				url: getURL() + '/api/users/' + $rootScope.user._id + '/things',
				global: false,
				type: 'GET',
				async: false,
				success: function(things) {
					drawMarkers(things);
				}
			});
		} else {
			$scope.$apply(function() {
				$location.path('/login');
			});
		}
	};

	// When the page is loaded, wait for all tiles to load and
	// then fit Bounds to requested Things.
	$scope.zoomToThingsOnLoad = function() {
		if($scope.mapInitiated == false) {
			requestThings();
			$scope.mapInitiated = true;
		}
	};
});