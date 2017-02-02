
myApp.controller('WindowCriteriaController', ['$scope', '$http', '$location', '$anchorScroll', function($scope, $http, $location, $anchorScroll){

    // *********
    // INITIALIZE SCOPE VARIABLES
    // *********

    // QUERY VALUES
    $scope.light = 0;
    $scope.width = 25;
    $scope.height = 25;
    $scope.water = 0;
    $scope.cat = false;
    $scope.dog = false;
    $scope.human = false;

    var query = {"light" : $scope.light, "width" : $scope.width, "height" : $scope.height, "water" : $scope.water,
                  "cat" : $scope.cat, "dog" : $scope.dog, "human" : $scope.human};

    $scope.trulite = {"background-color": "#000"}
    $scope.scalewindow = {"height" : $scope.scaleheight+"px", "width" : $scope.scalewidth+"px"}
    $scope.scaleheight = $scope.height * 5;
    $scope.scalewidth = $scope.width * 5;

    // **********
    // TOGGLE HUMAN
    // **********
    $scope.toggleHuman = function (){
      if ($scope.human == false){
        $scope.human = true;
      } else {
        $scope.human = false;
      }
      return $scope.human;
    }

    // **********
    // TOGGLE CAT
    // **********
    $scope.toggleCat = function (){
      if ($scope.cat == false){
        $scope.cat = true;
      } else {
        $scope.cat = false;
      }
      return $scope.cat;
    }

    // **********
    // TOGGLE DOG
    // **********
    $scope.toggleDog = function (){
      if ($scope.dog == false){
        $scope.dog = true;
      } else {
        $scope.dog = false;
      }
      return $scope.dog;
    }

    // ************
    // ADJUST WINDOW WIDTH AND HEIGHT BY FACTOR OF 3 WITH SCALE CHANGE
    // ************
    $scope.scalingSize = function(){
      $scope.scaleheight = $scope.height * 5;
      $scope.scalewidth = $scope.width * 5;
      $scope.scalewindow = {"height" : $scope.scaleheight+"px", "width" : $scope.scalewidth+"px"};
    }

    // **********
    // BACKGROUND LIGHT FOR IMAGE
    // **********
    $scope.changeLight = function(){
      if($scope.light == 0){
        $scope.trulite = {
          "transition": "background-color 0.5s ease",
          "background-color" : "#000"
        }
      }
      if($scope.light == 1){
        $scope.trulite = {
          "transition": "background-color 0.5s ease",
          "background-color" : "#222"
        }
      }
      if($scope.light == 2){
        $scope.trulite = {
          "transition": "background-color 0.5s ease",
          "background-color" : "#333"
        }
      }
      if($scope.light == 3){
        $scope.trulite = {
          "transition": "background-color 0.5s ease",
          "background-color" : "#444"
        }
      }
      if($scope.light == 4){
        $scope.trulite = {
          "transition": "background-color 0.5s ease",
          "background-color" : "#555"
        }
      }
      if($scope.light == 5){
        $scope.trulite = {
          "transition": "background-color 0.5s ease",
          "background-color" : "#777"
        }
      }
      if($scope.light == 6){
        $scope.trulite = {
          "transition": "background-color 0.5s ease",
          "background-color" : "#999"
        }
      }
      if($scope.light == 7){
        $scope.trulite = {
          "transition": "background-color 0.5s ease",
          "background-color" : "#aaa"
        }
      }
      if($scope.light == 8){
        $scope.trulite = {
          "background-color" : "#ccc"
        }
      }
      if($scope.light == 9){
        $scope.trulite = {
          "transition": "background-color 0.5s ease",
          "background-color" : "#eee"
        }
      }
      if($scope.light == 10){
        $scope.trulite = {
          "transition": "background-color 0.5s ease",
          "background-color" : "#fff"
        }
      }
    }

    $scope.plantcheck = [{name : "Bamboo Palm", value : false}, {name : "Chinese Evergreen", value : false},
        {name : "English Ivy", value : false}, {name: "Gerbera Daisy", value : false}, {name : "Janet Craig", value : false},
        {name : "Marginata", value : false}, {name : "Mass Cane", value : false}, {name : "Snake Plant", value : false},
        {name: "Peace Lily", value : false}, {name : "Pot Mum", value : false}];

    // **********
    // SCROLLING BUTTON
    // **********
    $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
    }

    // *********
    // PLANT SUGGESTION
    // *********

    $scope.suggestPlant = function(){
      console.log("The query is: " + query);
      console.log("query.light: " + query.light);
      $http({
        method: "GET",
        url: "/plants",
        params: {"query" : query}
      })
    }

    // $scope.suggestPlant = function(){
    //
        // $http({
        //     method: "GET",
        //     url: "/plants"
        // }).then(
        //     function (response) {
        //         console.log("Here is the plant data: ", response);
        //         console.log("Here is the window data: ", $scope.windowData);
        //         $scope.plants = response.data;
        //         $scope.suggestionLogic();
        //     });
    // };



}]);
