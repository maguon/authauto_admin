app.controller("checkoutController", ['$rootScope','$scope','$mpAjax','$location','$q','$baseConfig', '$baseFunction',

    function($rootScope,$scope,$mpAjax,$location,$q ,$baseConfig ,$baseFunction) {
        $scope.producerIdArray = $baseFunction.getCookieCart();
        $scope.typeArray = $baseConfig.autoTypeArray;
        $scope.procureArray = [];
        $scope.step = 1;
        $scope.getProcure = function(){
            $mpAjax.get('/procure').then(function(data){
                if(data.success){
                    $scope.procureArray = data.result;
                }else{
                    WarningBox('��ȡ�ɹ���Ϣ����')
                }
            }).catch(function(error){
                ErrorBox('�������ڲ�����');
            })
        };
        $scope.removeTempProcure = function(id){

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
        $scope.getProcure();
    }])