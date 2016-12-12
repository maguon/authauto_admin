app.controller("userController", ['$rootScope','$scope','$mpAjax','$location','$q','$baseConfig', '$baseFunction',

    function($rootScope,$scope,$mpAjax,$location,$q ,$baseConfig ,$baseFunction) {
        $scope.typeArray = $baseConfig.autoTypeArray;
        $scope.user = {};
        $scope.nowTab = 1;
        $scope.changeTab = function(index){
            $scope.nowTab=index;
        }
        $scope.getUser = function(){
            $mpAjax.get('/user/'+$rootScope.userId).then(function(data){
                if(data.success){
                    if(data.result && data.result.length==1){
                        $scope.user = data.result[0];
                        $scope.user.gender= $scope.user.gender+"";
                    }else{
                        WarningBox('Query user info error .')
                    }
                }else{
                    WarningBox('Query user info error .')
                }
            }).catch(function(error){
                ErrorBox('Service internal error .');
            })
        };

        $scope.getBiz = function(){
            $mpAjax.get('/user/'+$rootScope.userId+'/supplier').then(function(data){
                if(data.success){
                    if(data.result && data.result.length==1){
                        $scope.supplier = data.result[0];
                    }else{
                        //WarningBox('Query user info error .')
                    }
                }else{
                    WarningBox('Query user info error .')
                }
            }).catch(function(error){
                ErrorBox('Service internal error .');
            })
        }
        $scope.getUser();
        $scope.getBiz();
    }])