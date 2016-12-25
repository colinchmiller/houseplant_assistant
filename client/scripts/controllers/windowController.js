var username;

myApp.controller('WindowCriteriaController', ['$scope', '$http', '$location', '$anchorScroll', function($scope, $http, $location, $anchorScroll){
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
    $scope.suggestedPlants = [];



    $scope.plantcheck = [{name : "Bamboo Palm", value : false}, {name : "Chinese Evergreen", value : false},
        {name : "English Ivy", value : false}, {name: "Gerbera Daisy", value : false}, {name : "Janet Craig", value : false},
        {name : "Marginata", value : false}, {name : "Mass Cane", value : false}, {name : "Snake Plant", value : false},
        {name: "Peace Lily", value : false}, {name : "Pot Mum", value : false}];


    //if the name from plant inventory matches the name from plantcheck, then the domplant
    //needs to be set to 'true'.

    //$scope.plantcheck = ['Bamboo Palm', 'Chinese Evergreen', 'English Ivy', 'Gerbera Daisy', 'Janet Craig',
    //'Marginata', 'Mass Cane', 'Snake Plant', 'Peace Lily', 'Pot Mum'];

    $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorscroll();
    }

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

    $scope.plantPrep = function() {
        $scope.plantinventory = [];
        console.log("This is the plantcheck data: ", $scope.plantcheck);
        for (var i=0; i<$scope.plantcheck.length; i++){
            if ($scope.plantcheck[i].value === true) {
                $scope.plantinventory.push($scope.plantcheck[i].name);
            }
        }
        console.log("The plantinventory to be uploaded: ", $scope.plantinventory);
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

    var sendPlant = function(windowId) {
        $scope.plantPrep();
        var plantdata = $scope.plantinventory;
        console.log("This is the plant data variable: ", plantdata);
        for (var i=0; i<plantdata.length; i++){
            $http({
                method: "POST",
                url: "/windowplants",
                data: { windowId : windowId,
                    plantdata: plantdata[i]}
            }).then(
                function(response){
                    //console.log("The plant upload response: ", response);
                }
            )
        }
    };

    /////////////Plant Suggestion Logic////////////////

    $scope.suggestPlant = function(){
        $http({
            method: "GET",
            url: "/plants"
        }).then(
            function (response) {
                console.log("Here is the plant data: ", response);
                console.log("Here is the window data: ", $scope.windowData);
                $scope.plants = response.data;
                $scope.suggestionLogic();
            });
    };

    $scope.suggestionLogic = function(){
        console.log("Suggestion logic fired");
        $scope.suggestedPlants = [];
        for (var i=0; i<$scope.plants.length; i++){
            var window = $scope.windowData[0];
            var plant = $scope.plants[i];
            var catTruth = false;
            var dogTruth = false;
            var kidTruth = false;
            var careTruth = false;
            var compassTruth = false;
            $scope.windowLight = 0;
            console.log("The plant being compared: ", plant.name);

            //Cat comparison
            if (window.cats == true){
                if (plant.cats == true) {
                    catTruth = false;
                } else {
                    catTruth = true;
                }
            } else {
                catTruth = true;
            }
            //Dog comparison
            if (window.dogs == true){
                if (plant.dogs == true) {
                    dogTruth = false;
                } else {
                    dogTruth = true;
                }
            } else {
                dogTruth = true;
            }
            //kid comparison
            if (window.kids == true){
                if (plant.kids == true) {
                    kidTruth = false;
                } else {
                    kidTruth = true;
                }
            } else {
                kidTruth = true;
            }
            console.log("The pet and kid comparisons turnout: ", catTruth, dogTruth, kidTruth);
            //plant care lvl comparison
            if (plant.care_lvl <= window.care_lvl){
                careTruth = true;
            } else {
                careTruth = false;
            }
            console.log("The care level comparison: ", careTruth);
            //window compass comparison
            console.log("This is the window.compass: ", window.compass);
            if(window.compass == "North"){
                if (plant.light_lvl_min <= 3){
                    compassTruth = true;
                } else {
                    compassTruth = false;
                }
            } else if (window.compass == "West" || window.compass == "East"){
                if (plant.light_lvl_min < 4){
                    compassTruth = true;
                } else {
                    compassTruth = false;
                }
            } else if (window.compass == "South"){
                if (plant.light_lvl_min >= 1){
                    compassTruth = true;
                } else {
                    compassTruth = false;
                }
            }
            console.log("After the compass comparison: ", compassTruth);
            if (catTruth == true && dogTruth == true && kidTruth == true && careTruth == true && compassTruth == true){
                $scope.suggestedPlants.push({name: plant.name});
            }

        }
        console.log("This is the suggested plant list: ", $scope.suggestedPlants);
    };


    /////////////Execution on page load////////////////

    $scope.getUser();

}]);
