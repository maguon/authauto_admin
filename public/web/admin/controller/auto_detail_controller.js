app.controller("autoDetailController", ['$rootScope','$scope','$mpAjax','$location','$q','$routeParams','$baseConfig',

    function($rootScope,$scope,$mpAjax,$location,$q ,$routeParams ,$baseConfig) {
        $scope.autoId = $routeParams.autoId;
        $scope.brandArray = [];
        $scope.typeArray = $baseConfig.autoTypeArray;
        $scope.extraId = 0;
        $scope.extraArray = [];
        $scope.type= '1';
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
            $mpAjax.formPost($(dom).parent().parent(),'/admin/'+$rootScope.adminId+'/image?type='+$baseConfig.imageType.autoImage,function(data){
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
        $scope.getAutoInfo = function(){
            $mpAjax.get('/admin/'+this.$root.adminId+'/auto?autoId='+$scope.autoId).then(function(data){
                if(data.success){

                    $scope.auto = data.result[0];
                    $scope.nameCn = data.result[0].name_cn;
                    $scope.nameEn = data.result[0].name_en;
                    $scope.brandId = data.result[0].brand_id;
                    $scope.img = data.result[0].img;
                    $scope.remark = data.result[0].remark;

                }else{
                    WarningBox('获取车辆信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        };
        $scope.getAutoExtra = function(){
            $mpAjax.get('/admin/'+this.$root.adminId+'/auto/'+$scope.autoId+"/extra").then(function(data){
                if(data.success){
                    $scope.extraArray = data.result;
                }else{
                    WarningBox('获取车辆附加信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        }
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
        };
        $scope.updateAuto = function(){
            var params = {
                nameCn : $scope.nameCn,
                nameEn : $scope.nameEn,
                brandId : $scope.brandId,
                img: $scope.img,
                remark:$scope.remark
            }
            $mpAjax.put('/admin/'+this.$root.adminId+'/auto/'+$scope.autoId,params).then(function(data){
                if(data.success) {
                    SuccessBox('更新车辆信息成功')
                }else{
                    WarningBox('更新车辆信息失败')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        };

        $scope.createAutoExtra = function() {
            var that = this;
            var params = {
                year : $scope.year,
                vol : $scope.vol,
                type : $scope.type,
                item: $scope.item
            }
            $mpAjax.post('/admin/'+this.$root.adminId+'/auto/'+$scope.autoId+'/extra',params).then(function(data){
                if(data.success) {
                    SuccessBox('新增车辆附加信息成功');
                    var subExtra ={};
                    subExtra.year = that.year;
                    subExtra.vol = that.vol;
                    subExtra.type = that.type;
                    subExtra.item = that.item;
                    that.extraArray.push(subExtra);
                }else{
                    WarningBox('新增车辆附加信息失败')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        }
        $scope.updateAutoExtra = function(){
            var that = this;
            var params = {
                year : $scope.year,
                vol : $scope.vol,
                type : $scope.type,
                item: $scope.item
            }
            $mpAjax.put('/admin/'+this.$root.adminId+'/extra/'+$scope.extraId,params).then(function(data){
                if(data.success) {
                    var i = that.extraIndex;
                    that.extraArray[i].year = that.year;
                    that.extraArray[i].vol = that.vol;
                    that.extraArray[i].type = that.type;
                    that.extraArray[i].item = that.item;
                    SuccessBox('更新车辆信息成功')
                }else{
                    WarningBox('更新车辆信息失败')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        };
        $scope.saveAutoExtra = function(){
            if($scope.extraId == 0){
                $scope.createAutoExtra();
            }else{
                $scope.updateAutoExtra();
            }
        }
        $scope.clickExtra = function(extra ,index){
            $scope.year = extra.year;
            $scope.extraId = extra.id;
            $scope.type = extra.type+"";
            $scope.item = extra.item;
            $scope.vol = extra.vol;
            $scope.extraIndex = index;
        }
        $scope.getAutoInfo();
        $scope.getBrand();
        $scope.getAutoExtra();
    }])