myApp.controller('LoginController', ['$scope', '$http', function($scope, $http){
    //Logging in an existing user
    console.log('LoginController is running');

    $scope.getUser = function() {
        $http({
            method: "GET",
            url: "/login",
            params: {
                username: $scope.selectedUser.username,
                password: $scope.selectedUser.password
            }
        }).then(
            function (response) {
                console.log("This is the response: ", response);
            });
    };

}]);
