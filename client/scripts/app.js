var myApp = angular.module('myApp', []);

myApp.controller('PlantTestController', ['$scope', '$http', function($scope, $http){

    $scope.getPlants = function() {
        $http({
            method: "GET",
            url: "/plants"
        }).then(
            function (response) {
                console.log(response);
            });
    };

    $scope.getPlants();
}]);

myApp.controller('PassportController', ['$scope', '$http', function($scope, $http){

}]);

