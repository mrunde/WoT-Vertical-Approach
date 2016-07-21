'use strict';

// Resize the map based on screen sizes to display it with 100% height
const navMargin      = 53;
const btnGroupHeight = 34;
const colPadding     = 15;

$('#livemap').css('height', ($(window).height() - navMargin - btnGroupHeight));
$('#forecast').css('width', ($('#weather').width() - $('#radar').width() - colPadding * 4));

$(window).on('resize', resize);

function resize() {
	$('#livemap').css('height', ($(window).height() - navMargin - btnGroupHeight));
	$('#forecast').css('width', ($('#weather').width() - $('#radar').width() - colPadding * 4));
}