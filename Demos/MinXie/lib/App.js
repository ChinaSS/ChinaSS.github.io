define(["angular","angular-route"],function(angular){

    var HomeApp = angular.module('HomeApp', ["ngRoute"]);
    //路由配置
    HomeApp.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/artistInfo', {
                    templateUrl: 'lib/app/dataCollection/dataEntry/artistInfo/views/ArtistInfo.html',
                    controller: 'ArtistInfoCtrl'
                })
        }
    ]);

    /*  --------------控制器--------------  */
    HomeApp.controller('BodyCtrl', ["$http",'$scope', function($http,$scope){

    }]);

    //左侧菜单控制
    HomeApp.controller('sidebarCtrl', ["$http","$scope",function ($http,$scope) {
        $http.get('lib/menu/data/Menu.json').success(function(data) {
            $scope.hover ="";
            $scope.sidebars = data;
        });
    }]);
    /***************************中间内容部分****************************/
    //艺术家信息
    HomeApp.controller('ArtistInfoCtrl', ["$http",'$scope','$compile', function($http,$scope,$compile){
        require(["artistInfoCtrl"],function(ArtistInfoCtrl){
            ArtistInfoCtrl($http,$scope);
        })
    }]);



    /*  -------------- 自定义指令 --------------  */
    /*//组织树
    HomeApp.directive('deptTree', ["$http","$compile",function ($http,$compile) {
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function ($scope, element, attrs, ngModel) {
                require(["orgDirective"],function(OrgDirective){
                    OrgDirective.orgTree($scope, element, attrs, ngModel);
                })
            }
        };
    }]);
    //角色树
    HomeApp.directive('roleTree', ["$http",function ($http) {
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function ($scope, element, attrs, ngModel) {
                require(["orgDirective"],function(OrgDirective){
                    OrgDirective.roleTree($scope, element, attrs, ngModel);
                })
            }
        };
    }]);
    //高级功能树
    HomeApp.directive('configTree', ["$http",function($http){
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function ($scope, element, attrs, ngModel) {
                require(["orgDirective"],function(OrgDirective){
                    OrgDirective.configTree($scope, element, attrs, ngModel);
                })
            }
        }
    }]);

*/

});
