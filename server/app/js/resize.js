'use strict';

// Resize the map based on screen sizes to display it with 100% height
const mapmargin = 82;
$('#livemap').css('height', ($(window).height() - mapmargin));
$(window).on('resize', resize);
resize();

function resize() {
	$('#livemap').css('height', ($(window).height() - mapmargin));
}
