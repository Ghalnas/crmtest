var app = angular.module('todoApp', ['ngResource', 'ui.router']);
app.filter('reverse', function() {
    return function(items) {
        if(!items) {
            return "";
        }
        return items.slice().reverse();
    };
});
app.config(['$stateProvider',function($stateProvider) {
    var detailstate = {
        url: '/user/:userId',
        name: 'detailstate',
        templateUrl: 'user-detail.html',
        controller: function($stateParams, $scope, userService, messageService) {
            var promise = userService.getOne($stateParams.userId);
            $scope.data = {
                type: "call",
                message: ""
            };

            var dataCopy = angular.copy($scope.data);

            promise.$promise.then(function (result) {
                console.log(result);
                $scope.user = result;
                $scope.data.user_id = $scope.user.id;
                dataCopy.user_id = $scope.user.id;
            });



            $scope.submitForm = function(){
                var msgCopy = angular.copy($scope.data);
                $scope.user.messages.push(msgCopy);
                messageService.insertOrUpdate(msgCopy);
                $scope.data = angular.copy(dataCopy);
                console.log(dataCopy);
            };
        },
        controllerAs: 'Details'
    };

    var baseState = {
        url: '',
        name: 'basestate',
        templateUrl: 'table.html'
    };

    $stateProvider
        .state(baseState)
        .state(detailstate);
}]);

makeEntityService(app, 'user');
makeEntityService(app, 'message');

