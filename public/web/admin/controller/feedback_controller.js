/**
 * Created by lingxue on 2016/11/25.
 */
app.controller("feedbackController", ['$rootScope','$scope','$mpAjax','$location','$q', '$baseConfig',

    function($rootScope,$scope,$mpAjax,$location,$q ,$baseConfig) {
        $scope.feedbackArray = [];
        $scope.getFeedback = function(){
            $mpAjax.get('/admin/'+this.$root.adminId+'/feedback').then(function(data){
                if(data.success){
                    $scope.feedbackArray = data.result;
                }else{
                    WarningBox('获取反馈信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        }

        $scope.updateFeedbackStatus = function(feedbackId,i){
            //console.log(feedbackId,i);
            $mpAjax.put('/admin/'+this.$root.adminId+'/feedback/'+feedbackId+"/status/"+$baseConfig.feedbackStatus.processed).then(function(data){
                if(data.success){
                    $scope.feedbackArray[i].status = $baseConfig.feedbackStatus.processed;
                    SuccessBox('处理反馈信息成功');
                }else{
                    WarningBox('更新反馈信息错误')
                }
            }).catch(function(error){
                ErrorBox('服务器内部错误');
            })
        }
        $scope.getFeedback();
    }])