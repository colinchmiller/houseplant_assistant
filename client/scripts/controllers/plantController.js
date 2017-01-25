myApp.controller('PlantController', ['$scope', '$http', function($scope, $http){
    //pulling the plant data for the plant library
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
