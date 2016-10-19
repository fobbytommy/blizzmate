var app = angular.module('app', ['ngRoute', 'ngCookies']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/' ,{
			templateUrl: 'views/cover.html',
			controller: 'CoverController'
		})
		.when('/login', {
			templateUrl: "views/login.html",
			controller: 'UserController'
		})
		.when('/home', {
			templateUrl: "views/home.html",
			controller: 'HomeController'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);
