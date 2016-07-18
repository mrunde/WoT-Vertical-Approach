
app.controller("HelpController", function($scope, $http, $rootScope, $templateRequest, $sce, $compile) {

	socketEnabled = false;

	// adjust navbar to login status
	if($rootScope.user) {
		$('.navbar-right li:nth-child(2)').html('<a href="/profile"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;Profile</a>');
		$('.navbar-right li:nth-child(3)').html('<a href="/logout" target="_self"><i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Logout</a>');
	} else {
		$('.navbar-right li:nth-child(2)').html('<a href="/register"><i class="fa fa-user-plus" aria-hidden="true"></i>&nbsp;Sign Up</a>');
		$('.navbar-right li:nth-child(3)').html('<a href="/login"><i class="fa fa-sign-in" aria-hidden="true"></i>&nbsp;Login</a>');
	}

	// html-file-path which should be displayed
	var templateUrl = $sce.getTrustedResourceUrl('/../help/default.html');

	console.log($templateRequest(templateUrl));

	// Request and Read the Template ->>> this might be the EROROR 
    $templateRequest(templateUrl).then(function(template) {
        // template is the HTML template as a string
     	// parse the String to HTML
        $scope.HelpPart = $sce.trustAsHtml(template);
    }, function() {
        console.log("html could not be displayed");
    });

    // Load Requested Help-Content
	// Default

  	// Custom
	$scope.changeView = function(val){
		switch(val) {
		//  General Informations
		    case 'GeneralWoTVA':
		        $scope.HeadingHelp = "What's behind WoT & Vertical Approach?";
				$scope.Contenthelp = "The basic idea of the Geospatial Web of Things is that things of the physical world become first class citizens in the World Wide Web, ready to interact with humans and with other machines." + 
									 " In the „Geospatial Web of Things“ study project the idea of the internet of things was applied for mobile water gauges. All together there were three groups working on the project, each with a different approach. The “Lean Vertical Integration”-group had a focus on using existing technologies to implement the functional requirements of a specific use case.";
		        break;
		    case 'GeneralPageElements':
		    	$scope.HeadingHelp = "About the Softwares Developin Status ";
		    	$scope.Contenthelp = "";
		        break;
		    case 'GeneralRestAPI':
		    	$scope.HeadingHelp = "About the Softwares Developin Status ";
		    	$scope.Contenthelp = "";
		        break;
		    case 'GeneralDevelopStatus':
		    	$scope.HeadingHelp = "About the Softwares Developin Status ";
		    	$scope.Contenthelp = "";
		        break;
		// User-Management
			case 'CreateUser':
		    	$scope.HeadingHelp = "About the Softwares Developin Status ";
		    	$scope.Contenthelp = "";
		        break;
		    case 'UserLogin':
		    	$scope.HeadingHelp = "About the Softwares Developin Status ";
		    	$scope.Contenthelp = "";
		        break;
		// Filters
			case 'FilterWhy':
		    	$scope.HeadingHelp = "Why are Filters usefull?";
		    	$scope.Contenthelp = "";
		   		break;
		   	case 'FilterUsage':
		    	$scope.HeadingHelp = "How to use Filters";
		    	$scope.Contenthelp = "";
		    	// now load content dynamicall into the html
		   		break;
		   	case 'FilterCustom':
		    	$scope.HeadingHelp = "How to create Custom-Filters";
		    	$scope.Contenthelp = "";
		    	// now load content dynamicall into the html
		   		break;
		// Twitter
			case 'WhyTwitter':
				$scope.HeadingHelp = "Why are we using Twitter?";
		    	$scope.Contenthelp = "Twitter is an easy to use tool, which allows to share the most important infos really to a large viewership. Mobile Apps for all common platforms allows a user to check the newest news on the way. And the best part about it:  You don't have to have a Twitter Account to display follow our tweets. All these characteristics make it the perfect plattform for us to publish warning messages.";
		        break;
		    case 'TwitterConfig':
				$scope.HeadingHelp = "How to set up a Twitter Application";
		    	$scope.Contenthelp = "In order to set up your own Twitter-Application a Twitter-Account is needed. So you might want to go here https://twitter.com/signup and create one.  ";
		    	break;
		    case 'TwitterRSS':
				$scope.HeadingHelp = "How to set up a Twitter RSS Feed";
		    	$scope.Contenthelp = "";
		        break;
		// Imprint
			case 'HelpImprint':
				// Dynamically load Imprint into the Page
				// Right now a direct forwarding to the Imprint-Page is done in the Html-File
		        break;
		// Default
		    default:
		        //$scope.HeadingHelp = "Help-Section";
				$scope.Contenthelp = "This section contains informations about how to use our the page. Simply click on a Topic in the Overview to display a possible approach. ";
				break;
		}
	}
});