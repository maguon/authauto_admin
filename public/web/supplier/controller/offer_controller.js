app.controller("offerController", ['$rootScope','$scope','$mpAjax','$location','$q','$baseConfig', '$baseFunction',

    function($rootScope,$scope,$mpAjax,$location,$q ,$baseConfig ,$baseFunction) {
        $scope.typeArray = $baseConfig.autoTypeArray;
        $scope.currentOfferArray = [];
        $scope.historyOfferArray = [];
        $scope.nowTab = 1;
        $scope.changeTab = function(index){
            $scope.nowTab=index;
        }
        $scope.getCurrentOffer = function(){

        };
        $scope.getHistoryOffer = function(){

        };
        $scope.getCurrentOffer();
        $scope.getHistoryOffer();
    }])