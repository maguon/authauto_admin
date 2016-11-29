app.controller("systemController", ['$rootScope','$scope','$mpAjax','$location','$q',

    function($rootScope,$scope,$mpAjax,$location,$q ) {
        $scope.producerArray = [];
        $scope.getProducer = function(){
            $mpAjax.get('/admin/'+this.$root.adminId+'/producer').then(function(data){
                if(data.success){
                    $scope.producerArray = data.result;
                }else{
                    WarningBox('��ȡ��������Ϣ����')
                }
            }).catch(function(error){
                ErrorBox('�������ڲ�����');
            })
        };
        $scope.getProducer();
    }])