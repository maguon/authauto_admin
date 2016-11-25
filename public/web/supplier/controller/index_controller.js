app.controller("indexController", ['$rootScope','$scope','$mpAjax','$location','$q','$baseConfig', '$baseFunction',

    function($rootScope,$scope,$mpAjax,$location,$q ,$baseConfig ,$baseFunction) {
        $scope.typeArray = $baseConfig.autoTypeArray;
        $scope.procureArray = [];
        $scope.getProcure = function(){
            $mpAjax.get('/procure').then(function(data){
                if(data.success){
                    $scope.procureArray = data.result;
                }else{
                    WarningBox('获取采购信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        };
        $scope.getProcure();
        $scope.addCart = function(id){
            var procureCount = $baseFunction.addCookieCart(id);
            $rootScope.procureCount = procureCount;
        }
    }])