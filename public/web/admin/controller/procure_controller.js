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
        $scope.getBrand = function(){
            $mpAjax.get('/admin/'+this.$root.adminId+'/brand').then(function(data){
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
            $mpAjax.get('/admin/'+this.$root.adminId+'/auto?brandId='+brandId).then(function(data){
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
            $mpAjax.get('/admin/'+this.$root.adminId+'/auto/'+autoId+"/extra").then(function(data){
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
            alert($scope.end);
        }

        $scope.getBrand();

    }])