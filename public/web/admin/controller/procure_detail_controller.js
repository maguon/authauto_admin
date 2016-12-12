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
        $scope.getProcure();
        $scope.getOffer();
    }])