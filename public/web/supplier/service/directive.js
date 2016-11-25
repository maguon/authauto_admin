/**
 * Created by lingxue on 2016/11/16.
 */
app.directive('header', function() {
    return {
        templateUrl: '/supplier/view/header.html',
        replace: true,
        transclude: false,
        restrict: 'E',
        controller: function($scope, $element,$mpAjax,$rootScope,$baseFunction){
            $scope.showInfo = function(){
                alert('sss');
            };
            $rootScope.procureCount = $baseFunction.getCookieCart().length;
            $rootScope.notifyCount = 9;
            $scope.loginFlag = false;
            $scope.logOut = function(){
                $mpAjax.removeCookie($mpAjax.USER_ID);
                $mpAjax.removeCookie($mpAjax.USER_AUTH_NAME);
                window.location.href='supplier_login.html';
            }
            var userId = $mpAjax.getCookie($mpAjax.USER_ID);
            var userToken = $mpAjax.getCookie($mpAjax.USER_AUTH_NAME);
            if(userId && userToken){
                $rootScope.userId = userId;
                $rootScope.userToken = userToken;
                $mpAjax.setHeader($mpAjax.USER_AUTH_NAME,userToken);
                $scope.loginFlag = true;
            }
        }
    };
});


app.directive('footer', function() {
    return {
        templateUrl: '/supplier/view/footer.html',
        replace: true,
        transclude: false,
        restrict: 'E',
        controller: function($scope, $element,$mpAjax,$rootScope){
            $scope.createFeedback = function(){
                var params = {
                    name : $scope.name,
                    email : $scope.email,
                    content : $scope.content
                }
                $mpAjax.post('/feedback',params).then(function(data){
                    if(data.success){
                        $scope.name = "";
                        $scope.email = "";
                        $scope.content = "";
                        SuccessBox('Send feedback success');
                    }else{
                        WarningBox('Send feedback failed')
                    }
                }).catch(function(error){
                    ErrorBox('Server internal error');
                })
            }
        }
    };
});