app.factory('$baseConfig',['$http','$location','$q',function($http,$location,$q){
    var _this = {};
    _this.autoTypeArray = [{id:'1',name:'自动'},{id:'2',name:'手动'}];
    _this.defaultUploadImage = '/admin/assets/images/upload-icon.png';
    _this.imageType={brandImage:1,autoImage:2}
    _this.feedbackStatus={unprocessed:1,processed:2}
    return _this;
}]);
