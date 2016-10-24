var app = angular.module('app', ['ngRoute', 'ngCookies']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/' ,{
			templateUrl: '/views/cover.html',
			controller: 'CoverController'
		})
		.when('/login', {
			templateUrl: "/views/login.html",
			controller: 'UserController'
		})
		.when('/home', {
			templateUrl: "/views/home.html",
			controller: 'HomeController'
		})
		.when('/sc2/mate', {
			templateUrl: "/views/sc2_mate.html",
			controller: 'StarcraftController'
		})
		.otherwise({
			redirectTo: '/'
		});

	// use the HTML5 History API
	$locationProvider.html5Mode(true);
}]);
