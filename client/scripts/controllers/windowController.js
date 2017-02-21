
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
      $http({
        method: "GET",
        url: "/plants",
        params: $scope.query
      }).then(
        function(response) {
          $scope.suggestplants = [];
          $scope.catClear = [];
          $scope.dogClear = [];
          $scope.humanClear = [];

          // $scope.catToxicityTest(response);
          // $scope.dogToxicityTest(response);
          // $scope.humanToxicityTest(response);
          // $scope.toxicityConsolidate();

          $scope.suggestPlants(response);
        });
      }

    // ***********
    // TOXICITY TESTS
    // ***********

    $scope.suggestPlants = function(data){

      var data = data.data;
      $scope.suggestedplants = data;

      if($scope.query.dog == true){
        for (var i = $scope.suggestedplants.length - 1; i >= 0; i--) {
          if($scope.suggestedplants[i].dog == true){
          $scope.suggestedplants.splice(i, 1);
          }
        }
      }
      console.log("Cleared dog filter: ", $scope.suggestedplants);
      $scope.catTest();
    }

    $scope.catTest = function(){

      if($scope.query.cat == true){
        for (var i = $scope.suggestedplants.length - 1; i >= 0; i--) {
          if($scope.suggestedplants[i].cat == true){
          $scope.suggestedplants.splice(i, 1);
          }
        }
      }
      console.log("Cleared cat filter: ", $scope.suggestedplants);
      $scope.humanTest();
    }



$scope.humanTest = function(){

  if($scope.query.human == true){
    for (var i = $scope.suggestedplants.length - 1; i >= 0; i--) {
      if($scope.suggestedplants[i].human == true){
      $scope.suggestedplants.splice(i, 1);
      }
    }
  }
  console.log("Cleared human filter: ", $scope.suggestedplants);
}


    // // CAT
    // $scope.catToxicityTest = function(data){
    //   if($scope.query.cat == false){
    //     $scope.catClear = data;
    //   } else {
    //     var data = data.data;
    //     console.log("Dude, are you even alive? ", data);
    //     for(i=0; i<data.length; i++){
    //       if(data[i].cat == false){
    //         $scope.catClear.push(data[i]);
    //       }
    //     }
    //     console.log("The catClear Array: ", $scope.catClear);
    //   }
    //   return $scope.catClear;
    // }
    //
    // // DOG
    // $scope.dogToxicityTest = function(data){
    //   if($scope.query.dog == false){
    //     $scope.dogClear = data;
    //   } else {
    //     var data = data.data;
    //     console.log("Dude, are you even alive? ", data);
    //     for(i=0; i<data.length; i++){
    //       if(data[i].dog == false){
    //         $scope.dogClear.push(data[i]);
    //       }
    //     }
    //     console.log("The dogClear Array: ", $scope.dogClear);
    //   }
    //   return $scope.dogClear;
    // }
    //
    // // HUMAN
    // $scope.humanToxicityTest = function(data){
    //   if($scope.query.human == false){
    //     $scope.humanClear = data;
    //   } else {
    //     var data = data.data;
    //     console.log("Dude, are you even alive? ", data);
    //     for(i=0; i<data.length; i++){
    //       if(data[i].human == false){
    //         $scope.humanClear.push(data[i]);
    //       }
    //     }
    //     console.log("The humanClear Array: ", $scope.humanClear);
    //   }
    //   return $scope.humanClear;
    // }
    //
    // // TOXICITY CONSOLIDATION
    // $scope.toxicityConsolidate = function(){
    //   console.log("catClear: ", $scope.catClear);
    //   console.log("dogClear: ", $scope.dogClear);
    //   console.log("humanClear: ", $scope.humanClear);
    //
    // }

}]);
