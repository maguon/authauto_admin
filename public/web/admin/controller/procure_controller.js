app.controller("procureController", ['$rootScope','$scope','$mpAjax','$location','$q', '$baseConfig',

    function($rootScope,$scope,$mpAjax,$location,$q ,$baseConfig) {
        $scope.showProcureFlag = true;
        $scope.setShowFlag = function(){
            $scope.showProcureFlag = ! $scope.showProcureFlag;
        };
        $('.date-picker').datepicker({autoclose:true,dateFormat:'yyyy-mm-dd',language: 'zh-CN'});
        $scope.typeArray = $baseConfig.autoTypeArray;
        $scope.brandArray = [];
        $scope.autoArray = [];
        $scope.extraArray = [];
        $scope.procureArray = [];
        $scope.getProcure = function(){
            $mpAjax.get('/procure?status='+$baseConfig.procureStatus.active).then(function(data){
                if(data.success){
                    $scope.procureArray = data.result;
                }else{
                    WarningBox('获取采购信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        }
        $scope.getBrand = function(){
            $mpAjax.get('/brand').then(function(data){
                if(data.success){
                    $scope.brandArray = data.result;
                }else{
                    WarningBox('获取品牌信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        }
        $scope.getAuto = function(brandId){
            $mpAjax.get('/auto?brandId='+brandId).then(function(data){
                if(data.success){
                    $scope.autoArray = data.result;
                }else{
                    WarningBox('获取车辆信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        };
        $scope.getAutoExtra = function(autoId){
            $mpAjax.get('/auto/'+autoId+"/extra").then(function(data){
                if(data.success){
                    $scope.extraArray = data.result;
                }else{
                    WarningBox('获取车辆附加信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        }
        $scope.addProcure = function(){
            var params = {
                end : $scope.end,
                extraId : $scope.extraId,
                qty : $scope.qty,
                remark: $scope.remark
            };
            console.log(params);
            //return;
            $mpAjax.post('/admin/'+this.$root.adminId+'/procure',params).then(function(data){
                if(data.success) {
                    SuccessBox('新增采购信息成功');
                    $scope.showProcureFlag = true;
                    $scope.getProcure();
                }else{
                    WarningBox('新增采购信息失败')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        }

        $scope.getBrand();
        $scope.getProcure();
    }])