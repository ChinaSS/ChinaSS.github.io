/**
 * Created by YiYing on 2014/10/13.
 */

/**
 * 公共部分
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


/**
 * 具体使用API参考官方文档
 */
var vali = function(){
    $("#contentForm").validate({
        rules:{
            attistInfo6:"required",
            attistInfo88:{
                required:true,
                minlength:3
            },
            attistInfo99:"required"
        },
        messages: {
            attistInfo6: "请填写出生日期",
            attistInfo88: {
                required:"请填写身高",
                minlength:"最少3位"
            },
            attistInfo99: "请填写体重"
        }
    });
};

//submit方式使用
vali();

