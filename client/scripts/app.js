var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/library', {
        templateUrl: 'assets/views/routes/library.html',
        controller: 'PlantController'
    }).
        when('/plantulate',{
        templateUrl: 'assets/views/routes/plantulate.html',
        controller: 'WindowCriteriaController'
    }).
    when('/userpage',{
        templateUrl: 'assets/views/routes/userpage.html',
        controller: 'RoomController'
    }).
    when('/notifications',{
        templateUrl: 'assets/views/routes/notifications.html'
    }).
    when('/login',{
        templateUrl: 'assets/views/routes/login.html',
        controller: 'LoginController'
    }).
    when('/register',{
        templateUrl: 'assets/views/routes/register.html'
    }).
        otherwise({
        redirectTo: 'library'
    })
}]);

