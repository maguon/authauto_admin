
app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/admin/view/index.html',
        controller:'indexController'
    }).when('/brand', {
            templateUrl: '/admin/view/brand.html',
            controller:'brandController'
        })
        .when('/brand/:brandId', {
            templateUrl: '/admin/view/brand_detail.html',
            controller:'brandDetailController'
        })
        .when('/auto', {
            templateUrl: '/admin/view/auto.html',
            controller:'autoController'
        })
        .when('/auto/:autoId', {
            templateUrl: '/admin/view/auto_detail.html',
            controller:'autoDetailController'
        })
        .when('/supplier', {
            templateUrl: '/admin/view/supplier.html',
            controller:'supplierController'
        })
        .when('/supplier/:supplierId', {
            templateUrl: '/admin/view/supplier_detail.html',
            controller:'supplierDetailController'
        })
        .when('/procure', {
            templateUrl: '/admin/view/procure.html',
            controller:'procureController'
        })
        .when('/procureHistory', {
            templateUrl: '/admin/view/procure_history.html',
            controller:'procureHistoryController'
        })
        .when('/procure/:procureId', {
            templateUrl: '/admin/view/procure_detail.html',
            controller:'procureDetailController'
        })
        .when('/feedback', {
            templateUrl: '/admin/view/feedback.html',
            controller:'feedbackController'
        })
        .when('/password', {
            templateUrl: '/admin/view/password.html',
            controller:'passwordController'
        })
        .when('/system', {
            templateUrl: '/admin/view/system.html',
            controller:'systemController'
        })
        .when('/user', {
            templateUrl: '/admin/view/user.html',
            controller:'userController'
        })
        .otherwise({
            templateUrl: '/admin/view/index.html',
            controller:'indexController'
        });
}]);
