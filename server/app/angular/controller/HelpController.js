var app = angular.module("internal");

app.controller("HelpController", function($scope, $http, $rootScope) {

	socketEnabled = false;

	$scope.HeadingHelp = "Help-Section";
	$scope.Contenthelp = "This section contains informations about how to use our the page. Simply click on a Topic in the Overview to display a possible approach. ";
  
	$scope.changeView = function(val){
		switch(val) {
		    case 'WoTVA':
		        $scope.HeadingHelp = "What's behind WoT & Vertical Approach?";
				$scope.Contenthelp = "The basic idea of the Geospatial Web of Things is that things of the physical world become first class citizens in the World Wide Web, ready to interact with humans and with other machines." + 
									 " In the „Geospatial Web of Things“ study project the idea of the internet of things was applied for mobile water gauges. All together there were three groups working on the project, each with a different approach. The “Lean Vertical Integration”-group had a focus on using existing technologies to implement the functional requirements of a specific use case.";
		        break;
		    case 'DevelopStatus':
		    	$scope.HeadingHelp = "About the Softwares Developin Status ";
		    	$scope.Contenthelp = "something about the software status";
		        break;
		    default:
		        $scope.HeadingHelp = "Help-Section";
				$scope.Contenthelp = "This section contains informations about how to use our the page. Simply click on a Topic in the Overview to display a possible approach. ";
				break;
		}
	}
});

