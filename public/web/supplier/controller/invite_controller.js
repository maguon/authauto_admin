app.controller("inviteController", ['$rootScope','$scope','$mpAjax','$location','$q','$routeParams','$baseConfig', '$baseFunction',

    function($rootScope,$scope,$mpAjax,$location,$q ,$routeParams,$baseConfig ,$baseFunction) {
        $scope.inviteCode = $routeParams.inviteId;
        $scope.invite = {};
        $scope.gender = 1;
        $scope.getInviteInfo = function(){
            $mpAjax.get('/invite/'+$scope.inviteCode).then(function(data){
                if(data.success){
                    $scope.invite = data.result.invite;
                    $scope.supplier = data.result.supplier[0];
                    $scope.email = $scope.supplier.email;
                }else{
                    WarningBox('The invite code is error .')
                }
            }).catch(function(error){
                ErrorBox('Service internal error .');
            })
        }
        $scope.addUserByInvite = function(){
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
            $mpAjax.post('/invite/'+$scope.inviteCode+'/supplier',params).then(function(data){
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
        $scope.getInviteInfo();
    }])