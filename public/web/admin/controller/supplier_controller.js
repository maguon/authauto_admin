app.controller("supplierController", ['$rootScope','$scope','$mpAjax','$location','$q', '$baseConfig',

    function($rootScope,$scope,$mpAjax,$location,$q ,$baseConfig) {
        $scope.showSupplierFlag = true;
        $scope.supplierArray = [];
        $scope.setShowFlag = function(){
            $scope.showSupplierFlag = ! $scope.showSupplierFlag;
        }
        $scope.getSupplier = function(){
            $mpAjax.get('/admin/'+this.$root.adminId+'/supplier').then(function(data){
                if(data.success){
                    $scope.supplierArray = data.result;
                }else{
                    WarningBox('获取供应商信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        };



        $scope.getSupplier();

        $scope.addSupplier= function(){
            var that = this;
            var params = {
                bizName : $scope.bizName,
                contact : $scope.contact,
                email : $scope.email,
                phone: $scope.phone,
                fax: $scope.fax,
                state: $scope.state,
                city: $scope.city,
                address: $scope.address,
                website: $scope.website,
                remark:$scope.remark
            }
            $mpAjax.post('/admin/'+this.$root.adminId+'/supplier',params).then(function(data){
                if(data.success){
                    var subSupplier = {
                        id : data.id,
                        bizName : that.bizName,
                        contact : that.contact,
                        phone : that.phone,
                        state : that.state,
                        city : that.city,
                        address : that.address,
                        website : that.website,
                        remark : that.remark,
                        created_on : new Date()
                    }
                    $scope.supplierArray.push(subSupplier);
                    $scope.setShowFlag();
                }else{
                    WarningBox('添加供应商信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        }
    }])