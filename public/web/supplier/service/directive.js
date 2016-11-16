/**
 * Created by lingxue on 2016/11/16.
 */
app.directive('header', function() {
    return {
        templateUrl: '/supplier/view/header.html',
        replace: true,
        transclude: false,
        restrict: 'E',
        controller: function($scope, $element,$mpAjax,$rootScope){

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
            }
        }
    };
});