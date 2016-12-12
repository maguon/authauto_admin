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
            $mpAjax.get('/user/'+$rootScope.userId+"/offer?procureStatus="+$baseConfig.procureStatus.active).then(function(data){
                if(data.success){
                    $scope.currentOfferArray = data.result;
                }else{
                    WarningBox('Query offer info error .')
                }
            }).catch(function(error){
                ErrorBox('Service internal error .');
            })
        };
        $scope.getHistoryOffer = function(){
            $mpAjax.get('/user/'+$rootScope.userId+"/offer?procureStatus="+$baseConfig.procureStatus.over).then(function(data){
                if(data.success){
                    $scope.historyOfferArray = data.result;
                }else{
                    WarningBox('Query offer info error .')
                }
            }).catch(function(error){
                ErrorBox('Service internal error .');
            })
        };
        $scope.getCurrentOffer();
        $scope.getHistoryOffer();
    }])