myApp.controller('RoomController', ['$scope', '$http', function($scope, $http){
    console.log("RoomController is now running.");



    $scope.getUser = function() {
        $http({
            method: "GET",
            url: "/login"
        }).then(
            function (response) {
                console.log("This is the response: ", response);
            });
    };

    $scope.getRoomData = function(){
        $scope.roomData = [];
        $http({
            method: "GET",
            url: "/room",
            params: {
                username: $scope.selectedUser.username
            }
        }).then(
            function(response){
                console.log("The room response: ", response);
                $scope.roomData = response.data;
            }
        )
    }

    $scope.getUser();
}]);
