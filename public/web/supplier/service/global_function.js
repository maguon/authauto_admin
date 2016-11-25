function _BaseBox(boxClass,iconClass,msg,setting) {
    setting = setting || {};
    var box = $('<div class="col-xs-12" style="">');

    var content = '';
    content += '<button type="button" class="close" data-dismiss="alert"><i class="fa fa-remove fa-2x"></i></button>';
    content += '<strong style="position: absolute;margin-top: -2px;"><i class="'+iconClass+'"></i></strong>';
    content += '<span style="display:inline-block;max-width:500px;margin:0px 0px 0px 35px;font-size: 18px;">';
    content += msg;
    content += '</span>';

    box.html(content);
    $(document).find('body').append(box);

    box.addClass(boxClass);
    box.css({position:'fixed','z-index':9999,display:'none',top:'0px'});
    //var rect = GetBoxPosition(box);
    //console.log(rect);
    //box.css(rect);
    box.fadeIn(500);

    var timeout = 3000;
    if(setting.timeout)
        timeout = setting.timeout;

    box.children('.close').click(function(){
        if(this && this.parentNode) {
            box[0].outerHTML = ''
        }
    });

    if(!setting.stick) {
        if(timeout>0) {
            setTimeout(function(){
                box.fadeOut(1000,function(){
                    if(this.parentNode)
                        this.outerHTML = '';
                });
            },timeout);
        }
    }
}
function WarningBox(msg,setting) {
    var boxClass = 'alert alert-block alert-warning center';
    var iconClass = 'fa fa-warning fa-2x';
    setting = setting || {};
    if(!setting.timeout)
        setting.timeout = 10000;
    _BaseBox(boxClass,iconClass,msg,setting);
}
function ErrorBox(msg,setting) {
    var boxClass = 'alert alert-block alert-danger center';
    var iconClass = 'fa fa-frown-o fa-2x';
    setting = setting || {};
    if(!setting.timeout)
        setting.timeout = 10000;
    _BaseBox(boxClass,iconClass,msg,setting);
}
function InfoBox(msg,setting) {
    var boxClass = 'alert alert-block alert-info center';
    var iconClass = 'fa fa-bullhorn fa-2x';
    _BaseBox(boxClass,iconClass,msg,setting);
}
function SuccessBox(msg,setting) {
    var boxClass = 'alert alert-block alert-success center';
    var iconClass = 'fa fa-check fa-2x';
    setting = setting || {};
    if(!setting.timeout)
        setting.timeout = 10000;
    _BaseBox(boxClass,iconClass,msg,setting);
}


function _BaseDialog(msg,confirmCallback) {
    bootbox.dialog({
        message: msg,
        buttons: {
            "click": {
                "label": "确认",
                "className": "btn-sm btn-primary",
                "callback": confirmCallback
            },
            "button": {
                "label": "取消",
                "className": "btn-sm"
            }
        }
    });
}
