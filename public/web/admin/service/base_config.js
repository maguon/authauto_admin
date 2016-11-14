app.factory('$baseConfig',['$http','$location','$q',function($http,$location,$q){
    var _this = {};
    _this.autoTypeArray = [{id:'1',name:'自动'},{id:'2',name:'手动'}];
    return _this;
}]);
