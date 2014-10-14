define(["jquery","util"],function($,util){

    return function($http,$scope){
        //加载侧边弹出编辑栏的HTML
        $scope.$parent.DataCollection = {
            "template": {
                "artistInfo": "lib/app/dataCollection/dataEntry/artistInfo/views/EditOneArtistInfo.html"
            },
            "artist":{
                save:function(){
                    require(['jquery.validate'],function(){
                        /**
                         * 定制部分
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
                        vaArtist();
                    });
                }
            }
        };

        var vaArtist = function(){
            console.log(222);
            $("#ArtistInfoForm").validate({
                rules:{
                    attistInfo111:"required",
                    attistInfo2:"required",
                    attistInfo88:{
                        required:true,
                        minlength:3
                    },
                    attistInfo99:"required"
                },
                messages: {
                    attistInfo111: "请填写姓名",
                    attistInfo2:"请填写笔名/艺名",
                    attistInfo88: {
                        required:"请填写身高",
                        minlength:"最少3位"
                    },
                    attistInfo99: "请填写体重"
                }
            });
        };

        var showArtistInfoSidebar = function(){
            require(["util","date","dateCN","css!modules/bootstrap/plugins/datetimepicker/css/datetimepicker.min.css"],function(util){
                util.sidebarDetial({
                    id:"EditOneArtistInfoPanel",
                    width:"800px"
                });
                $(".form-date").datetimepicker({format: 'yyyy-mm-dd',language: 'cn',autoclose: true,minView:2});
            })
        };
        $scope.$apply(function(){
            $scope.editArtistInfo = function(){
                showArtistInfoSidebar();
            }
        });

    }
});