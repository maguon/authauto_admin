/**
 * Created by lingxue on 2016/11/17.
 */
app.controller("registerController", ['$rootScope','$scope','$mpAjax','$location','$q', '$baseConfig' ,

    function($rootScope,$scope,$mpAjax,$location,$q , $baseConfig ) {
        $scope.agreeFlag = true;
        //$scope.gender = 1;
        $scope.register = function(){
            console.log($scope.gender);
            if($scope.agreeFlag != true){
                InfoBox('Please agree the terms & conditions .');
                return;
            }
            if($scope.email ==null || $scope.firstName == null || $scope.lastName==null || $scope.email=='' || $scope.firstName == '' || $scope.lastName == ''){
                InfoBox('Please enter your information .');
                return;
            }
            if($scope.password == null || $scope.password == '' || $scope.confirmPassword == null || $scope.confirPassword == '' ){
                InfoBox('Please enter your password .');
                return;
            }
            if($scope.password != $scope.confirmPassword){
                InfoBox('Please enter the same password as above .');
                return;
            }
            $('#regBtn')[0].disabled = true;
            var params = {
                email : $scope.email,
                firstName : $scope.firstName,
                lastName : $scope.lastName,
                gender : $scope.gender,
                password : $scope.password,
                type: $baseConfig.userType.supplier
            }
            $mpAjax.post('/user',params).then(function(data){
                $('#regBtn')[0].disabled = false;
                if(data.success){
                    $mpAjax.setCookie($mpAjax.USER_AUTH_NAME ,data.result.accessToken);
                    $mpAjax.setCookie($mpAjax.USER_ID ,data.result.userId);
                    $mpAjax.setCookie($mpAjax.USER_STATUS ,data.result.userStatus);
                    window.location.href ='/supplier.html';
                }else{
                    WarningBox(data.msg);
                    $scope.password="";
                    $scope.confirmPassword="";
                }
            }).catch(function(error){
                $('#regBtn')[0].disabled = false;
                ErrorBox('Service internal error .');
            })
        }
    }])