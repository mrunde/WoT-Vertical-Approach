'use strict';

// Resize the map based on screen sizes to display it with 100% height
const navMargin      = 52;
const btnGroupHeight = 34;

$('#livemap').css('height', ($(window).height() - navMargin - btnGroupHeight));

$(window).on('resize', resize);

function resize() {
	$('#livemap').css('height', ($(window).height() - navMargin - btnGroupHeight));
}