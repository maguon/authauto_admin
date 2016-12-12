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
    }).when('/checkout', {
        templateUrl: '/supplier/view/checkout.html',
        controller:'checkoutController'
    }).when('/notify', {
        templateUrl: '/supplier/view/notify.html',
        controller:'notifyController'
    }).when('/user', {
        templateUrl: '/supplier/view/user.html',
        controller:'userController'
    }).when('/offer', {
        templateUrl: '/supplier/view/offer.html',
        controller:'offerController'
    }).when('/invite/:inviteId', {
        templateUrl: '/supplier/view/invite.html',
        controller:'inviteController'
    }).otherwise({
    templateUrl: '/supplier/view/index.html',
    controller:'indexController'
    });
}]);
