var app = angular.module("internal");

app.controller("HelpController", function($scope, $http, $rootScope, $templateRequest, $sce, $compile) {

	socketEnabled = false;

	$scope.HelpPart = '';

	// adjust navbar to login status
	if($rootScope.user) {
		$('.navbar-right li:nth-child(2)').html('<a href="/profile"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;Profile</a>');
		$('.navbar-right li:nth-child(3)').html('<a href="/logout" target="_self"><i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Logout</a>');
	} else {
		$('.navbar-right li:nth-child(2)').html('<a href="/register"><i class="fa fa-user-plus" aria-hidden="true"></i>&nbsp;Sign Up</a>');
		$('.navbar-right li:nth-child(3)').html('<a href="/login"><i class="fa fa-sign-in" aria-hidden="true"></i>&nbsp;Login</a>');
	}

	// Default behavior
	document.getElementById('GeneralWoTVADiv').style.display = 'inline-block';

    // Load Requested Help-Content
	// Default

  	// Custom
	$scope.changeView = function(val){
		switch(val) {
		//  General Informations
		    case 'GeneralWoTVA':
		    	SetVisability();
		    	document.getElementById('GeneralWoTVADiv').style.display = 'inline-block';
		       	break;
		    case 'GeneralDevelopStatus':
		       	break;
		// Setup
			case 'SetupServer':
				SetVisability();
		    	document.getElementById('SetupServerDiv').style.display = 'inline-block';
				break;
			case 'SetupPi':
				SetVisability();
		    	document.getElementById('SetupPiDiv').style.display = 'inline-block';
				break;
			case 'SetupRESTAPI':
				SetVisability();
		    	document.getElementById('SetupRESTAPIDiv').style.display = 'inline-block';
				break;
		// Profile-Management
			case 'ProfileCreate':
				SetVisability();
		    	document.getElementById('ProfileCreateDiv').style.display = 'inline-block';
		       	break;
		// Filters
		   	case 'FilterUsage':;
		   		SetVisability();
		    	document.getElementById('FilterUsageDiv').style.display = 'inline-block';
		   		break;
		   	case 'FilterCustom':
		   		SetVisability();
		    	document.getElementById('FilterCustomDiv').style.display = 'inline-block';
		   		break;
		// Twitter
			case 'WhyTwitter':
				SetVisability();
				document.getElementById('WhyTwitterDiv').style.display = 'inline';
		        break;
		    case 'TwitterConfig':
		    	SetVisability();
		    	document.getElementById('TwitterConfigDiv').style.display = 'inline';
		    	break;
		// Imprint
			case 'HelpImprint':
				// Dynamically load Imprint into the Page
				// Right now a direct forwarding to the Imprint-Page is done in the Html-File
		        break;
		// Default
		    default:
		    	SetVisability();
		    	document.getElementById('DefaultDiv').style.display = 'inline';
				break;
		}
	}
});


// Set Visibility of all Help-Elements to "none"
function SetVisability() {
	var x = document.querySelectorAll(".visibleClass");
	var xlength = document.querySelectorAll(".visibleClass").length;
	for(var i = 0; i < xlength; i++) {
		x[i].style.display = 'none';
	}
}