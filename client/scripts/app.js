var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/library',{
        templateUrl: 'assets/views/routes/library.html',
        controller: 'PlantController'
    }).
        when('/plantulate',{
        templateUrl: 'assets/views/routes/plantulate.html',
        controller: 'WindowCriteriaController'
    }).
        otherwise({
        redirectTo: 'plantulate'
    })
}]);
