app.controller("tableController", function ($scope, userService) {
    var promise = userService.getAll();
    $scope.users = promise;
    // $scope.loading = true;
    // $scope.clients = [];
    // promise.then(function(response) {
    //     console.log('depuis mon ctrl', response)
    //     $scope.users = response.data;
    //     $scope.loading = false;
    // }, function(reason) {
    //     console.log(reason);
    // });
});