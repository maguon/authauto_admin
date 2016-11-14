app.controller("autoController", ['$rootScope','$scope','$mpAjax','$location','$q', '$baseConfig',

    function($rootScope,$scope,$mpAjax,$location,$q ,$baseConfig) {
        $scope.showAutoFlag = true;
        $scope.typeArray = $baseConfig.autoTypeArray;
        $scope.brandArray = [];
        $scope.setShowFlag = function(){
            $scope.showAutoFlag = ! $scope.showAutoFlag;
        }
        $scope.autoArray = [];
        $scope.getAuto = function(){
            $mpAjax.get('/admin/'+this.$root.adminId+'/auto').then(function(data){
                if(data.success){
                    $scope.autoArray = data.result;
                }else{
                    WarningBox('获取车辆信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        };

        $scope.getBrand = function(){
            $mpAjax.get('/admin/'+this.$root.adminId+'/brand?status=1').then(function(data){
                if(data.success){
                    $scope.brandArray = data.result;
                }else{
                    WarningBox('获取品牌信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        };

        $scope.getAuto();
        $scope.getBrand();

        $scope.addAuto= function(){
            var params = {
                nameCn : $scope.nameCn,
                nameEn : $scope.nameEn,
                brandId : $scope.brandId,
                img: $scope.img,
                remark:$scope.remark
            }
            $mpAjax.post('/admin/'+this.$root.adminId+'/auto',params).then(function(data){
                if(data.success){
                    //$scope.employeeArray = data.result;
                    $scope.getAuto();
                    $scope.setShowFlag();
                }else{
                    WarningBox('添加商品信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        }
    }])