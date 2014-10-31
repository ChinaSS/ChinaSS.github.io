define(["Angular","Angular-route"],function(angular){

    var HomeApp = angular.module('HomeApp', ["ngRoute"]);
    //路由配置
    HomeApp.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/home', {
                    templateUrl: 'app/home/views/home.html',
                    controller: 'HomeCtrl'
                })
                .when('/jianjie', {
                    templateUrl: 'app/jianjie/views/jianjie.html',
                    controller: 'JianJieCtrl'
                })
                .when('/tousu', {
                    templateUrl: 'app/tousu/views/tousu.html',
                    controller: 'TouSuCtrl'
                })
                .when('/search', {
                    templateUrl: 'app/search/views/search.html',
                    controller: 'SerarhCtrl'
                })
                .when('/register', {
                    templateUrl: 'app/register/views/register.html',
                    controller: 'RegisterCtrl'
                })
                .otherwise({
                    redirectTo : '/home'
                });
        }
    ]);

    /*  --------------控制器-------ianJie-------  */


    /***************************中间内容控制器****************************/
    //首页
    HomeApp.controller('HomeCtrl', ["$http",'$scope','$compile', function($http,$scope,$compile){
        /*require(["ArtistInfoCtrl"],function(artistInfoCtrl){
            artistInfoCtrl($http,$scope);
        })*/
    }]);
    //信访简介
    HomeApp.controller('JianJieCtrl', ["$http",'$scope','$compile', function($http,$scope,$compile){
        /*require(["ArtistInfoCtrl"],function(artistInfoCtrl){
         artistInfoCtrl($http,$scope);
         })*/
    }]);
    //网上投诉
    HomeApp.controller('TouSuCtrl', ["$http",'$scope','$compile', function($http,$scope,$compile){
        /*require(["ArtistInfoCtrl"],function(artistInfoCtrl){
         artistInfoCtrl($http,$scope);
         })*/
    }]);
    //网上查询
    HomeApp.controller('SerarhCtrl', ["$http",'$scope','$compile', function($http,$scope,$compile){
        /*require(["ArtistInfoCtrl"],function(artistInfoCtrl){
         artistInfoCtrl($http,$scope);
         })*/
    }]);
    //注册
    HomeApp.controller('RegisterCtrl', ["$http",'$scope','$compile', function($http,$scope,$compile){
        require(["RegisterCtrl"],function(RegisterCtrl){
            RegisterCtrl($http,$scope);
        })
    }]);

    return HomeApp;
});
