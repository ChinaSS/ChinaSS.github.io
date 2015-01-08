define(["jquery","UtilDir/util","UtilDir/grid","NewsDir/newsSupport"],function($,util,grid,service){
	/*
	 * define的注释:待补充
	   ctrl中的内容:
	*/	
    return function($http,$scope){

        $scope.$apply(function () {
        	
            $scope.news = {//定义news的行为与属性    getStaticPath()请求静态资源    getServer()  ajax请求用这个
                    "template":{
                        "editNews": getStaticPath() + "app/news/views/newsEdit.html"
                    },
                    "entity":{},
                    
                    "saveEntity":function(){//保存数据
                    	
                        if($("#newsFormId").valid()){//先数据校验
                            $.ajax({//发送保存数据请求
                                "url":getServer()+"/news/save",
                                "type":"POST",
                                "data": $scope.news.entity,
                                "dataType":"json",
                                "success":function(data){
                                    if(data.status=="200"){
                                        //保存数据成功后刷新列表
                                        util.alert("保存成功.");
                                        service.newsListInit("root",$scope);

                                    }
                                },
                                "error":function(XMLHttpRequest, textStatus, errorThrown ){
                                    util.alert("保存失败.");
                                }
                            });//end ajax
                        }
                    },
                    
                    "delEntity":function(){

                    }
                };
            //弹出艺术家grid  dialog
            $scope.artistGridDialog={
                    //艺术家获奖    艺术家grid dialog配置信息
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
//             		 	  		    		  $scope.$apply(function (){//dialog接收的值传给奖项的对应字段
//             			 	  		    			$scope.news.entity.relArtistIds=selectObj.artistId;
//             			 	  		    			
//             			 	  		    			$scope.awardInfo.entity.typeName=selectObj.artistName;
//             			  		    		  });
//             		 	  		    		  //执行完业务操作后编程关闭dialog
             		 	  		    		  dialog.hide();
         			  		    	   }
         			   		       }
         			  		 ]
         	       },
         	  	  template: "app/news/views/artistList.html",
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
            		
            };   
            
            
        });//end apply

        //用户列表页面初始化
        service.newsListInit("root",$scope);
    };
});