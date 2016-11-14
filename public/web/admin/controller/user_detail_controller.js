app.controller("userDetailController", ['$rootScope','$scope','$mpAjax','$location','$q','$routeParams',

    function($rootScope,$scope,$mpAjax,$location,$q ,$routeParams) {
        $scope.userId = $routeParams.userId;
        $scope.getUserInfo = function(){
            $mpAjax.get('/admin/'+this.$root.adminId+'/user?userId='+$scope.userId).then(function(data){
                if(data.success){
                    $scope.user = data.result[0];
                    if($scope.user.gender){
                        $scope.user.gender = $scope.user.gender == 0 ?'女':'男'
                    }
                }else{
                    WarningBox('获取用户信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        };
        $scope.updateUserType = function(){

            $mpAjax.put('/admin/'+this.$root.adminId+'/user/'+$scope.userId+"/userType/"+$scope.userType,{}).then(function(data){
                if(data.success) {
                    SuccessBox('更新客户类型信息成功')
                }else{
                    WarningBox('更新客户类型信息失败')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        }
        $scope.updateUserStatus = function(){
            $mpAjax.put('/admin/'+this.$root.adminId+'/user/'+$scope.userId+"/userStatus/"+$scope.userStatus,{}).then(function(data){
                if(data.success) {
                    SuccessBox('更新客户状态信息成功')
                }else{
                    WarningBox('更新客户状态信息失败')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        }
        $scope.updateUserEmployee = function(){
            $mpAjax.put('/admin/'+this.$root.adminId+'/user/'+$scope.userId+"/employee/"+$scope.employeeId,{}).then(function(data){
                if(data.success) {
                    SuccessBox('更新客户推荐人成功')
                }else{
                    WarningBox('更新客户推荐人失败')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        }
        $scope.updateUser = function(){
            var params = {
                remark : $scope.remark
            }
            $mpAjax.put('/admin/'+this.$root.adminId+'/user/'+$scope.userId,params).then(function(data){
                if(data.success) {
                    SuccessBox('更新客户信息成功')
                }else{
                    WarningBox('更新客户信息失败')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        }
        $scope.getUserInfo();


    }])