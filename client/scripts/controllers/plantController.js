myApp.controller('PlantController', ['$scope', '$http', function($scope, $http){
    console.log('PlantController is running');
    $scope.plants = [];

    $scope.getPlants = function() {
        $http({
            method: "GET",
            url: "/plants"
        }).then(
            function (response) {
                console.log(response);
                $scope.plants = response.data;
            });
    };

    $scope.getPlants();
}]);


