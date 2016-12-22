app.controller("systemController", ['$rootScope','$scope','$mpAjax','$location','$q',

    function($rootScope,$scope,$mpAjax,$location,$q ) {
        $scope.producerArray = [];
        $scope.producerIndex = null;
        $scope.editFlag = false;
        $scope.getProducer = function(){
            $mpAjax.get('/producer').then(function(data){
                if(data.success){
                    $scope.producerArray = data.result;
                }else{
                    WarningBox('获取生产商信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        };

        $scope.addProducer = function(){
            var params = {
                nameCn : $scope.nameCn,
                nameEn : $scope.nameEn,
            }
            $mpAjax.post('/admin/'+this.$root.adminId+'/producer',params).then(function(data){
                if(data.success){
                    InfoBox('创建车辆生产商成功');
                    var subProducer = {
                        name_cn : $scope.nameCn,
                        name_en : $scope.nameEn,
                        id : data.id
                    }
                    $scope.producerArray.push(subProducer);
                    $scope.cancelEdit();
                }else{
                    WarningBox('创建车辆生产商错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        }
        $scope.saveProducer = function(){
            var params = {
                nameCn : $scope.nameCn,
                nameEn : $scope.nameEn,
            }
            $mpAjax.put('/admin/'+this.$root.adminId+'/producer/'+$scope.producerId,params).then(function(data){
                if(data.success){
                    InfoBox('更新车辆生产商成功');
                    $scope.producerArray[$scope.producerIndex].name_cn = $scope.nameCn;
                    $scope.producerArray[$scope.producerIndex].name_en = $scope.nameEn;
                    $scope.cancelEdit();
                }else{
                    WarningBox('更新车辆生产商错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        }
        $scope.editProducer = function(producerId,nameCn,nameEn,index){
            $scope.producerId = producerId ;
            $scope.producerIndex = index ;
            $scope.nameCn = nameCn;
            $scope.nameEn = nameEn;
            $scope.editFlag = true;
        }
        $scope.cancelEdit = function(){
            $scope.producerId= null;
            $scope.producerIndex= null;
            $scope.nameCn = "";
            $scope.nameEn = "";
            $scope.editFlag = false;
        }
        $scope.getProducer();
    }])