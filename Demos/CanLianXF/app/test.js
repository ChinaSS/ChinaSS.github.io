/*
 HomeApp模块
 */
define(["app/directives","app/control","Angular","Angular-route"],function(directives,control,angular){
    var HomeApp = angular.module('HomeApp', ["ngRoute"]);

    /*
     * 总控制器
     * BodyCtrl
     */
    HomeApp.controller('BodyCtrl', ["$http",'$scope', function($http,$scope){

    }]);

    //扩展路由
    HomeApp.config(['$routeProvider',
        function($routeProvider) {
            attrExtend(control,$routeProvider);
        }
    ]);

    //扩展指令
    attrExtend(directives);

    /*
     * 扩展函数
     * attrExpend
     */
    function attrExtend(obj,router){
        var i = 0,length;
        if (router) {
            var config;
            for (i=0,length=obj.config.length;i<length;i++) {
                config = obj.config[i];
                (function(){
                    var path = config.controller.path,
                        name = config.controller.name;
                    HomeApp.controller(name, ['$http', '$scope', function ($http, $scope) {
                        require([path], function (ctrl) {
                            ctrl($http, $scope);
                        })
                    }]);
                })();
                router = router.when(config.router.url, config.router.setting);
            }
        } else {
            var directive;
            for (i=0,length=obj.directives.length;i<length;i++) {
                directive = obj.directives[i];
                HomeApp.directive(directive.name, directive.func);
            }
        }
    }

    return HomeApp;
});



