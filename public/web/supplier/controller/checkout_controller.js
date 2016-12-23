app.controller("checkoutController", ['$rootScope','$scope','$mpAjax','$location','$q','$baseConfig', '$baseFunction',

    function($rootScope,$scope,$mpAjax,$location,$q ,$baseConfig ,$baseFunction) {
        $scope.producerIdArray = $baseFunction.getCookieCart();
        $scope.typeArray = $baseConfig.autoTypeArray;
        $scope.procureArray = [];
        $scope.step = 1;
        $scope.exportService = false;
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
        $scope.checkProcure = function(){
            if($scope.procureArray&& $scope.procureArray.length>0){
                for(var i =0; i<$scope.procureArray.length;i++){
                    if(!($scope.procureArray[i].price>0 && $scope.procureArray[i].qty>0)){
                        return false;
                    }
                }
                return true;
            }else{
                return false;
            }
        }
        $scope.getTaxRate = function(){
            $scope.zipcode = $mpAjax.getCookie($mpAjax.ZIPCODE)
            if($scope.zipcode){
                $mpAjax.get('/tax?zipcode='+$scope.zipcode).then(function(data){
                    if(data.success && data.result && data.result.totalRate){
                        $scope.taxRate = data.result.totalRate;
                    }
                }).catch(function(error){
                    ErrorBox('Service internal error');
                })
            }
        }
        $scope.addOffer = function(){
            var params = {
                procureArray : $scope.procureArray,
                supplierId :  $rootScope.supplierId,
                tax : $scope.taxRate
            };
            $mpAjax.post('/user/'+$rootScope.userId+"/offer",params).then(function(data){
                $('#addOfferBtn')[0].disabled = false;
                if(data.success){
                    $scope.step = $scope.step + 1;
                    $baseFunction.clearCookieCart();
                    $rootScope.procureCount = 0;
                }else{
                    WarningBox(data.msg);
                    //$scope.password="";
                }
            }).catch(function(error){
                $('#addOfferBtn')[0].disabled = false;
                ErrorBox('Service internal error .');
            })
        }
        $scope.doNext = function(){
            if($scope.step ==1 ){
                if($scope.checkProcure()){
                    $scope.step = $scope.step + 1;
                    return;
                }else{
                    //console.log('ddd');
                    WarningBox('Please enter price and quantity .')
                    return;
                }
            }else if($scope.step ==2 ){
                $scope.addOffer();
                return;
            }else if($scope.step ==3){
                $location.path('/offer')
                return;
            }else{
                return;
            }
        }
        $scope.doPre =function(){
            if($scope.step>1){
                $scope.step = $scope.step - 1;
            }
        }
        if($scope.producerIdArray && $scope.producerIdArray.length>0){
            $scope.getProcure($scope.producerIdArray);
            $scope.getTaxRate();
        }

    }])