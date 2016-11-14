app.controller("indexController", ['$rootScope','$scope','$mpAjax','$location','$q',

    function($rootScope,$scope,$mpAjax,$location,$q ) {
        $scope.title = '欢迎使用泓洋国际进口车采购管理平台';
        $scope.brandCount  = 0;
        $scope.autoCount  = 0;
        $scope.supplierCount  = 0;
        $scope.getBrandCount = function(){
            $mpAjax.get('/admin/'+this.$root.adminId+'/brandCount').then(function(data){
                if(data.success){
                    $scope.brandCount = data.result[0].total_count;
                }else{
                    WarningBox('获取品牌数量信息错误');
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        }
        $scope.getAutoCount = function(){
            $mpAjax.get('/admin/'+this.$root.adminId+'/autoCount').then(function(data){
                if(data.success){
                    $scope.autoCount = data.result[0].total_count;
                }else{
                    WarningBox('获取车型数量信息错误');
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        }
        $scope.getSupplierCount = function(){
            $mpAjax.get('/admin/'+this.$root.adminId+'/supplierCount').then(function(data){
                if(data.success){
                    $scope.supplierCount = data.result[0].total_count;
                }else{
                    WarningBox('获取供应商数量信息错误');
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        }
        $scope.getAutoCount();
        $scope.getBrandCount();
        $scope.getSupplierCount();
    }])