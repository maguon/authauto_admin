/**
 * Created by lingxue on 2016/11/17.
 */
app.controller("loginController", ['$rootScope','$scope','$mpAjax','$location','$q','$baseConfig',

    function($rootScope,$scope,$mpAjax,$location,$q ,$baseConfig ) {
        $scope.login = function(){

            if($scope.email ==null || $scope.password == null || $scope.email=='' || $scope.password == '' ){
                InfoBox('Please enter your email and password.');
                return;
            }
            $('#loginBtn')[0].disabled = true;
            var params = {
                email : $scope.email,
                password : $scope.password
            }
            $mpAjax.post('/userLogin',params).then(function(data){
                $('#loginBtn')[0].disabled = false;
                if(data.success){
                    $mpAjax.setCookie($mpAjax.USER_AUTH_NAME ,data.result.accessToken);
                    $mpAjax.setCookie($mpAjax.USER_ID ,data.result.userId);
                    $mpAjax.setCookie($mpAjax.USER_STATUS ,data.result.userStatus);
                    $mpAjax.setCookie($mpAjax.USER_TYPE ,data.result.type);
                    if(data.result.type== $baseConfig.userType.supplier){
                        $mpAjax.get('/user/'+data.result.userId+"/supplier").then(function(data){
                            if(data.success && data.result.length>0){
                                $rootScope.supplierId = data.result[0].id;
                                $mpAjax.setCookie($mpAjax.SUPPLIER_ID ,data.result[0].id);
                            }else{
                                WarningBox('Query user supplier info error .')
                            }
                        }).catch(function(error){
                            ErrorBox('Service internal error .');
                        })
                    }
                    window.location.href ='/supplier.html';
                }else{
                    WarningBox(data.msg);
                    $scope.password="";
                }
            }).catch(function(error){
                $('#loginBtn')[0].disabled = false;
                ErrorBox('Service internal error .');
            })
        }
    }])