app.controller("autoController", ['$rootScope','$scope','$mpAjax','$location','$q', '$baseConfig',

    function($rootScope,$scope,$mpAjax,$location,$q ,$baseConfig) {
        $scope.showAutoFlag = true;
        $scope.typeArray = $baseConfig.autoTypeArray;
        $scope.brandArray = [];
        $scope.setShowFlag = function(){
            $scope.showAutoFlag = ! $scope.showAutoFlag;
        }
        $scope.autoArray = [];
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
            $mpAjax.formPost($(dom).parent(),'/admin/'+$rootScope.adminId+'/image?type='+$baseConfig.imageType.autoImage,function(data){
                if(data.success){
                    $($currentDom.children()[0]).attr("src",'/api/image/'+data.imageId);
                    $scope.img = data.imageId;
                }else{
                    WarningBox('上传图片失败');
                }
            },function(error){
                ErrorBox('服务器内部错误');
            })
        }
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