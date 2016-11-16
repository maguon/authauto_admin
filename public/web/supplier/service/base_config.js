app.factory('$baseConfig',['$http','$location','$q',function($http,$location,$q){
    var _this = {};
    _this.autoTypeArray = [{id:'1',name:'Automatic'},{id:'2',name:'Manual '}];
    _this.defaultUploadImage = '/admin/assets/images/upload-icon.png';
    _this.imageType={brandImage:1,autoImage:2}
    return _this;
}]);
