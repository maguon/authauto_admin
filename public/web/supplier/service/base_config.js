app.factory('$baseConfig',['$http','$location','$q',function($http,$location,$q){
    var _this = {};
    _this.autoTypeArray = [{id:'1',name:'Automatic'},{id:'2',name:'Manual '}];
    _this.defaultUploadImage = '/admin/assets/images/upload-icon.png';
    _this.imageType={brandImage:1,autoImage:2}
    _this.userType={supplier:1};
    return _this;
}]);

app.factory('$baseFunction',['$http','$location','$q','$mpAjax',function($http,$location,$q ,$mpAjax){
    var _this = {};
    _this.cart ='cart';
    _this.getCookieCart = function (){
        var cartArrayStr = $mpAjax.getCookie(_this.cart)|| '';
        var cartArray = cartArrayStr.split(',')
        return cartArray;
    };
    _this.addCookieCart = function(id){

        var cartArray = _this.getCookieCart();
        if(cartArray.indexOf(id+"")<0){
            cartArray.push(id+"");
        }
        var cartArrayStr = cartArray.join(',');
        $mpAjax.setCookie(_this.cart ,cartArrayStr);
        return cartArray.length;
    };
    _this.clearCookieCart = function(){
        $mpAjax.setCookie(_this.cart,'');
    }
    _this.removeCookieCart = function(){
        var cartArray = _this.getCookieCart();
        var i = cartArray.indexOf(id+"") ;
        if(i >= 0){
            cartArray.splice(i,1);
        }
        var cartArrayStr = cartArray.join(',');
        $mpAjax.setCookie(_this.cart ,cartArrayStr);
        return cartArray.length;
    }
    return _this;
}]);