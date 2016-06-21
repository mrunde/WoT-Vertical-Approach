var app = angular.module("internal");

app.controller("MapController", function($scope, $http) {
	$scope.user = {};

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
		// TODO requestMyThings();
	});

	$('#filter_custom').on('click', function() {
		$('#filter_all').removeClass('btn-primary').addClass('btn-default');
		$('#filter_last_24h').removeClass('btn-primary').addClass('btn-default');
		$('#filter_last_7d').removeClass('btn-primary').addClass('btn-default');
		$('#filter_my_things').removeClass('btn-primary').addClass('btn-default');
		$('#filter_custom').removeClass('btn-default').addClass('btn-primary');
		// TODO requestCustom();
	});

	L.mapbox.accessToken = getMapboxAccessToken();
	
	map = L.mapbox.map('livemap')
		.setView([51.973387, 7.700213], 10)
		.addControl(L.mapbox.geocoderControl('mapbox.places'));

	resize();
	map._onResize();
	
	L.control.layers({
		'Mapbox Streets':   L.mapbox.tileLayer('mapbox.streets').addTo(map),
		'Mapbox Dark':      L.mapbox.tileLayer('mapbox.dark'),
		'Mapbox Satellite': L.mapbox.tileLayer('mapbox.satellite')
	}).addTo(map);

	
	thingName            = document.getElementById('thingName');
	thingMetaInformation = document.getElementById('thingMetaInformation');
	thingDetails         = document.getElementById('thingDetails');

	chartHandler = new ChartHandler('waterLevelChart');
	requestThings();
});