app.controller("procureDetailController", ['$rootScope','$scope','$mpAjax','$location','$q','$routeParams','$baseConfig',

    function($rootScope,$scope,$mpAjax,$location,$q ,$routeParams ,$baseConfig) {
        $scope.procureId = $routeParams.procureId;
        $scope.typeArray = $baseConfig.autoTypeArray;
        $scope.procure = {};
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
            $scope.offer = offerId;
            $('#offerBtn').click();
        }
        $scope.getProcure();
        $scope.getOffer();
    }])