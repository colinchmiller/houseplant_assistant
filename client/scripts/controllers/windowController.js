var username;

myApp.controller('WindowCriteriaController', ['$scope', '$http', function($scope, $http){
    console.log('WindowCriteriaController is now running');

    /////////////variables for presenting data on DOM//////////////
    $scope.plantinventory = [];
    $scope.windowcost = 0;
    $scope.benzene = 0;
    $scope.trichloroethylene = 0;
    $scope.formaldehyde = 0;
    $scope.plantsForWindow = [];
    $scope.windowData = [];
    $scope.windownames = [];
    $scope.roomData = [];


    //////////Get Calls////////////////

    //Finding the User to prep getting data
    $scope.getUser = function() {
        $http({
            method: "GET",
            url: "/login"
        }).then(
            function (response) {
                username = response.data;
                $scope.getRoomData();
            });
    };

    //Getting the window names by user
    $scope.getWindows = function(){
        var roomName = $scope.selectedRoom.room_name;
        console.log("What is the room_name for selectedRoom?: ", roomName);
        $http({
            method: "GET",
            url: "/windownames",
            params: {
                roomId: roomName
            }
        }).then(
            function (response) {
                $scope.windownames = response.data;
            });
    };

    //Using window names to pull all relevant window data
    $scope.getWindowData = function(){
        $scope.windowData = [];
        var windowname = $scope.selectedWindow.name;
        $http({
            method: "GET",
            url: "/windows",
            params: {
                windowName: windowname
            }
    }).then(
            function(response) {
                $scope.windowData = response.data;
                windowTotals(response.data[0].id);
            }
    )};

    //Getting the plant data associates with the window and processing the data
    var windowTotals = function(window) {
        $scope.windowTotals = [];
        $scope.plantinventory = [];
        $scope.windowcost = 0;
        $scope.benzene = 0;
        $scope.trichloroethylene = 0;
        $scope.formaldehyde = 0;

        $http({
            method: "GET",
            url: "/windowplants",
            params:{
                windowId: window
            }
        }).then(
            function(response){
                $scope.plantsForWindow = response.data;
                $scope.plantinventory.push($scope.plantsForWindow[0].name);
                $scope.windowcost += $scope.plantsForWindow[0].cost;
                $scope.benzene += $scope.plantsForWindow[0].benzene;
                $scope.trichloroethylene += $scope.plantsForWindow[0].trichloroethylene;
                $scope.formaldehyde += $scope.plantsForWindow[0].formaldehyde;
            }
        )
    };

    $scope.getRoomData = function(){
        $scope.roomData = [];
        $http({
            method: "GET",
            url: "/roomlist",
            params: {
                username: $scope.username
            }
        }).then(
            function(response){
                $scope.roomData = response.data;
                console.log("This is the roomData: ", $scope.roomData);
                $scope.getWindows();
            }
        )
    };

    ////////////Post calls//////////////

    $scope.saveWindow = function(){
        console.log("This is the windowdata to be sent: ", $scope.windowData);
      $http({
          method: "POST",
          url: "/windows",
          data: { windowdata: $scope.windowData}
      }).then(
          function(response){
              console.log("This is the post response: ", response);
              sendPlant(response.data.rows[0].id);
          }
      )
    };

    var sendPlant = function(windowId){
        $http({
            method: "POST",
            url: "/windowplants",
            data: { windowId : windowId,
                plantdata: $scope.plantinventory}
        }).then(
            function(response){
                console.log("The plant upload response: ", response);
            }
        )
    };

    /////////////Execution on page load////////////////

    $scope.getUser();

}]);

