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
	var content = "";

    // Load Requested Help-Content
	// Default

  	// Custom
	$scope.changeView = function(val){
		switch(val) {
		//  General Informations
		    case 'GeneralWoTVA':
		    	document.getElementById('GeneralWoTVADiv').style.visibility = 'visible';
		       	break;
		    case 'GeneralPageElements':
		       	break;
		    case 'GeneralRestAPI':
		       	break;
		    case 'GeneralDevelopStatus':
		       	break;
		// User-Management
			case 'CreateUser':
		       	break;
		    case 'UserLogin':
		       	break;
		// Filters
			case 'FilterWhy':
		       	break;
		   	case 'FilterUsage':;
		   		break;
		   	case 'FilterCustom':
		   		break;
		// Twitter
			case 'WhyTwitter':
				document.getElementById('WhyTwitterDiv').style.visibility = 'visible';
		        break;
		    case 'TwitterConfig':
		    	document.getElementById('TwitterConfigDiv').style.visibility = 'visible';
		    	break;
		// Imprint
			case 'HelpImprint':
				// Dynamically load Imprint into the Page
				// Right now a direct forwarding to the Imprint-Page is done in the Html-File
		        break;
		// Default
		    default:
		    	document.getElementById('DefaultDiv').style.visibility = 'visible';
				break;
		}
	}
});