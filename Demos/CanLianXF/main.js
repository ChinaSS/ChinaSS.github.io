require.config({
    //baseUrl:"lib",
    paths:{
        "Bootstrap":"modules/bootstrap/js/bootstrap.min",
        "Angular":"modules/angular/angular.min",
        "Angular-route":"modules/angular/angular-route.min",
        "JQuery.validate":"modules/jquery/plugins/jquery.validate.min",
        "Dialog":"modules/util/dialog",
        "Util":"modules/util/util",
        "HomeApp":"homeApp",
        /*应用相关配置-start*/
        "RegisterCtrl":"app/register/registerCtrl"
        /*应用相关配置-end*/
    },
    shim:{
        "Bootstrap":["jquery"],
        "Angular":{"exports":"angular"},
        "Angular-route":['Angular']
    },
    map:{
        '*':{
            'css': 'modules/requirejs/plugin/css.min',
            'text':'modules/requirejs/plugin/text'
        }
    }

});

require(["Bootstrap","HomeApp","JQuery.validate"],function(){
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['HomeApp']);
    });

    /**
     * 表单验证公共设置
     */
    $.validator.setDefaults({
        errorElement : 'span',
        errorClass : 'help-block',
        highlight : function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        success : function(label) {
            label.closest('.form-group').removeClass('has-error');
            label.remove();
        }
    });
});


/**
 * 登录
 */
function login(){
    require(["Util","Dialog"],function(util,Dialog){
        //为弹出框增加操作按钮
        var buttons = [];
        buttons.push(
            {name:"确定",callback:function(){
                dialog.hide();
            }}
        );
        buttons.push(
            {name:"取消",callback:function(){
                dialog.hide();
            }}
        );
        var dialog = Dialog({
            id:"LoginDialog",
            cache:false,                 //是否缓存，默认为true
            title:"登录",
            width:"400px",
            height:"100px",
            dialogSize:"",               //modal-lg或modal-sm
            buttons:[]
        });
        //可以通过返回的dialog对象调用相关方法
        dialog.setBody(util.template("T_Login",{}));
        dialog.setFoot(buttons,false);
        dialog.$dialog.css({"margin-top":"13%"});
        dialog.show();
    })
}