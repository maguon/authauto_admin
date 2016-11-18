/**
 * Created by lingxue on 2016/11/16.
 */

app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/supplier/view/index.html',
        controller:'indexController'
    }).when('/register', {
        templateUrl: '/supplier/view/register.html',
        controller:'registerController'
    }).when('/login', {
        templateUrl: '/supplier/view/login.html',
        controller:'loginController'
    }).otherwise({
        templateUrl: '/supplier/view/index.html',
        controller:'indexController'
    });
}]);
