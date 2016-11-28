app.controller("indexController", ['$rootScope','$scope','$mpAjax','$location','$q','$baseConfig', '$baseFunction',

    function($rootScope,$scope,$mpAjax,$location,$q ,$baseConfig ,$baseFunction) {
        $scope.typeArray = $baseConfig.autoTypeArray;
        $scope.procureArray = [];
        $scope.getProcure = function(){
            $mpAjax.get('/procure').then(function(data){
                if(data.success){
                    $scope.procureArray = data.result;
                }else{
                    WarningBox('Query procure info error .')
                }
            }).catch(function(error){
                ErrorBox('Service internal error .');
            })
        };
        $scope.getProcure();
        $scope.addCart = function(id){
            var procureCount = $baseFunction.addCookieCart(id);
            $rootScope.procureCount = procureCount;
        }
    }])