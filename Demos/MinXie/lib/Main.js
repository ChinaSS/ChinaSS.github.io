require.config({
    baseUrl:"lib",
    paths:{
        "Bootstrap":"modules/bootstrap/js/bootstrap.min",
        "jquery.validate":"modules/jquery/plugins/jquery.validate.min",
        "ace-extra":"modules/ace/js/ace-extra.min",
        "ace":"modules/ace/js/ace",
        "angular":"modules/angular/angular.min",
        "angular-route":"modules/angular/angular-route.min",
        "ztree":"modules/zTree/js/jquery.ztree.all-3.5.min",
        "WebUploader":"modules/webuploader/webuploader.nolog.min",
        "date":"modules/bootstrap/plugins/datetimepicker/js/datetimepicker.min",
        "dateCN":"modules/bootstrap/plugins/datetimepicker/js/datetimepicker.cn",
        "util":"util/Util",
        "baseDialog":"util/dialog/BaseDialog",
        "viewFrame":"core/viewFrame/ViewFrame",
        "app":"App",
        "artistInfoCtrl":"app/dataCollection/dataEntry/artistInfo/ArtistInfoCtrl"
    },
    shim:{
        "Bootstrap":["jquery"],
        "ace-extra":{},
        "angular":{"exports":"angular"},
        "angular-route":['angular'],
        "ztree":["jquery"]
    },
    map:{
        '*':{
            'css': 'modules/requirejs/plugin/css.min',
            'text':'modules/requirejs/plugin/text'
        }
    }

});

 require(["ace","app","Bootstrap"],function(ace){
     angular.element(document).ready(function () {
         angular.bootstrap(document, ['HomeApp']);
         //angular.bootstrap(sub, ['SubApp']);
         ace.init();
     });
     //未登录或session过期时ajax处理
     $(document)
     .ajaxSuccess(function(event,request,settings){
         if(request.getResponseHeader('LOGIN-AUTH') === 'login'){
             require(["util"],function(util){
                 //util.progress.stop();
                 util.confirm("您没有登录或会话已过期请重新登录，是否立即跳转到登录页？",function(){
                     window.location = util.getServerPath();
                 })
             });
         }
     })
     .ajaxSend(function(){
         require(["util"],function(util){
             //util.progress.start();
         });
     })
     .ajaxError(function (event, jqxhr, settings, thrownError) {
         require(["util"],function(util){
             //util.progress.stop();
         });
     })
 });