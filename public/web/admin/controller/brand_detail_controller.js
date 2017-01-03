app.controller("brandDetailController", ['$rootScope','$scope','$mpAjax','$location','$q','$routeParams','$baseConfig',

    function($rootScope,$scope,$mpAjax,$location,$q ,$routeParams ,$baseConfig) {
        $scope.brandId = $routeParams.brandId;
        $scope.defaultImage = $baseConfig.defaultImage;
        $scope.bindFile = function($event){
            $($event.target).parent().next().trigger('click');
        };
        $scope.uploadBrandImage = function(dom){
            var filename = $(dom).val();
            if((/\.(jpe?g|png|gif|svg|bmp|tiff?)$/i).test(filename)) {
                //check size
                //$file_input[0].files[0].size
                var max_size_str = $(dom).attr('max_size');
                var max_size = 4*1024*1024; //default: 4M
                var re = /\d+m/i;
                if(re.test(max_size_str))  {
                    max_size = parseInt(max_size_str.substring(0,max_size_str.length-1))*1024*1024;
                }

                if($(dom)[0].files[0].size > max_size) {
                    WarningBox('图片文件最大: '+max_size_str);
                    return false;
                }

            }
            else if(filename && filename.length>0){
                $(dom).val('');
                ErrorBox('支持的图片类型为. (jpeg,jpg,png,gif,svg,bmp,tiff)');
            }
            $currentDom = $(dom).prev();
            $mpAjax.formPost($(dom).parent(),'/admin/'+$rootScope.adminId+'/image?type='+$baseConfig.imageType.brandImage,function(data){
                if(data.success){
                    $($currentDom.children()[0]).attr("src",'/api/image/'+data.imageId);
                    $scope.image = data.imageId;
                }else{
                    WarningBox('上传图片失败');
                }
            },function(error){
                ErrorBox('服务器内部错误');
            })
        }
        $scope.getBrand = function(){
            $mpAjax.get('/brand?brandId='+$scope.brandId).then(function(data){
                if(data.success){
                    $scope.brand = data.result[0];
                    $scope.brandCn = data.result[0].brand_cn;
                    $scope.brandEn = data.result[0].brand_en;
                    $scope.producerId = data.result[0].producer_id;
                    $scope.image = data.result[0].image;
                    $scope.remark = data.result[0].remark;
                }else{
                    WarningBox('获取品牌信息错误');
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
                    WarningBox('获取课程信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        };
        $scope.updateBrand = function(){
            var params = {
                brandCn:$scope.brandCn,
                brandEn:$scope.brandEn,
                producerId:$scope.producerId,
                image:$scope.image,
                remark:$scope.remark
            };
            $mpAjax.put('/admin/'+this.$root.adminId+'/brand/'+$scope.brandId,params).then(function(data){
                if(data.success) {
                    SuccessBox('更新品牌信息成功')
                }else{
                    WarningBox('更新品牌信息失败')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        };
        $scope.getCar = function(){
            $mpAjax.get('/admin/'+this.$root.adminId+'/car?brandId='+$scope.brandId).then(function(data){
                if(data.success){
                    $scope.brand = data.result[0];
                    $scope.brandCn = data.result[0].brand_cn;
                    $scope.brandEn = data.result[0].brand_en;
                    $scope.producerId = data.result[0].producer_id;
                    $scope.image = data.result[0].image;
                    $scope.remark = data.result[0].remark;
                }else{
                    WarningBox('获取商品类别信息错误');
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        }
        //$scope.getCar();
        $scope.getBrand();
        $scope.getProducer();
    }])