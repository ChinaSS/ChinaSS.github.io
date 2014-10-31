define(["jquery","Util"],function($,util){

    return function($http,$scope){
        $scope.register = function(){
            if($("#registerForm").valid()){

            }
        };

        //绑定表单验证
        var bindVali = function(){
            $("#registerForm").validate({
                rules:{
                    userName:"required",
                    sfzh:"required",
                    password:"required"
                },
                messages: {
                    userName: "请填姓名",
                    sfzh: "请填写身份号",
                    password:"请填写密码"
                }
            });
        };
        bindVali();
    }
});