app.directive('header', function() {
    return {
        templateUrl: '/admin/view/header.html',
        replace: true,
        transclude: false,
        restrict: 'E',
        controller: function($scope, $element,$mpAjax,$rootScope){

            $scope.logOut = function(){
                $mpAjax.removeCookie($mpAjax.ADMIN_ID);
                $mpAjax.removeCookie($mpAjax.ADMIN_AUTH_NAME);
                window.location.href='admin_login.html';
            }
            var adminId = $mpAjax.getCookie($mpAjax.ADMIN_ID);
            var adminToken = $mpAjax.getCookie($mpAjax.ADMIN_AUTH_NAME);
            if(adminId && adminToken){
                $rootScope.adminId = adminId;
                $rootScope.adminToken = adminToken;
                $mpAjax.setHeader($mpAjax.ADMIN_AUTH_NAME,adminToken);
            }
            //App.init();
        },
    };
});
app.directive('mpDateFormat', ['$filter',function($filter) {
    var dateFilter = $filter('date');
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {

            function formatter(value) {
                return dateFilter(value, 'yyyy-MM-dd HH:mm:ss'); //format
            }

            function parser() {
                return ctrl.$modelValue;
            }

            ctrl.$formatters.push(formatter);
            ctrl.$parsers.unshift(parser);

        }
    };
}]);