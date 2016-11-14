app.controller("userController", ['$rootScope','$scope','$mpAjax','$location','$q',

    function($rootScope,$scope,$mpAjax,$location,$q ) {
        $scope.getUser = function(){
            $mpAjax.get('/admin/'+this.$root.adminId+'/user').then(function(data){
                if(data.success){
                    $scope.userArray = data.result;
                }else{
                    WarningBox('获取课程信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        };
        $scope.getUser();
    }])