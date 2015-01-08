define(["jquery","UtilDir/util","CommonDir/dict","CommonDir/dictTree","UtilDir/grid","ArtistInfoDir/artistInfoSupport","ArtistInfoDir/artistPositionSupport","ArtistInfoDir/artistWlPositionSupport","ArtistInfoDir/artistXhPositionSupport","ArtistInfoDir/artistJsPositionSupport","ArtistInfoDir/artistShPositionSupport","ArtistInfoDir/artistWorkSupport","ArtistInfoDir/artistEducationSupport","ArtistInfoDir/opusArtistRelSupport","ArtistInfoDir/activityArtistRelSupport","ArtistInfoDir/researchArtistRelSupport","ArtistInfoDir/awardInfoSupport","ArtistInfoDir/newsArtistRelSupport","ArtistInfoDir/teacherStudentSupport",'CommonDir/utils'],
		function($,util,dict,dictTree,grid,support,positionSupport,WlPositionSupport,XhPositionSupport,JsPositionSupport,ShPositionSupport,WorkSupport,EducationSupport,OpusArtistRelSupport,ActivityArtistRelSupport,ResearchArtistRelSupport,AwardSupport,NewsArtistRelSupport,TeacherStudentSupport,AppUtils){
	//define中的是support文件ArtistInfo为appPath.js中指定的路径名称,
	return function($compile,$scope){
        $scope.$apply(function () {
        	$scope.handleDate = function(year,month,day){
        		return AppUtils.handleDate(year,month,day);
        	}
            $scope.artistInfo = {//定义artistInfo艺术家基本信息的行为与属性    getStaticPath()请求静态资源    getServer()  ajax请求用这个
                    "template":{
                        "editArtistInfo": getStaticPath() + "app/caiji/artistInfo/views/artistInfoEdit.html"
                    },
                    "artistInfoAll":{//艺术家信息大对象          里面有艺术家基本信息  职务信息等于后台艺术家大类对应
                         "artistInfo":{},//基本信息
                         "positions":[],//职位
                         "delPositions":[]//存放要删除的职务数据
                         //"editPositions":[]//存放新增或者修改了的职位
                         ,"works":[] //工作经历
                         ,"delWorks":[]//存放要删除的工作数据
                         ,"educations":[] //教育经历
                         ,"delEducations":[]//存放要删除的教育信息数据
                         //,"masters":[] //师承
                         ,"opusArtistRels":[] //艺术家作品关联关系
                         ,"delOpusArtistRels":[] //要删除的艺术家作品关联关系
                         ,"activityArtistRels":[] //艺术家活动关联关系
                         ,"delActivityArtistRels":[] //要删除的艺术家活动关联关系
                         ,"researchArtistRels":[] //艺术家研究评论关联关系
                         ,"delResearchArtistRels":[] //要删除的艺术家研究评论关联关系
                         ,"awards":[] //艺术家获奖信息
                         ,"delAwards":[] //要删除的艺术家获奖信息
                         ,"newsArtistRels":[] //艺术家新闻
                         ,"delNewsArtistRels":[] //要删除的艺术家新闻
                         ,"teacherStudents":[] //艺术家师承关系
                         ,"delTeacherStudents":[] //要删除的艺术家师承关系
                         
                         
                    },
                    "entity":{},//艺术家基本信息
                    
                    "opusArtistRels":[],//作品艺术家关联信息
                    "activityArtistRels":[],//活动艺术家关联信息
                    "researchArtistRels":[],//研究评论艺术家关联信息
                    "awards":[],//获奖艺术家关联信息
                    "newsArtistRels":[],//新闻艺术家关联信息
                    "teacherStudents":[],//艺术家师承
                    
                    //临时变量
                    "tempPosition":{},//保存职位新增页面的数据,用于传递给职位数组
                    "tempWork":{},//保存工作新增页面的数据,用于传递给工作数组
                    "tempEducation":{},//保存教育新增页面的数据,用于传递给教育数组
                    "tempOpusArtistRel":{},//保存新增艺术家作品关联关系
                    "tempActivityArtistRel":{},//保存新增艺术家活动关联关系
                    "tempResearchArtistRel":{},//保存新增艺术家研究评论关联关系
                    "tempAward":{},//保存新增艺术家获奖关联关系
                    "tempNewsArtistRel":{},//保存新增艺术家新闻
                    "tempTeacherStudent":{},//艺术家师承临时
            
                    //艺术家师承
                    "addTeacherStudent":function(){
	        	    	this.tempTeacherStudent = {};
	        	    	TeacherStudentSupport.addTeacherStudent($compile,$scope);
                    },
                    "editTeacherStudent":function(oldTeacherStudentObj){//修改艺术家奖项
	        	    	 this.tempTeacherStudent = oldTeacherStudentObj;//点击修改按钮后,将要修改的数据传送过去
	        	    	 TeacherStudentSupport.editTeacherStudent($compile,$scope,oldTeacherStudentObj);
                   },
                    "delTeacherStudent":function(index,oldTeacherStudentObj){
                    	this.teacherStudents.splice(index,1);
                    	if(oldTeacherStudentObj.tchStuId!=null){//主键不为空即入库的数据才加入到删除列表
                        	this.artistInfoAll.delTeacherStudents.push(oldTeacherStudentObj);
                    	}
                    },
                    //艺术家获奖信息
                    "addAward":function(){
	        	    	this.tempAward = {};
	        	    	AwardSupport.addAward($compile,$scope);
                    },
                    "editAward":function(oldAwardObj){//修改艺术家奖项
	        	    	 this.tempAward = oldAwardObj;//点击修改按钮后,将要修改的数据传送过去
	        	    	 AwardSupport.editAward($compile,$scope,oldAwardObj);
                    },
                    "delAward":function(index,oldAwardObj){
                    	this.awards.splice(index,1);
                    	if(oldAwardObj.awardId!=null){//主键不为空即入库的数据才加入到删除列表
                        	this.artistInfoAll.delAwards.push(oldAwardObj);
                    	}
                    },
                    //艺术家新闻信息
                    "addNewsArtistRel":function(){
	        	    	this.tempNewsArtistRel = {};
	        	    	NewsArtistRelSupport.addNewsArtistRel($compile,$scope);
                    },
                    "editNewsArtistRel":function(oldNewsArtistRelObj){//修改艺术家奖项
	        	    	 this.tempNewsArtistRel = oldNewsArtistRelObj;//点击修改按钮后,将要修改的数据传送过去
	        	    	 NewsArtistRelSupport.editNewsArtistRel($compile,$scope,oldNewsArtistRelObj);
                    },
                    "delNewsArtistRel":function(index,oldNewsArtistRelObj){
                    	this.newsArtistRels.splice(index,1);
                    	if(oldNewsArtistRelObj.id.artistId!=null){//主键不为空即入库的数据才加入到删除列表
                        	this.artistInfoAll.delNewsArtistRels.push(oldNewsArtistRelObj);
                    	}
                    },
                    
                    //研究评论艺术家关联信息
                    "addResearchArtistRel":function(){
	        	    	this.tempResearchArtistRel = {};
	        	    	ResearchArtistRelSupport.addResearchArtistRel($compile,$scope);
                    },
                    "editResearchArtistRel":function(oldResearchArtistRelObj){//修改艺术家研究评论
	        	    	 this.tempResearchArtistRel = oldResearchArtistRelObj;//点击修改按钮后,将要修改的数据传送过去
	        	    	 ResearchArtistRelSupport.editResearchArtistRel($compile,$scope,oldResearchArtistRelObj);
                   },
                    "delResearchArtistRel":function(index,oldResearchArtistRelObj){
                    	this.researchArtistRels.splice(index,1);
                    	if(oldResearchArtistRelObj.id.artistId!=null){//主键不为空即入库的数据才加入到删除列表
                        	this.artistInfoAll.delResearchArtistRels.push(oldResearchArtistRelObj);
                    	}
                    },
                    //活动艺术家关联信息
                    "addActivityArtistRel":function(){
	        	    	this.tempActivityArtistRel = {};
	        	    	ActivityArtistRelSupport.addActivityArtistRel($compile,$scope);
                    },
                    "editActivityArtistRel":function(oldActivityArtistRelObj){//修改艺术家参与作品
	        	    	 this.tempActivityArtistRel = oldActivityArtistRelObj;//点击修改按钮后,将要修改的数据传送过去
	        	    	 ActivityArtistRelSupport.editActivityArtistRel($compile,$scope,oldActivityArtistRelObj);
                    },
                    "delActivityArtistRel":function(index,oldActivityArtistRelObj){
                    	this.activityArtistRels.splice(index,1);
                     	if(oldActivityArtistRelObj.id.artistId!=null){
                        	this.artistInfoAll.delActivityArtistRels.push(oldActivityArtistRelObj);
                    	}
                    },
                    //作品艺术家关联信息
                    "addOpusArtistRel":function(){
	        	    	this.tempOpusArtistRel = {};
	        	    	OpusArtistRelSupport.addOpusArtistRel($compile,$scope);
                    },
                    "editOpusArtistRel":function(oldOpusArtistRelObj){//修改职务
	        	    	 this.tempOpusArtistRel = oldOpusArtistRelObj;//点击修改按钮后,将要修改的数据传送过去
	        	    	 OpusArtistRelSupport.editOpusArtistRel($compile,$scope,oldOpusArtistRelObj);
                   },
                    "delOpusArtistRel":function(index,oldOpusArtistRelObj){
                    	this.opusArtistRels.splice(index,1);
                    	if(oldOpusArtistRelObj.id.artistId!=null){//主键不为空即入库的数据才加入到删除列表
                        	this.artistInfoAll.delOpusArtistRels.push(oldOpusArtistRelObj);
                    	}
                    },
                       //弹出作品列表供选择 dialog
                    "openOpusList":function(){
                    	OpusArtistRelSupport.openOpusList($compile,$scope);
                    },
                    
                    
                    //教育经历
                    "addEducation":function(){
	        	    	this.tempEducation = {};
                    	EducationSupport.addEducation($compile,$scope);
                    },
                    "editEducation":function(oldEducationObj){//修改职务
	        	    	 this.tempEducation = oldEducationObj;//点击修改按钮后,将要修改的数据传送过去
	        	    	 EducationSupport.editEducation($compile,$scope,oldEducationObj);
                    },
                    "delEducation":function(index,oldEducationObj){
                    	this.educations.splice(index,1);
                    	if(oldEducationObj.educationId!=null){
                        	this.artistInfoAll.delEducations.push(oldEducationObj);
                    	}
                    },
                    //工作经历
                    "addWork":function(){
	        	    	this.tempWork = {};
	        	    	WorkSupport.addWork($compile,$scope);
                    },
                    "editWork":function(oldWorkObj){//修改职务
	        	    	 this.tempWork = oldWorkObj;//点击修改按钮后,将要修改的数据传送过去
	        	    	 WorkSupport.editWork($compile,$scope,oldWorkObj);
                   },
                    "delWork":function(index,oldWorkObj){
                    	this.works.splice(index,1);
                    	if(oldWorkObj.workId!=null){
                        	this.artistInfoAll.delWorks.push(oldWorkObj);
                    	}
                    },
                   
                    
                    
                    //行政职务
                    "addPosition":function(){//弹出新增职务dialog
	        	    	this.tempPosition = {};//点击新增按钮后,清空页面上绑定的数据
                    	positionSupport.addPosition($compile,$scope);
                    },
                    "editPosition":function(oldPositionObj){//修改职务
	        	    	 this.tempPosition = oldPositionObj;//点击修改按钮后,将要修改的数据传送过去
                    	 positionSupport.editPosition($compile,$scope,oldPositionObj);
                    },
                    "delPosition":function(oldPositionObj){//根据参数删除职务(要删除的数据的序号,要删除的数据的职务类型)
                    	var index = this.positions.indexOf(oldPositionObj);
                    	this.positions.splice(index,1);//删除数据模型中的该职位
                    	if(oldPositionObj.positionId!=null){//如果是数据库中已有的职位,则将要删除的职位放到待删除职务列表
                        	this.artistInfoAll.delPositions.push(oldPositionObj);
                    	}
                    },
                    //文联职务
                    "addWlPosition":function(){//弹出新增职务dialog
	        	    	this.tempPosition = {};//点击新增按钮后,清空页面上绑定的数据
	        	    	WlPositionSupport.addPosition($compile,$scope);
                    },
                    "editWlPosition":function(oldPositionObj){//修改职务
	        	    	 this.tempPosition = oldPositionObj;//点击修改按钮后,将要修改的数据传送过去
	        	    	 WlPositionSupport.editPosition($compile,$scope,oldPositionObj);
                    },
                    "delWlPosition":function(oldPositionObj){//根据参数删除职务(要删除的数据的序号,要删除的数据的职务类型)
                    	var index = this.positions.indexOf(oldPositionObj);
                    	this.positions.splice(index,1);//删除数据模型中的该职位
                    	if(oldPositionObj.positionId!=null){//如果是数据库中已有的职位,则将要删除的职位放到待删除职务列表
                        	this.artistInfoAll.delPositions.push(oldPositionObj);
                    	}
                    },
                   
                    //协会职务
                    "addXhPosition":function(){//弹出新增职务dialog
	        	    	this.tempPosition = {};//点击新增按钮后,清空页面上绑定的数据
	        	    	XhPositionSupport.addPosition($compile,$scope);
                    },
                    "editXhPosition":function(oldPositionObj){//修改职务
	        	    	 this.tempPosition = oldPositionObj;//点击修改按钮后,将要修改的数据传送过去
	        	    	 XhPositionSupport.editPosition($compile,$scope,oldPositionObj);
                    },
                    "delXhPosition":function(oldPositionObj){//根据参数删除职务(要删除的数据的序号,要删除的数据的职务类型)
                    	var index = this.positions.indexOf(oldPositionObj);
                    	this.positions.splice(index,1);//删除数据模型中的该职位
                    	if(oldPositionObj.positionId!=null){//如果是数据库中已有的职位,则将要删除的职位放到待删除职务列表
                        	this.artistInfoAll.delPositions.push(oldPositionObj);
                    	}
                    },
                   
                    //技术职务
                    "addJsPosition":function(){//弹出新增职务dialog
	        	    	this.tempPosition = {};//点击新增按钮后,清空页面上绑定的数据
	        	    	JsPositionSupport.addPosition($compile,$scope);
                    },
                    "editJsPosition":function(oldPositionObj){//修改职务
	        	    	 this.tempPosition = oldPositionObj;//点击修改按钮后,将要修改的数据传送过去
	        	    	 JsPositionSupport.editPosition($compile,$scope,oldPositionObj);
                    },
                    "delJsPosition":function(oldPositionObj){//根据参数删除职务(要删除的数据的序号,要删除的数据的职务类型)
                    	var index = this.positions.indexOf(oldPositionObj);
                    	this.positions.splice(index,1);//删除数据模型中的该职位
                    	if(oldPositionObj.positionId!=null){//如果是数据库中已有的职位,则将要删除的职位放到待删除职务列表
                        	this.artistInfoAll.delPositions.push(oldPositionObj);
                    	}
                    },
                   
                    //社会职务
                    "addShPosition":function(){//弹出新增职务dialog
	        	    	this.tempPosition = {};//点击新增按钮后,清空页面上绑定的数据
	        	    	ShPositionSupport.addPosition($compile,$scope);
                    },
                    "editShPosition":function(oldPositionObj){//修改职务
	        	    	 this.tempPosition = oldPositionObj;//点击修改按钮后,将要修改的数据传送过去
	        	    	 ShPositionSupport.editPosition($compile,$scope,oldPositionObj);
                    },
                    "delShPosition":function(oldPositionObj){//根据参数删除职务(要删除的数据的序号,要删除的数据的职务类型)
                    	var index = this.positions.indexOf(oldPositionObj);
                    	this.positions.splice(index,1);//删除数据模型中的该职位
                    	if(oldPositionObj.positionId!=null){//如果是数据库中已有的职位,则将要删除的职位放到待删除职务列表
                        	this.artistInfoAll.delPositions.push(oldPositionObj);
                    	}
                    },
                    //end 职务
                    
                    "saveEntity":function(){//定义保存艺术家基本信息数据处理方法  此处只调用,具体操作在support.js中写   保存按钮在编辑页页面中
                    	support.saveEntity($scope);
                     },
                    "delEntity":function(){//
                    }
                     //职位职务信息
                     
                };
//艺术家基本信息中使用组件的
            //籍贯,出生地,现居住地 (这三个使用相同的码表)
            var regionCodes=dictTree.regionCodes();//籍贯值
            //console.log(regionCodes);
            $scope.typeaheadDictHometown = {
                    //value : [],
                    initConfig : {
                        key : {
                        	id:"dictCode",
                            data:"dictName"
                        },
                        data :regionCodes//getStaticPath()+"app/system/zidian/data/typeahead.json", //dict.nationalityCodes(),
//                        callback : function(data){//要其他操作时,才需要callback函数
//                            console.log(data);
//                        }
                    }

           };
           //国籍
            var nationalityCodes= dict.nationalityCodes();//国籍代码表
            $scope.inputNationalityCodes = {
                    initConfig : {
                        key : {
                        	id:"dictCode",
                            name:"dictName"
                            //,data:""//树形使用该属性
                        },
                        type : "select",//值域为 select 和checkbox
                        searchAble: true,//是否带搜索功能
                        data : nationalityCodes
                    }
                };
//职务    组件
           //行政职务
            var xzPositionCodes= dict.xzPositionCodes();//行政职务代码表列表
            $scope.inputXzPosition = {
                    initConfig : {
                        key : {
                        	id:"dictCode",
                            name:"dictName"
                            //,data:""//树形使用该属性
                        },
                        type : "select",//值域为 select 和checkbox
                        searchAble: true,//是否带搜索功能
                        data : xzPositionCodes,
                        onSelect : function(data){//选中后的事件
                        	$scope.$apply(function(){
                        		$scope.artistInfo.tempPosition.positionNameShow=data.dictName;//将选中的职务,名称传递给列表,供显示
                        	})
                        }
                    }
                };
            //文联职务
            var wlPositionCodes= dict.wlPositionCodes();
            $scope.inputWlPosition = {
                    //value : ["1","2"],
                    initConfig : {
                        key : {
                        	id:"dictCode",
                            name:"dictName"
                        },
                        type : "select",//值域为 select 和checkbox
                        searchAble: true,//是否带搜索功能
                        data : wlPositionCodes,
                        onSelect : function(data){//选中后的事件
                        	$scope.$apply(function(){
                        		$scope.artistInfo.tempPosition.positionNameShow=data.dictName;//将选中的职务,名称传递给列表,供显示
                        	})
                        }
                    }
                };
            //协会职务
            var xhPositionCodes= dict.xhPositionCodes();
            $scope.inputXhPosition = {
                    //value : ["1","2"],
                    initConfig : {
                        key : {
                        	id:"dictCode",
                            name:"dictName"
                        },
                        type : "select",
                        searchAble: true,//是否带搜索功能
                        data : xhPositionCodes,
                        onSelect : function(data){//选中后的事件
                        	$scope.$apply(function(){
                        		$scope.artistInfo.tempPosition.positionNameShow=data.dictName;//将选中的职务,名称传递给列表,供显示
                        	})
                        }
                    }
                };
            //技术职务
            var jsPositionCodes= dict.jsPositionCodes();
            $scope.inputJsPosition = {
                    //value : ["1","2"],
                    initConfig : {
                        key : {
                        	id:"dictCode",
                            name:"dictName"
                        },
                        type : "select",
                        searchAble: true,//是否带搜索功能
                        data : jsPositionCodes,
                        onSelect : function(data){//选中后的事件
                        	$scope.$apply(function(){
                        		$scope.artistInfo.tempPosition.positionNameShow=data.dictName;//将选中的职务,名称传递给列表,供显示
                        	})
                        }
                    }
                };
            //技术职务级别
            var jsPositionLevelCodes= dict.jsPositionLevelCodes();
            $scope.inputJsPositionLevel = {
                    //value : ["1","2"],
                    initConfig : {
                        key : {
                        	id:"dictCode",
                            name:"dictName"
                        },
                        type : "select",
                        searchAble: true,//是否带搜索功能
                        data : jsPositionLevelCodes,
                        onSelect : function(data){//选中后的事件
                        	console.log("onselect测试");
                        	$scope.$apply(function(){
                        		$scope.artistInfo.tempPosition.postLevelName=data.dictName;//将选中的职务,名称传递给列表,供显示
                        	})
                        }
                    }
                };
//教育经历 使用组件
            //学历
            var educationCodes= dictTree.educationCodes();
            $scope.inputEducation = {
                    initConfig : {
                        type : "select",
                        searchAble: true,//是否带搜索功能
                        data : educationCodes,
                        onSelect:function(data){//选中后的事件
                           	$scope.$apply(function(){
                        		$scope.artistInfo.tempEducation.dictEduBgName=data.name;//将选中的职务,名称传递给列表,供显示
                        	})
                        }
                    }
                };
            //学位
            var degreeCodes= dictTree.degreeCodes();
            $scope.inputDegree = {
                    initConfig : {
                        type : "select",
                        searchAble: true,//是否带搜索功能
                        data : degreeCodes,
                        onSelect:function(data){//选中后的事件
                           	$scope.$apply(function(){
                        		$scope.artistInfo.tempEducation.dictDegreeName=data.name;//将选中的职务,名称传递给列表,供显示
                        	})
                        }
                    }
                };
             //就读国家使用国籍代码表
            $scope.inputStudyCountryCodes = {
                    initConfig : {
                        key : {
                        	id:"dictCode",
                            name:"dictName"
                        },
                        type : "select",//值域为 select 和checkbox
                        searchAble: true,//是否带搜索功能
                        data : nationalityCodes//与基本信息中国籍使用相同的代码表
                    }
                };

//工作经历 使用组件
            

//艺术家作品  使用组件
            //作品职务
            var opusPositionCodes= dictTree.opusPositionCodes();
            $scope.inputOpusPosition = {
                    initConfig : {
                        type : "checkbox",
                        searchAble: true,//是否带搜索功能
                        data : opusPositionCodes,
                        callback : function(dataArr,objArr){
                        	//console.log(objArr);
                        	
                        	var tmpName="";
                        	for(var i in objArr){
                        		tmpName+=objArr[i].name+",";
                        	}
                        	if(tmpName.length!=0){
                        		tmpName=tmpName.substring(0,tmpName.length-1);
                        	}
                           	$scope.$apply(function(){
                        		$scope.artistInfo.tempOpusArtistRel.dictProfessionName=tmpName;//将选中的职务,名称传递给列表,供显示
                        	})
                        }
                    }
                };
//活动组件
            //弹出活动列表dialog
            $scope.dialogActivityList = {
                    initConfig : {
                        setting: {
                            title : "选择活动",
                            buttons:[
                                {
                                    name:'确定',
                                    callback:function(dialog){
	      			  		    		  var curGrid= grid.getGrid("activityList");//根据id获取grid实例
	    			  		    		  var selectedData=curGrid.selected;
	    			  		    		  var selectObj;//选中的数据
	    			  		    		   for(var key in selectedData){
	    			  		    			 selectObj=selectedData[key];
	    			  		    			 break;//只要第一个对象
	    			  		    		   }
	    			  		    		   //操作数据
	    		 	  		    		  $scope.$apply(function (){
					 	  		    			$scope.artistInfo.tempActivityArtistRel.id = {
					 	  		    					activityId:""
					 	  		    			};
	    				  		    		   //将新增页面接受到的值传递给作品关联数组
	    				  		    		   $scope.artistInfo.tempActivityArtistRel.id.activityId=selectObj.activityId;
	    				  		    		   $scope.artistInfo.tempActivityArtistRel.activityName=selectObj.actName;
	    				  		    		   $scope.artistInfo.tempActivityArtistRel.dictProfession=selectObj.timeNumber;
	    			  		    		  });
	    		 	  		    		  
	                                       //dialog.save();
	                                        dialog.hide();
                                    }
                                }
                            ]
                        },
                        template : "app/caiji/artistInfo/views/activityList.html",
            	        afterLoad:function(dialog){//该方法是在加载完dialog,并且dialog没显示之前执行的
                	    	 //加载作品的grid  从作品那个grid参考的
              	    	        var config = {
              	    	            id:"activityList",
              	    	            placeAt:"activityListId",            //存放Grid的容器ID
              	    	            pageSize:10,                         //一页多少条数据
              	    	            index:"radio",                   //首列为单选[radio]还是多选[checkbox],默认checkbox
              	    	            layout:[
              	    	                {name:"活动名称",field:"actName"},
              	    	                {name:"届次",field:"timeNumber"},
              	    	                {name:"活动地点",field:"actAddress"},
              	    	                {name:"活动类别",field:"dictActType"}
              	    	            ],
              	    	            data : {type : "URL",value : getServer() + "/activityInfo/pages"}//获取grid数据的url
              	    	        };
              	    	        grid.init(config);//渲染grid
              	      }//end afterload

                    }//end dialogConfig
                };
//获奖信息
            //奖项
            var awardsCodes= dictTree.awardsCodes();
            $scope.inputAwards = {
                    initConfig : {
                        type : "select",
                        searchAble: true,//是否带搜索功能
                        data : awardsCodes,
                        onSelect:function(data){//选中后的事件
                           	$scope.$apply(function(){
                        		$scope.artistInfo.tempAward.awardName=data.name;//将选中的职务,名称传递给列表,供显示
                        	})
                        }
                    }
                };
//新闻相关
            //弹出新闻grid dialog  
            $scope.dialogNewsList = {
                    initConfig : {
            	    	setting :{
            		        id : "newsListDialog" ,//id属性用于区分不同的dialog,dialog中id有默认值,如果不给重新命名id,则使用缓存中的属性
        			  		title: "选择艺术家相关新闻",
        			  		buttons:[
        			  		       {
        			  		    	   name:'确定',
        			  		    	   callback:function(dialog){
	        			  		    		  var curGrid= grid.getGrid("newsList");//根据id获取grid实例
	        			  		    		  var selectedData=curGrid.selected;
	        			  		    		  var selectObj;//选中的数据
	        			  		    		   for(var key in selectedData){
	        			  		    			 selectObj=selectedData[key];
	        			  		    			 break;//只要第一个对象
	        			  		    		   }
	        			  		    		   //操作数据
	        		 	  		    		  $scope.$apply(function (){
	        			 	  		    			$scope.artistInfo.tempNewsArtistRel.id = {
	        			 	  		    					newsId:""
	        			 	  		    			};
	        				  		    		   //将新增页面接受到的值传递给作品关联数组
	        				  		    		   $scope.artistInfo.tempNewsArtistRel.id.newsId=selectObj.newsId;
	        				  		    		   $scope.artistInfo.tempNewsArtistRel.newsTitle=selectObj.newsTitle;
	        				  		    		   //新闻类别代码及名称
	        				  		    		   $scope.artistInfo.tempNewsArtistRel.newsTypeName=selectObj.newsTypeName;
	        				  		    		   $scope.artistInfo.tempNewsArtistRel.dictNewsType=selectObj.dictNewsType;
	        				  		    		   //来源
	        				  		    		   $scope.artistInfo.tempNewsArtistRel.source=selectObj.source;
	        				  		    		   //摘要
	        				  		    		   $scope.artistInfo.tempNewsArtistRel.summary=selectObj.summary;
	        				  		    		   
	        				  		    		   
	        			  		    		  });
	        		 	  		    		  
	        		 	  		    		  //执行完业务操作后编程关闭dialog
	        		 	  		    		  dialog.hide();
        			  		    	   }
        			   		       }
        			  		 ]
        	       },
        	  	  template: "app/caiji/artistInfo/views/newsList.html",
        	      afterLoad:function(dialog){//该方法是在加载完dialog,并且dialog没显示之前执行的
          	    	 //加载作品的grid  从作品那个grid参考的
        	    	        var config = {
        	    	            id:"newsList",
        	    	            placeAt:"newsListId",            //存放Grid的容器ID
        	    	            pageSize:10,                         //一页多少条数据
        	    	            index:"radio",                   //首列为单选[radio]还是多选[checkbox],默认checkbox
        	    	            layout:[
        	    	                    {name:"新闻标题",field:"newsTitle"},
        	    	                    {name:"艺术类别",field:"artTypeName"},
        	    	                    {name:"新闻类别",field:"newsSortName"},
        	    	                    {name:"新闻类型",field:"newsTypeName"}
        	    	            ],
        	    	            data : {type : "URL",value : getServer()+"/news/page"}//获取grid数据的url
        	    	        };
        	    	        grid.init(config);//渲染grid
        	      }//end afterload
                	
        	  }//end dialogConfig
            };
            
//研究评论相关
            //弹出作品grid dialog  作品中艺术家参与类型为研究评论的
            $scope.dialogResearchList = {
                    initConfig : {
            	    	setting :{
            		        id : "researchListDialog" ,//id属性用于区分不同的dialog,dialog中id有默认值,如果不给重新命名id,则使用缓存中的属性
        			  		title: "选择艺术家相关研究评论",
        			  		buttons:[
        			  		       {
        			  		    	   name:'确定',
        			  		    	   callback:function(dialog){
	        			  		    		  var curGrid= grid.getGrid("researchList");//根据id获取grid实例
	        			  		    		  var selectedData=curGrid.selected;
	        			  		    		  var selectObj;//选中的数据
	        			  		    		   for(var key in selectedData){
	        			  		    			 selectObj=selectedData[key];
	        			  		    			 break;//只要第一个对象
	        			  		    		   }
	        			  		    		   //操作数据
	        		 	  		    		  $scope.$apply(function (){
	        			 	  		    			$scope.artistInfo.tempResearchArtistRel.id = {
	        			 	  		    					opusId:""
	        			 	  		    			};
	        				  		    		   //将新增页面接受到的值传递给作品关联数组
	        				  		    		   $scope.artistInfo.tempResearchArtistRel.id.opusId=selectObj.opusId;
	        				  		    		   $scope.artistInfo.tempResearchArtistRel.opusName=selectObj.opusName;
	        				  		    		   //创作时间
	        				  		    		   $scope.artistInfo.tempResearchArtistRel.creationYear=selectObj.creationYear;
	        				  		    		   $scope.artistInfo.tempResearchArtistRel.creationMonth=selectObj.creationMonth;
	        				  		    		   $scope.artistInfo.tempResearchArtistRel.creationDay=selectObj.creationDay;
	        				  		    		   //发表时间
	        				  		    		   $scope.artistInfo.tempResearchArtistRel.issuanceYear=selectObj.issuanceYear;
	        				  		    		   $scope.artistInfo.tempResearchArtistRel.issuanceMonth=selectObj.issuanceMonth;
	        				  		    		   $scope.artistInfo.tempResearchArtistRel.issuanceDay=selectObj.issuanceDay;
	        				  		    		   //简介
	        				  		    		   $scope.artistInfo.tempResearchArtistRel.opusIntroduction=selectObj.opusIntroduction;
	        				  		    		   
	        				  		    		   
	        			  		    		  });
	        		 	  		    		  
	        		 	  		    		  //执行完业务操作后编程关闭dialog
	        		 	  		    		  dialog.hide();
        			  		    	   }
        			   		       }
        			  		 ]
        	       },
        	  	  template: "app/caiji/artistInfo/views/researchList.html",
        	      afterLoad:function(dialog){//该方法是在加载完dialog,并且dialog没显示之前执行的
          	    	 //加载作品的grid  从作品那个grid参考的
        	    	        var config = {
        	    	            id:"researchList",
        	    	            placeAt:"researchListId",            //存放Grid的容器ID
        	    	            pageSize:10,                         //一页多少条数据
        	    	            index:"radio",                   //首列为单选[radio]还是多选[checkbox],默认checkbox
        	    	            layout:[
        	    	                {name:"作品名称",field:"opusName"},
        	    	                {name:"主题",field:"topic"},
        	    	                {name:"出处",field:"masterParticipants"},
        	    	                {name:"创作时间",format:function(data){
        	    	                	return data.row.creationYear + "-" + data.row.creationMonth + "-" + data.row.creationDay;
        	    	                }},
        	    	                {name:"发表时间",format:function(data){
        	    	                	return data.row.issuanceYear + "-" + data.row.issuanceMonth + "-" + data.row.issuanceDay;
        	    	                }}
        	    	            ],
        	    	            data : {type : "URL",value : getServer() + "/caiji/opus/page"}//获取grid数据的url
        	    	        };
        	    	        grid.init(config);//渲染grid
        	    	  
        	      }//end afterload
                	
        	  }//end dialogConfig
            };
//师承
            //师承(艺术类别代码表)
            var artTypeCodes= dictTree.artTypeCodes();
            $scope.inputArtType = {
                    initConfig : {
                        type : "checkbox",
                        searchAble: true,//是否带搜索功能
                        data : artTypeCodes,
			            callback : function(dataArr,objArr){
			            	//console.log(objArr);
			            	var tmpName="";
			            	for(var i in objArr){
			            		tmpName+=objArr[i].name+",";
			            	}
			            	if(tmpName.length!=0){
			            		tmpName=tmpName.substring(0,tmpName.length-1);
			            	}
			               	$scope.$apply(function(){
			            		$scope.artistInfo.tempTeacherStudent.artTypeNames=tmpName;//将选中的职务,名称传递给列表,供显示
			            	})
			            }

                    }
                };
            //老师(或学生)艺术家列表(艺术类别代码表)  内容为grid的lialog
            $scope.dialogArtistList = {
                    //点击添加老师或添加学生触发的动作
                   "addTeacherOrStudent":function(flag){
                	   if("addTeacher"==flag){//添加老师
                		   $scope.artistInfo.tempTeacherStudent.addTeacherOrStudentflag="addTeacher";
                		   //学生信息置为当前艺术家
                		   $scope.artistInfo.tempTeacherStudent.studentId=$scope.artistInfo.entity.artistId;
                		   $scope.artistInfo.tempTeacherStudent.studentName=$scope.artistInfo.entity.artistName;
                		   //清空老师信息
                   		   $scope.artistInfo.tempTeacherStudent.teacherId="";
                		   $scope.artistInfo.tempTeacherStudent.teacherName="";
                		   //readonly  disabled
                		   $("#studentName").attr("disabled","disabled");
                		   $("#teacherName").removeAttr("disabled");
                	   }else if("addStudent"==flag){//添加学生
                		   $scope.artistInfo.tempTeacherStudent.addTeacherOrStudentflag="addStudent";
                		   //老师信息置为当前艺术家
                		   $scope.artistInfo.tempTeacherStudent.teacherId=$scope.artistInfo.entity.artistId;
                		   $scope.artistInfo.tempTeacherStudent.teacherName=$scope.artistInfo.entity.artistName;
                		   //清空学生信息
                		   $scope.artistInfo.tempTeacherStudent.studentId="";
                		   $scope.artistInfo.tempTeacherStudent.studentName="";
                		   $("#teacherName").attr("disabled","disabled");
                		   $("#studentName").removeAttr("disabled");
                	   }
                	   
                	   
                   },
                   //艺术家grid配置信息
                   
                   //dialog配置信息
                   initConfig : {
            	    	setting :{
            		        id : "artistListDialog" ,//id属性用于区分不同的dialog,dialog中id有默认值,如果不给重新命名id,则使用缓存中的属性
        			  		title: "选择艺术家",
        			  		buttons:[
        			  		       {
        			  		    	   name:'确定',
        			  		    	   callback:function(dialog){
	        			  		    		  var curGrid= grid.getGrid("artistList");//根据id获取grid实例
	        			  		    		  var selectedData=curGrid.selected;
	        			  		    		  var selectObj;//选中的数据
	        			  		    		   for(var key in selectedData){
	        			  		    			 selectObj=selectedData[key];
	        			  		    			 break;//只要第一个对象
	        			  		    		   }
	        			  		    		  //操作数据 根据添加老师还是学生将选中的艺术家数据回显到编辑页面
	        			  		    		   if("addTeacher"==$scope.artistInfo.tempTeacherStudent.addTeacherOrStudentflag){
	 	        		 	  		    		  $scope.$apply(function (){//dialog接收的值给老师
		        			 	  		    			$scope.artistInfo.tempTeacherStudent.teacherId=selectObj.artistId;
		        			 	  		    			$scope.artistInfo.tempTeacherStudent.teacherName=selectObj.artistName;
		        			  		    		  });
	        			  		    		   }else if("addStudent"==$scope.artistInfo.tempTeacherStudent.addTeacherOrStudentflag){
	 	        		 	  		    		  $scope.$apply(function (){//dialog接收的值给学生
		        			 	  		    			$scope.artistInfo.tempTeacherStudent.studentId=selectObj.artistId;
		        			 	  		    			$scope.artistInfo.tempTeacherStudent.studentName=selectObj.artistName;
		        			  		    		  });
	        			  		    		   }
	        		 	  		    		  //执行完业务操作后编程关闭dialog
	        		 	  		    		  dialog.hide();
        			  		    	   }
        			   		       }
        			  		 ]
        	       },
        	  	  template: "app/caiji/artistInfo/views/artistList.html",
        	      afterLoad:function(dialog){//该方法是在加载完dialog,并且dialog没显示之前执行的
          	    	       //加载艺术家的grid  
        	    	        var config = {
        	    	                id:"artistList",//grid的id吧?待确认
        	    	                placeAt:"artistListId",            //存放Grid的div容器ID   
        	    	                pageSize:10,                         //一页多少条数据
        	    	                index:"radio",                   //首列为单选[radio]还是多选[checkbox],默认checkbox
        	    	                layout:[                           //列表各标题
        	    	                    {name:"姓名",field:"artistName"},
        	    	                    {name:"年龄",field:"birthdayYear",format:function(obj){//处理显示值  obj作用待定
        	    	                    	//此处待优化
        	    	                    	var curDate = new Date();
        	    	                    	var curYear = curDate.getFullYear();
        	    	                    	var year=obj.row.birthdayYear;
        	    	                    	var age=curYear-year+1;
        	    	                    	var result = year==null?"":age
        	    	                    	return result;
        	    	                    }},
        	    	                    {name:"性别",field:"sexName"},
        	    	                    {name:"所在地",field:"birthPlaceName"},
        	    	                    {name:"艺术类别",field:"",format:function(obj){//处理显示值  obj作用待定
        	    	                    	return "待完成";
        	    	                    }},
        	    	                ],//end layout
        	    	                data:{type:"URL",value:getServer()+"/artistInfo/page"} //指定获取列表数据的url
        	    	            };
        	    	        grid.init(config);//渲染grid
        	      }//end afterload
        	  }//end dialogConfig
            };
           
            
//艺术信息
            
        });//end apply
        //调用艺术家support中艺术家列表页面初始化操作
        support.artistListInit("root",$scope);//root代表最顶层id  这个调用初始化 artistInfo.html页面的grid
    };
});