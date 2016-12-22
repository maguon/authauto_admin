app.controller("procureHistoryController", ['$rootScope','$scope','$mpAjax','$location','$q', '$baseConfig',

    function($rootScope,$scope,$mpAjax,$location,$q ,$baseConfig) {
        $scope.getHistoryProcure = function(){
            $mpAjax.get('/procure?status='+$baseConfig.procureStatus.over).then(function(data){
                if(data.success){
                    $scope.procureArray = data.result;
                }else{
                    WarningBox('获取采购信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        }
        $scope.getHistoryProcure()
    }])