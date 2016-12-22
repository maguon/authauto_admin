app.controller("procureHistoryController", ['$rootScope','$scope','$mpAjax','$location','$q', '$baseConfig',

    function($rootScope,$scope,$mpAjax,$location,$q ,$baseConfig) {
        $scope.getHistoryProcure = function(){
            $mpAjax.get('/procure?status='+$baseConfig.procureStatus.over).then(function(data){
                if(data.success){
                    $scope.procureArray = data.result;
                }else{
                    WarningBox('��ȡ�ɹ���Ϣ����')
                }
            }).catch(function(error){
                ErrorBox('�������ڲ�����');
            })
        }
        $scope.getHistoryProcure()
    }])