
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
    $scope.query = {};
    $scope.suggestedplants = [];



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
        $scope.clickStyleHuman = {'fill': '#fff'};
      } else {
        $scope.human = false;
        $scope.clickStyleHuman = {};
      }
      return $scope.human;
    }

    // **********
    // TOGGLE CAT
    // **********
    $scope.toggleCat = function (){
      if ($scope.cat == false){
        $scope.cat = true;
        $scope.clickStyleCat = {'fill': '#fff'};
      } else {
        $scope.cat = false;
        $scope.clickStyleCat = {};
      }
      return $scope.cat;
    }

    // **********
    // TOGGLE DOG
    // **********
    $scope.toggleDog = function (){
      if ($scope.dog == false){
        $scope.dog = true;
        $scope.clickStyleDog = {'fill': '#fff'};
      } else {
        $scope.dog = false;
        $scope.clickStyleDog = {};
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

    // QUERY UPDATE
    $scope.queryUpdate = function(){
      $scope.query = { light : $scope.light,
                    width : $scope.width,
                    height : $scope.height,
                    water : $scope.water,
                    cat : $scope.cat,
                    dog : $scope.dog,
                    human : $scope.human };
    }


    // *********
    // PLANT SUGGESTION
    // *********
    $scope.suggestPlant = function(){
      $scope.queryUpdate();
      console.log("The query is: " + $scope.query);
      console.log("query.dog: " + $scope.query.dog);
      $http({
        method: "GET",
        url: "/plants",
        params: $scope.query
      }).then(
        function(response) {
          $scope.suggestplants = [];
          $scope.catClear = response;
          $scope.dogClear = [];

          $scope.catToxicityTest($scope.catClear);

          //$scope.humanToxicityTest($scope.dogClear);
          console.log("Suggested plants are: ", $scope.suggestedplants);
        });
      }

    // ***********
    // TOXICITY TESTS
    // ***********
    $scope.catToxicityTest = function(data){
      if($scope.query.cat == false){
        $scope.dogClear = data;
      } else {
        for(i=0; i<=data.length; i++){
          console.log("The data.name: ", data.name);
        }
      }
      $scope.dogToxicityTest($scope.dogClear);
    }

    $scope.dogToxicityTest = function(data){
      console.log("The data being used in the dog toxicity function: ", data);
    }

}]);
