app.controller("brandController", ['$rootScope','$scope','$mpAjax','$location','$q',

    function($rootScope,$scope,$mpAjax,$location,$q ) {
        $scope.showBrandFlag = true;
        $scope.setShowFlag = function(){
            $scope.showBrandFlag = ! $scope.showBrandFlag;
        }
        $scope.brandArray = [];
        $scope.producerArray = [];
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
        };


        $scope.getProducer = function(){
            $mpAjax.get('/producer').then(function(data){
                if(data.success){
                    $scope.producerArray = data.result;
                }else{
                    WarningBox('获取山产商信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        };


        $scope.addBrand = function(){
            var that = this;
            var params = {
                brandCn : $scope.brandCn,
                brandEn : $scope.brandEn,
                image : $scope.image,
                producerId : $scope.producerId,
                remark:$scope.remark
            }
            $mpAjax.post('/admin/'+this.$root.adminId+'/brand',params).then(function(data){
                if(data.success){
                    //$scope.employeeArray = data.result;
                    var producer = {};
                    for(var i =0 ; i<that.producerArray.length;i++){
                        if(that.producerId = that.producerArray[i].id){
                            producer = that.producerArray[i];
                            break;
                        }
                    }
                    var subBrand= {
                        id : data.id,
                        brand_cn : that.brandCn,
                        brand_en : that.brandEn,
                        image : that.image,
                        remark : that.remark,
                        name_cn : producer.name_cn
                    }
                    $scope.brandCn = "";
                    $scope.brandEn = "";
                    $scope.remark = "";
                    $scope.brandArray.push(subBrand);
                    $scope.setShowFlag();
                }else{
                    WarningBox('更新品牌信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        }

        $scope.getBrand();
        $scope.getProducer();
    }])