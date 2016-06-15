var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope){
    $scope.firstName = 'a';
    $scope.lastName = 'b';
    $scope.allName = function(){
        return $scope.firstName + $scope.lastName;
    }
})