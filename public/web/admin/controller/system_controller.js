app.controller("systemController", ['$rootScope','$scope','$mpAjax','$location','$q',

    function($rootScope,$scope,$mpAjax,$location,$q ) {
        $scope.producerArray = [];
        $scope.getProducer = function(){
            $mpAjax.get('/admin/'+this.$root.adminId+'/producer').then(function(data){
                if(data.success){
                    $scope.producerArray = data.result;
                }else{
                    WarningBox('获取生产商信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        };
        $scope.getProducer();
    }])