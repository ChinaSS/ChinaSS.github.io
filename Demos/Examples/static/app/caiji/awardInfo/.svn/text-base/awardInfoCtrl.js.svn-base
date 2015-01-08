define(["jquery","UtilDir/util","CommonDir/dictTree","UtilDir/grid","AwardInfoDir/awardInfoSupport"],
		function($,util,dictTree,grid,support){
	//define中的是support文件AwardInfo为appPath.js中指定的路径名称,
	return function($compile,$scope){
        $scope.$apply(function () {
            $scope.awardInfo = {//定义awardInfo艺术家基本信息的行为与属性    getStaticPath()请求静态资源    getServer()  ajax请求用这个
                    "template":{
                        "editAwardInfo": getStaticPath() + "app/caiji/awardInfo/views/awardInfoEdit.html"
                    },
                    "entity":{},//艺术家基本信息
                     
                     "saveEntity":function(){//定义保存艺术家基本信息数据处理方法  此处只调用,具体操作在support.js中写   保存按钮在编辑页页面中
                    	support.saveEntity($scope);
                     },
                     "delEntity":function(){//
                     }
                      //职位职务信息
                };
        //奖项 代码
        var awardsCodes= dictTree.awardsCodes();
        $scope.inputAwards = {
                initConfig : {
                    type : "select",
                    searchAble: true,//是否带搜索功能
                    data : awardsCodes,
                    onSelect:function(data){//选中后的事件
                       	$scope.$apply(function(){
                    		$scope.awardInfo.entity.awardName=data.name;//将选中的职务,名称传递给列表,供显示
                    	})
                    }
                }
            };
        	
        //艺术家列表
        //老师(或学生)艺术家列表(艺术类别代码表)  内容为grid的lialog  获奖类型处理事件
        $scope.dialogListSet = {
                //点击radio触发的动作  选择艺术家获奖或活动获奖,或艺术类别
               "changeAwardType":function(dictAwardType){
            	   if("1"==dictAwardType){//艺术家获奖
            		   //艺术家输入框显示
            		   $("#artistDiv").css("display","visible");
            		   //作品输入框隐藏
            		   $("#opusDiv").css("display","none");
            		   //活动输入框隐藏
            		   $("#activityDiv").css("display","none");
            		   
            	   }else if("2"==dictAwardType){//作品获奖
               		   //艺术家输入框隐藏
            		   $("#artistDiv").css("display","none");
            		   //作品输入框显示
            		   $("#opusDiv").css("display","visible");
            		   //活动输入框隐藏
            		   $("#activityDiv").css("display","none");
            		   
            	   }else if("3"==dictAwardType){//活动获奖
               		   //艺术家输入框隐藏
            		   $("#artistDiv").css("display","none");
            		   //作品输入框隐藏
            		   $("#opusDiv").css("display","none");
            		   //活动输入框显示
            		   $("#activityDiv").css("display","visible");
            	   }
	            	   //改变后清空已选的值
			          $scope.awardInfo.entity.typeId="";
		  		      $scope.awardInfo.entity.typeName="";
		  		      //将获奖人员类型传给变量
		  		      $scope.awardInfo.entity.dictAwardType=dictAwardType
              },
               
               //艺术家获奖    艺术家grid dialog配置信息
               artistDialogConfig : {
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
        		 	  		    		  $scope.$apply(function (){//dialog接收的值传给奖项的对应字段
        			 	  		    			$scope.awardInfo.entity.typeId=selectObj.artistId;
        			 	  		    			$scope.awardInfo.entity.typeName=selectObj.artistName;
        			  		    		  });
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
    	    	                    	var result = year==null?"":age;
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
    	  },//end dialogConfig
          //作品列表
    	  opusDialogConfig : {
		  	    	setting :{
				        id : "opusListDialog" ,//id属性用于区分不同的dialog,dialog中id有默认值,如果不给重新命名id,则使用缓存中的属性
				  		title: "选择作品",
				  		buttons:[
				  		       {
				  		    	   name:'确定',
				  		    	   callback:function(dialog){
				  		    		  var curGrid= grid.getGrid("opusList");//根据id获取grid实例
				  		    		  var selectedData=curGrid.selected;
				  		    		  var selectObj;//选中的数据
				  		    		   for(var key in selectedData){
				  		    			 selectObj=selectedData[key];
				  		    			 break;//只要第一个对象
				  		    		   }
     		 	  		    		  $scope.$apply(function (){//dialog接收的值传给奖项的对应字段
  			 	  		    			$scope.awardInfo.entity.typeId=selectObj.opusId;
  			 	  		    			$scope.awardInfo.entity.typeName=selectObj.opusName;
  			  		    		     });
			 	  		    		  //执行完业务操作后编程关闭dialog
			 	  		    		  dialog.hide();
				  		    	   }
				   		       }
				  		 ]
		       },
		  	  template: "app/caiji/artistInfo/views/opusList.html",
		      afterLoad:function(dialog){//该方法是在加载完dialog,并且dialog没显示之前执行的
			    	 //加载作品的grid  从作品那个grid参考的
		    	        var config = {
		    	            id:"opusList",
		    	            placeAt:"opusListId",            //存放Grid的容器ID
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
		    	            data : {type : "URL",value : getServer() + "/caiji/opus/page"},//获取grid数据的url
		    	        };
		    	        grid.init(config);//渲染grid
		
		      }//end afterload
	     },//end  dialogconfig
             
              
          //活动列表
              //弹出活动列表dialog
    	  activityDialogConfig : {
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
     		 	  		    		  $scope.$apply(function (){//dialog接收的值传给奖项的对应字段
  			 	  		    			$scope.awardInfo.entity.typeId=selectObj.activityId;
  			 	  		    			$scope.awardInfo.entity.typeName=selectObj.actName;
  			  		    		      });
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
    	  }//end  dialogconfig
      
        
        }
        
       });//end applay
        
        //调用艺术家support中艺术家列表页面初始化操作
        support.awardListInit("root",$scope);//root代表最顶层id  这个调用初始化 awardInfo.html页面的grid
    };
});