define(["jquery","UtilDir/grid","app/baseSupport","UtilDir/inputSelect","UtilDir/util","CommonDir/dict"],function($,grid,baseSupport,inputSelect,util,dict){
    
	var result = {};//定义一个对象,其他js调用该js文件时,要求返回的东西都放到这个对象里
	
	//弹出作品列表对话框
	result.openOpusList=function($compile,$scope){
        baseSupport.contentDialog($compile,$scope,{
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
			  		    		   //操作数据
		 	  		    		  $scope.$apply(function (){
			 	  		    			$scope.artistInfo.tempOpusArtistRel.id = {
			 	  		    					opusId:""
			 	  		    			};
				  		    		   //将新增页面接受到的值传递给作品关联数组
				  		    		   $scope.artistInfo.tempOpusArtistRel.id.opusId=selectObj.opusId;
				  		    		   $scope.artistInfo.tempOpusArtistRel.opusName=selectObj.opusName;
			  		    		  });
		 	  		    		  
		 	  		    		  //执行完业务操作后编程关闭dialog
		 	  		    		  dialog.hide();
			  		    	   }
			   		       }
			  		 ]
	       },
	  	  template: "app/caiji/artistInfo/views/opusList.html",
	      afterLoad:function(dialog){//该方法是在加载完dialog,并且dialog没显示之前执行的
//	    	  alert("ceshi");
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
//	    	            toolbar:[
//	    	                {name:"添加",class:"fa fa-plus-circle",callback:function(event){addOpus($scope);}},
//	    	                {name:"删除",class:"fa fa-trash-o",callback:delOpus}
//	    	            ],
	    	            data : {type : "URL",value : getServer() + "/caiji/opus/page"},//获取grid数据的url
//	    	            formData:{//给url传递的参数
//	    	            	opusName : $scope.opus.queryEntity.opusName
//	    	            }
	    	        };
	    	        grid.init(config);//渲染grid

	    	  
	      }//end afterload
        	
	  });//end dialog
	}
	
	
	//跳转到新增作品艺术家关联信息页面
	result.addOpusArtistRel=function($compile,$scope){
        baseSupport.contentDialog($compile,$scope,{
	    	setting :{
    		        id : "opusArtistRelAddDialog" ,//id属性用于区分不同的dialog,dialog中id有默认值,如果不给重新命名id,则使用缓存中的属性
			  		title: "新增作品艺术家关联",
			  		buttons:[
			  		       {
			  		    	   name:'保存',
			 		    	   //close :true,//写上该属性,执行完回调函数后,自动关闭对话框
			  		    	   callback:function(dialog){
			  		    		   if($("#opusArtistRelFormId").valid()){//如果表单验证通过
					  		    		 $scope.$apply(function (){
						  		    		   //将新增页面接受到的值传递给作品关联数组
						  		    		   $scope.artistInfo.opusArtistRels.push($scope.artistInfo.tempOpusArtistRel);
					  		    		 });
				 	  		    		  //执行完业务操作后编程关闭dialog
				 	  		    		  dialog.hide();
			  		    		   }
			  		    	   }
			   		       }
			  		 ]
	       },
	  	  template: "app/caiji/artistInfo/views/addOpusArtistRel.html",
	      afterLoad:function(dialog){//该方法是在加载完dialog,并且dialog没显示之前执行的
  	    	 validate();//调用校验
	      }//end afterload
        });//end content dialog
	}//end addOpuArtistRel
	
	//跳转到编辑作品页面
	result.editOpusArtistRel=function($compile,$scope,oldOpusArtistRelObj){
		//弹出新增职位dialog   该弹出窗口中可以使用作用域的值 实现双向数据绑定
        baseSupport.contentDialog($compile,$scope,{
	    	setting :{
	    		    id : "opusArtistRelEditDialog" ,
			  		title: "编辑艺术家作品信息",
			  		buttons:[
			  		       {
			  		    	   name:'保存',
			 		    	   close :true,//写上该属性,执行完回调函数后,自动关闭对话框
			  		    	   callback:function(dialog){
			  		    		   if($("#opusArtistRelFormId").valid()){//如果表单验证通过
				  		    		   var newObj = $scope.artistInfo.tempOpusArtistRel ;
				  		    		   //查找对象在职位数组中的索引
				  		    		   var index=$scope.artistInfo.opusArtistRels.indexOf(oldOpusArtistRelObj);
					  		    	   $scope.$apply(function (){
						  		    		//将修改的值重新放回数组中
					  		    			$scope.artistInfo.opusArtistRels.splice(index,1,newObj);
					  		    	   });
						  		       dialog.hide();//关闭对话框
			  		    		   }
			  		    	   }
			   		       }
			  		 ]
	       },
	  	  template: "app/caiji/artistInfo/views/addOpusArtistRel.html",
	      afterLoad:function(dialog){
	    	  validate();//调用校验
	      }
        });
	}
	
	//作品艺术家家关联信息列表数据ng-repeat使用
	result.getOpusArtistRelDataByArtist = function(artistId,$scope){//根据艺术家查询工作经历信息
		//发送ajax请求,获取行政职务数据
        $.ajax({
            "url":getServer()+"/artistInfo/queryOpusArtistRelListByArtist?artistId="+artistId,
            "type":"POST",
            async:false,
            dataType:"json",
            "success":function(d){//操作成功后操作 d是后台返回的封装了一定内容的数据
                //给作用域赋值
                $scope.$apply(function () {//这是调整数据模型的入口吧
                    $scope.artistInfo.opusArtistRels=d.curPageData;
                });
            }
        });
	}
	
    var validate = function(){
        $("#opusArtistRelFormId").validate({//行政职位职务输入数据验证   绑定验证
            rules:{//要校验的字段及校验规则
            	opusId : {//作品名称
            		required:true,
            		chineseLength:32
                },
                joinDate:{//参与时间
                	required:true
                },
                //年月日校验
                dictProfession : {//职务
                	chineseLength:32
                },
                remark : {//备注
                	chineseLength:255
                }
            },
            messages: {//校验提示信息   如果使用封装好的校验,提示信息不用写有默认值,会自动出现在输入框下面,自己写的校验规则才写提示信息
          	  
            }
        });

    }//end validate
	
     return result ;//return作用是什么?待补充 ctrl中调用service.js时,要返回结果
});
