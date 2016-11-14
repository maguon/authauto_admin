app.controller("loginController", ['$rootScope','$scope','$mpAjax','$location','$q',

    function($rootScope,$scope,$mpAjax,$location,$q ) {

        if($mpAjax.getCookie($mpAjax.ADMIN_ID) != '' && $mpAjax.getCookie($mpAjax.ADMIN_AUTH_NAME) != ''){
            $mpAjax.get('/admin/'+$mpAjax.getCookie($mpAjax.ADMIN_ID)+'/token/'+$mpAjax.getCookie($mpAjax.ADMIN_AUTH_NAME)).then(
                function(data){
                    if(data.success){
                        $mpAjax.setCookie($mpAjax.ADMIN_AUTH_NAME,data.accessToken);
                        $mpAjax.setCookie($mpAjax.ADMIN_STATUS ,data.adminStatus);
                        window.location.href ='/admin.html';
                    }else{
                        $mpAjax.removeCookie($mpAjax.ADMIN_ID);
                        $mpAjax.removeCookie($mpAjax.ADMIN_AUTH_NAME);
                    }
                }
            ).catch(function(error){
                $mpAjax.removeCookie($mpAjax.ADMIN_ID);
                $mpAjax.removeCookie($mpAjax.ADMIN_AUTH_NAME);
            });
        }
        $scope.login = function(){

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