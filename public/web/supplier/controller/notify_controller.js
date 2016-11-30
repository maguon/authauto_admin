app.controller("notifyController", ['$rootScope','$scope','$mpAjax','$location','$q','$baseConfig', '$baseFunction',

    function($rootScope,$scope,$mpAjax,$location,$q ,$baseConfig ,$baseFunction) {
        $scope.typeArray = $baseConfig.autoTypeArray;
        $scope.notifyArray = [];
        $scope.getNotify = function(){

        };
        $scope.getNotify();
    }])