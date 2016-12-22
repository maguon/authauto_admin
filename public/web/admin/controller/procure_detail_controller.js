app.controller("procureDetailController", ['$rootScope','$scope','$mpAjax','$location','$q','$routeParams','$baseConfig',

    function($rootScope,$scope,$mpAjax,$location,$q ,$routeParams ,$baseConfig) {
        $scope.procureId = $routeParams.procureId;
        $scope.typeArray = $baseConfig.autoTypeArray;
        $scope.procure = {};
        $scope.offerId = null;
        $scope.offerArray = [];
        $scope.getProcure = function(){
            $mpAjax.get('/procure?procureId='+$scope.procureId).then(function(data){
                if(data.success){
                    $scope.procure = data.result[0];
                }else{
                    WarningBox('获取采购信息错误');
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        };
        $scope.getOffer = function(){
            $mpAjax.get('/admin/'+$rootScope.adminId+'/offer?procureId='+$scope.procureId).then(function(data){
                if(data.success){
                    $scope.offerArray = data.result;
                }else{
                    WarningBox('获取报价信息错误');
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        }
        $scope.showSupplier = function(supplierId){
            $mpAjax.get('/admin/'+this.$root.adminId+'/supplier?supplierId='+supplierId).then(function(data){
                if(data.success){

                    $scope.supplier = data.result[0];

                }else{
                    WarningBox('获取供应商信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
            $('#supplierBtn').click();
        }
        $scope.showOffer = function(offerId){
            $mpAjax.get('/admin/'+this.$root.adminId+'/offer?offerId='+offerId).then(function(data){
                if(data.success){

                    $scope.offer = data.result[0];

                }else{
                    WarningBox('获取报价信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
            $('#offerBtn').click();
        }
        $scope.showOfferConfirm = function(offerId,price,qty){
            $scope.offerId = offerId;
            $scope.actualPrice = price;
            $scope.actualQty = qty;
            $('#offerConfirmBtn').click();
        }
        $scope.finishProcure = function(){
            $mpAjax.put('/admin/'+this.$root.adminId+'/procure/'+$scope.procureId+'/status/'+$baseConfig.procureStatus.over,{}).then(function(data){
                if(data.success) {
                    SuccessBox('结束采购信息成功');
                    $scope.getProcure();
                }else{
                    WarningBox('结束采购信息失败')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        }
        $scope.selectOffer = function(){
            if($scope.offerId && Number.isInteger($scope.offerId)){
                var params = {
                    status : $baseConfig.offerStatus.selected,
                    actualPrice : $scope.actualPrice,
                    actualQty : $scope.actualQty

                };
                $mpAjax.put('/admin/'+this.$root.adminId+'/offer/'+$scope.offerId+'/status',params).then(function(data){
                    if(data.success) {
                        SuccessBox('选择报价信息成功');
                        $scope.getProcure();
                    }else{
                        WarningBox('选择报价信息失败');
                    }
                }).catch(function(error){
                    ErrorBox('服务器内部错误');
                })
            }else{
                WarningBox('参数错误，请刷新后重新执行')
            }

        }
        $scope.getProcure();
        $scope.getOffer();
    }])