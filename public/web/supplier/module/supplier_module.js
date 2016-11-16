/**
 * Created by ling xue on 14-6-13.
 */


var app = angular.module("supplier", ['ngRoute']);

app.config(['$httpProvider',function($httpProvider) {
    $httpProvider.defaults.headers.common["auth-token"] = $.cookie("user-token");
}]);