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
