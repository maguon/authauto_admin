/**
 * Created by ling xue on 14-6-13.
 */


var app = angular.module("mp_admin", ['ngRoute']);

app.config(['$httpProvider',function($httpProvider) {
    $httpProvider.defaults.headers.common["auth-token"] = $.cookie("admin-token");
}]);
App.init();