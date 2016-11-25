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
                    WarningBox('��ȡ������Ϣ����')
                }
            }).catch(function(error){
                ErrorBox('�������ڲ�����');
            })
        }

        $scope.updateFeedbackStatus = function(feedbackId,i){
            //console.log(feedbackId,i);
            $mpAjax.put('/admin/'+this.$root.adminId+'/feedback/'+feedbackId+"/status/"+$baseConfig.feedbackStatus.processed).then(function(data){
                if(data.success){
                    $scope.feedbackArray[i].status = $baseConfig.feedbackStatus.processed;
                    SuccessBox('��������Ϣ�ɹ�');
                }else{
                    WarningBox('���·�����Ϣ����')
                }
            }).catch(function(error){
                ErrorBox('�������ڲ�����');
            })
        }
        $scope.getFeedback();
    }])