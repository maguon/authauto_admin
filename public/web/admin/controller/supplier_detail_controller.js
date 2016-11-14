app.controller("supplierDetailController", ['$rootScope','$scope','$mpAjax','$location','$q','$routeParams','$baseConfig',

    function($rootScope,$scope,$mpAjax,$location,$q ,$routeParams ,$baseConfig) {
        $scope.supplierId = $routeParams.supplierId;

        $scope.getSupplier = function(){
            $mpAjax.get('/admin/'+this.$root.adminId+'/supplier?supplierId='+$scope.supplierId).then(function(data){
                if(data.success){

                    $scope.supplier = data.result[0];
                    $scope.userId = data.result[0].user_id;
                    $scope.bizName = data.result[0].biz_name;
                    $scope.contact = data.result[0].contact;
                    $scope.email = data.result[0].email;
                    $scope.phone = data.result[0].phone;
                    $scope.fax = data.result[0].fax;
                    $scope.zipcode = data.result[0].zipcode;
                    $scope.state = data.result[0].state;
                    $scope.city = data.result[0].city;
                    $scope.website = data.result[0].website;
                    $scope.address = data.result[0].address;
                    $scope.status = data.result[0].status;
                    $scope.remark = data.result[0].remark;

                }else{
                    WarningBox('获取供应商信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        };

        $scope.getSupplier();


        $scope.updateSupplier = function(){
            var params = {
                bizName : $scope.bizName,
                contact : $scope.contact,
                email : $scope.email,
                phone: $scope.phone,
                fax: $scope.fax,
                zipcode: $scope.zipcode,
                state: $scope.state,
                city: $scope.city,
                address: $scope.address,
                website: $scope.website,
                remark:$scope.remark
            }
            $mpAjax.put('/admin/'+this.$root.adminId+'/supplier/'+$scope.supplierId,params).then(function(data){
                if(data.success) {
                    SuccessBox('更新供应商信息成功')
                }else{
                    WarningBox('更新供应商信息失败')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        };

    }])