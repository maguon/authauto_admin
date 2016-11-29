app.controller("passwordController", ['$rootScope','$scope','$mpAjax','$location','$q',

    function($rootScope,$scope,$mpAjax,$location,$q ) {


        $scope.changePassword = function(){

            if($scope.username ==null || $scope.password == null || $scope.username=='' || $scope.password == '' ){
                InfoBox('请输入用户名和密码');
                return;
            }
            $('#loginBtn')[0].disabled = true;
            var params = {
                username : $scope.username,
                password : $scope.password
            }
            $mpAjax.post('/admin/do/login',params).then(function(data){
                $('#loginBtn')[0].disabled = false;
                if(data.success){
                    $mpAjax.setCookie($mpAjax.ADMIN_AUTH_NAME ,data.result.accessToken);
                    $mpAjax.setCookie($mpAjax.ADMIN_ID ,data.result.userId);
                    $mpAjax.setCookie($mpAjax.ADMIN_STATUS ,data.result.userStatus);
                    window.location.href ='/admin.html';
                }else{
                    WarningBox(data.msg);
                }
            }).catch(function(error){
                $('#loginBtn')[0].disabled = false;
                ErrorBox('服务器内部错误');
            })
        }

    }])