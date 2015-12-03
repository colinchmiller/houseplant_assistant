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


    $scope.plantcheck = [{name : "Bamboo Palm", value : false}, {name : "Chinese Evergreen", value : false},
        {name : "English Ivy", value : false}, {name: "Gerbera Daisy", value : false}, {name : "Janet Craig", value : false},
        {name : "Marginata", value : false}, {name : "Mass Cane", value : false}, {name : "Snake Plant", value : false},
        {name: "Peace Lily", value : false}, {name : "Pot Mum", value : false}];


    //if the name from plant inventory matches the name from plantcheck, then the domplant
    //needs to be set to 'true'.

    //$scope.plantcheck = ['Bamboo Palm', 'Chinese Evergreen', 'English Ivy', 'Gerbera Daisy', 'Janet Craig',
    //'Marginata', 'Mass Cane', 'Snake Plant', 'Peace Lily', 'Pot Mum'];

    $scope.plantCheck = function() {
        console.log("What is the plantinventory coming in? ", $scope.plantinventory);
        for (var i=0; i<$scope.plantinventory.length; i++){
            var plant = $scope.plantinventory[i];
            for (var j=0; j<$scope.plantcheck.length; j++){
                var confirmPlant = $scope.plantcheck[j];
                if (plant == confirmPlant.name){
                    confirmPlant.value = true;
                }
            }
        }
        console.log("This is the plantcheck array: ", $scope.plantcheck);
    };

    //////////Get Calls////////////////

    //Finding the User to prep getting data
    $scope.getUser = function() {
        $http({
            method: "GET",
            url: "/login"
        }).then(
            function (response) {
                username = response.data;
                $scope.getWindows();
            });
    };

    //Getting the window names by user
    $scope.getWindows = function(){
        $http({
            method: "GET",
            url: "/windownames",
            params: {
                username: username
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
                console.log("This is the plant response: ", response);
                $scope.plantsForWindow = response.data;
                for (var i=0; i<$scope.plantsForWindow.length; i++){
                    $scope.plantinventory.push($scope.plantsForWindow[i].name);
                    $scope.windowcost += $scope.plantsForWindow[i].cost;
                    $scope.benzene += $scope.plantsForWindow[i].benzene;
                    $scope.trichloroethylene += $scope.plantsForWindow[i].trichloroethylene;
                    $scope.formaldehyde += $scope.plantsForWindow[i].formaldehyde;
                }
                $scope.plantCheck();
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
              assignWindow(response.data.rows[0].id);
          }
      )
    };

    var assignWindow = function(windowId){
        $http({
            method:"POST",
            url: "/windownames",
            data: {windowId: windowId,
            username: username}
        }).then(
            function(response){
                //console.log("The response from the windowassign upload: ", response);
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
                //console.log("The plant upload response: ", response);
            }
        )
    };

    /////////////Plant Suggestion Logic////////////////

    $scope.suggestPlant = function(windowData){
        $http({
            method: "GET",
            url: "/plants"
        }).then(
            function (response) {
                console.log("Here is the plant response: ", response);
                $scope.plants = response.data;
            });
    };

    /////////////Execution on page load////////////////

    $scope.getUser();

}]);

