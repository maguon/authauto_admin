app.controller("checkoutController", ['$rootScope','$scope','$mpAjax','$location','$q','$baseConfig', '$baseFunction',

    function($rootScope,$scope,$mpAjax,$location,$q ,$baseConfig ,$baseFunction) {
        $scope.producerIdArray = $baseFunction.getCookieCart();
        $scope.typeArray = $baseConfig.autoTypeArray;
        $scope.procureArray = [];
        $scope.step = 1;
        $scope.getProcure = function(idArray){
            var ids = idArray.join(',');
            $mpAjax.get('/procure?procureIds='+ids).then(function(data){
                if(data.success){
                    $scope.procureArray = data.result;
                }else{
                    WarningBox('Query procure info error')
                }
            }).catch(function(error){
                ErrorBox('Service internal error');
            })
        };
        $scope.removeTempProcure = function(id,index){
            $baseFunction.removeCookieCart(id);
            $scope.procureArray.splice(index,1);
            $rootScope.procureCount = $scope.procureArray.length;
        }
        $scope.doNext = function(){
            if($scope.step<3){
                $scope.step = $scope.step + 1;
            }
        }
        $scope.doPre =function(){
            if($scope.step>1){
                $scope.step = $scope.step - 1;
            }
        }
        if($scope.producerIdArray && $scope.producerIdArray.length>0){
            $scope.getProcure($scope.producerIdArray);
        }

    }])