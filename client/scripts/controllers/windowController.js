

myApp.controller('WindowCriteriaController', ['$scope', '$http', function($scope, $http){
    console.log('WindowCriteriaController is now running');

    $scope.plantinventory = [];
    $scope.windowcost = 0;
    $scope.benzene = 0;
    $scope.trichloroethylene = 0;
    $scope.formaldehyde = 0;

    $scope.plantsForWindow = [];
    $scope.windowData = [];

    $scope.getWindowData = function(){
        $scope.windowData = [];
        $http({
            method: "GET",
            url: "/windows",
            params: {
                windowName: $scope.selectedWindow.name
            }
    }).then(
            function(response) {
                console.log("This is the response: ", response);
                $scope.windowData = response.data;
                windowTotals(response.data[0].id);
            }
    )};

    var windowTotals = function(window) {
        $scope.windowTotals = [];
        $scope.plantinventory = [];
        $scope.windowcost = 0;
        $scope.benzene = 0;
        $scope.trichloroethylene = 0;
        $scope.formaldehyde = 0;
        console.log("What is the request getting sent to the windowplants?", $scope.windowData)

        $http({
            method: "GET",
            url: "/windowplants",
            params:{
                windowId: window
            }
        }).then(
            function(response){
                $scope.plantsForWindow = response.data;
                console.log("These are the plants assigned to the room: ", $scope.plantsForWindow);
                $scope.plantinventory.push($scope.plantsForWindow[0].name);
                $scope.windowcost += $scope.plantsForWindow[0].cost;
                $scope.benzene += $scope.plantsForWindow[0].benzene;
                $scope.trichloroethylene += $scope.plantsForWindow[0].trichloroethylene;
                $scope.formaldehyde += $scope.plantsForWindow[0].formaldehyde;
            }
        )
    }

}]);

