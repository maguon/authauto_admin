/**
 * Created by lingxue on 2016/11/16.
 */
app.directive('header', function() {
    return {
        templateUrl: '/supplier/view/header.html',
        replace: true,
        transclude: false,
        restrict: 'E',
        controller: function($scope, $element,$mpAjax,$rootScope,$baseFunction,$baseConfig){
            $scope.showInfo = function(){
                //alert('sss');
            };
            $rootScope.procureCount = $baseFunction.getCookieCart().length;
            $rootScope.notifyCount = 0;
            $scope.loginFlag = false;
            $scope.toNotify = function(){
                window.location.href='#/notify';
            }
            $scope.toUser = function(){
                window.location.href='#/user';
            }
            $scope.toCheckout = function(){
                window.location.href='#/checkout';
            }
            $scope.logOut = function(){
                $mpAjax.removeCookie($mpAjax.USER_ID);
                $mpAjax.removeCookie($mpAjax.USER_AUTH_NAME);
                $mpAjax.removeCookie($mpAjax.USER_TYPE);
                $mpAjax.removeCookie($mpAjax.SUPPLIER_ID);
                $scope.loginFlag=false;
                window.location.href='#/login';
            }
            $scope.getUserSupplier = function(){
                $mpAjax.get('/user/'+$rootScope.userId+"/supplier").then(function(data){
                    if(data.success && data.result.length>0){
                        $rootScope.supplierId = data.result[0].id;
                        $mpAjax.setCookie($mpAjax.SUPPLIER_ID ,data.result[0].id);
                        $mpAjax.setCookie($mpAjax.ZIPCODE ,data.result[0].zipcode);
                    }else{
                        //WarningBox('Query offer info error .')
                    }
                }).catch(function(error){
                    ErrorBox('Service internal error .');
                })
            }
            var userId = $mpAjax.getCookie($mpAjax.USER_ID);
            var userToken = $mpAjax.getCookie($mpAjax.USER_AUTH_NAME);
            var userType = $mpAjax.getCookie($mpAjax.USER_TYPE);

            if(userId && userToken){
                $rootScope.userId = userId;
                $rootScope.userToken = userToken;
                $mpAjax.setHeader($mpAjax.USER_AUTH_NAME,userToken);
                $scope.loginFlag = true;
            }
            if(userType ==$baseConfig.userType.supplier){
                var supplierId = $mpAjax.getCookie($mpAjax.SUPPLIER_ID);
                if(supplierId==null){
                    $scope.getUserSupplier();
                }else{
                    $rootScope.supplierId = supplierId;
                }
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