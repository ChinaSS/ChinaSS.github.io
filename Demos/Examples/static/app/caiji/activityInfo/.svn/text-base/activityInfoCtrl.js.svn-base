
define(["jquery","UtilDir/util","UtilDir/grid","ActivityInfoDir/activityInfoService","ActivityInfoDir/activityArtistRelSupport","ActivityInfoDir/activityOpusRelSupport","CommonDir/uploader","CommonDir/dict","CommonDir/dictTree"],function($,util,grid,service,actArtistRel,activityOpusRel,uploader,dict,dictTree){
	//define中的是service文件ActivityInfo为appPath.js中指定的路径名称,

    return function($http,$scope){

        $scope.$apply(function () {
            $scope.activityInfo = {// getStaticPath()请求静态资源    getServer()  ajax请求用这个
                    "template":{
                        "editActivityInfo": getStaticPath() + "app/caiji/activityInfo/views/activityInfoEdit.html",
                        "relArtist" : getStaticPath() + "app/caiji/activityInfo/views/relArtist.html",
                        "relOpus" : getStaticPath() + "app/caiji/activityInfo/views/relOpus.html"
                    },
                    //活动信息
                    "entity":{},
                    "csInputConfig":{
                    	type : "checkbox",
                    	searchAble : true,
                    	data : dictTree.regionTree(),
                    	callback : function(data){
                    		$scope.activityInfo.entity.actAddress = data;
                    	}
                    },//树形下拉列表，供选择活动地址（多选）
                    "artTypeList":[],//用来显示已选择艺术类别
                    "actArtistList":[],//用来显示关联艺术家
                    "actOpusList":[],//用来显示关联作品
                    "dictActTypeCodes":[],//活动类别代码表
                    "artTypeCodes":[],//艺术类别代码表
                    "saveEntity":function(){
                    	service.saveEntity($scope);
                     },
                    "delArtist":function(index){
                    	service.delArtist($scope,index);
                    },
                    "addArtist":function(){
                    	service.addArtist($scope);
                    },
                    "closeArtistHtml" : function(){
                    	$('#relArtist').slideToggle("slow");
                    },
                    "delOpus" : function(index){
                    	activityOpusRel.delOpus($scope,index);
                    },
                    "addOpus" : function(){
                    	activityOpusRel.addOpus($scope);
                    },
                    "closeOpusHtml" : function(){
                    	$('#relOpus').slideToggle("slow");
                    }
                };
            $scope.upload = {
            	    bizType:dict.bizType.activity,
                	data:[],
                	isUpload:true,
                	init: function(){
                    	if(this.isUpload){
                    		uploader.uploaderInit(this.bizType,$scope);
                    		this.isUpload = false;
                    	}
                	},
                	del : function(index) {
						var del = this.data[index];
						if(del.id){
							uploader.removeFile(del.id);
						}
						this.data.splice(index, 1);
					},
                	download:function(fileId){
                		window.location = getServer() + '/file/download?fileId=' + fileId + '&bizType=' + this.bizType
                	},
                	reset : function(){
                		uploader.resetQueue();
                	}
            };
        });
        //调用艺术家service中艺术家列表页面初始化操作
        service.activityListInit($scope);//这个调用初始化 activityInfo.html页面的grid
    };
});