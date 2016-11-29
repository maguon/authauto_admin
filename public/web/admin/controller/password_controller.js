app.controller("passwordController", ['$rootScope','$scope','$mpAjax','$location','$q',

    function($rootScope,$scope,$mpAjax,$location,$q ) {


        $scope.changePassword = function(){
            $('#passwordBtn')[0].disabled = true;
            var params = {
                newPassword : $scope.newPassword,
                originPassword : $scope.originPassword
            }
            $mpAjax.put('/admin/'+this.$root.adminId+'/password',params).then(function(data){
                $('#passwordBtn')[0].disabled = false;
                if(data.success){
                    InfoBox('修改密码成功')
                }else{
                    WarningBox(data.msg);
                }
                $scope.newPassword = '';
                $scope.originPassword = '';
            }).catch(function(error){
                $('#passwordBtn')[0].disabled = false;
                ErrorBox('服务器内部错误');
            })
        }
    }])