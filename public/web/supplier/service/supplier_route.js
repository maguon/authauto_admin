/**
 * Created by lingxue on 2016/11/16.
 */

app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/supplier/view/index.html',
        controller:'indexController'
    }).otherwise({
        templateUrl: '/supplier/view/index.html',
        controller:'indexController'
    });
}]);
