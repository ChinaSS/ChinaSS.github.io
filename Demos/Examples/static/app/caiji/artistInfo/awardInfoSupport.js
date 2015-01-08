define(["jquery","app/baseSupport","UtilDir/inputSelect","UtilDir/util","CommonDir/dict"],function($,baseSupport,inputSelect,util,dict){
    
	var result = {};//定义一个对象,其他js调用该js文件时,要求返回的东西都放到这个对象里
	
	//跳转到新增活动艺术家关联信息页面
	result.addAward=function($compile,$scope){
        baseSupport.contentDialog($compile,$scope,{
	    	setting :{
    		        id : "awardAddDialog" ,//id属性用于区分不同的dialog,dialog中id有默认值,如果不给重新命名id,则使用缓存中的属性
			  		title: "新增艺术家获奖信息",
			  		buttons:[
			  		       {
			  		    	   name:'保存',
			  		    	   callback:function(dialog){
			  		    		   if($("#awardInfoFormId").valid()){//如果表单验证通过
					  		    		 $scope.$apply(function (){
						  		    		   //将新增页面接受到的值传递给奖项关联数组
						  		    		   $scope.artistInfo.awards.push($scope.artistInfo.tempAward);
					  		    		 });
			  		    		   }
			  		    		   dialog.hide();//关闭dialog
			  		    	   }
			   		       }
			  		 ]
	       },
	  	  template: "app/caiji/artistInfo/views/addAwardInfo.html",
	      afterLoad:function(dialog){//该方法是在加载完dialog,并且dialog没显示之前执行的
  	    	 validate();//调用校验
	      }//end afterload
        });//end content dialog
	}//end addOpuArtistRel
	
	//跳转到编辑获奖页面
	result.editAward=function($compile,$scope,oldAwardObj){
		//弹出新增职位dialog   该弹出窗口中可以使用作用域的值 实现双向数据绑定
        baseSupport.contentDialog($compile,$scope,{
	    	setting :{
	    		    id : "awardEditDialog" ,
			  		title: "编辑艺术家获奖信息",
			  		buttons:[
			  		       {
			  		    	   name:'保存',
			 		    	   close :true,//写上该属性,执行完回调函数后,自动关闭对话框
			  		    	   callback:function(dialog){
			  		    		   if($("#awardInfoFormId").valid()){//如果表单验证通过
				  		    		   var newObj = $scope.artistInfo.tempAward ;
				  		    		   //查找对象在职位数组中的索引
				  		    		   var index=$scope.artistInfo.awards.indexOf(oldAwardObj);
					  		    	   $scope.$apply(function (){
						  		    		//将修改的值重新放回数组中
					  		    			$scope.artistInfo.awards.splice(index,1,newObj);
					  		    	   });
						  		       dialog.hide();//关闭对话框
			  		    		   }
			  		    	   }
			   		       }
			  		 ]
	       },
	  	  template: "app/caiji/artistInfo/views/addAwardInfo.html",
	      afterLoad:function(dialog){
	    	  validate();//调用校验
	      }
        });
	}
	
	
	//活动艺术家家关联信息列表数据ng-repeat使用
	result.getAwardDataByArtist = function(artistId,$scope){//根据艺术家查询活动经历信息
		//发送ajax请求,获取艺术家获奖数据
        $.ajax({
            "url":getServer()+"/artistInfo/queryAwardListByArtist?artistId="+artistId,
            "type":"POST",
            async:false,
            dataType:"json",
            "success":function(d){//操作成功后操作 d是后台返回的封装了一定内容的数据
                //给作用域赋值
                $scope.$apply(function () {//这是调整数据模型的入口吧
                    $scope.artistInfo.awards=d.curPageData;
                });
            }
        });
	}
	
    var validate = function(){
        $("#awardInfoFormId").validate({//行政职位职务输入数据验证   绑定验证
            rules:{//要校验的字段及校验规则
           	 dictAwardCode:{//奖项id 名称
          		required:true ,
          		chineseLength:32 
          	}
              ,honoraryTitl : {//奖项/称号
              	chineseLength : 200 
              }
              //下面两项后台自动给值
//              ,typeId:{//艺术家姓名
//               	 required:true ,
//               	chineseLength : 32 
//              }
//              ,dictAwardType : {//奖项类型
//               	 required:true ,
//               	chineseLength : 32 
//              }
              ,awardYear : {//获奖年度//四位数字年份校验 待补充
             	 digits:true
              }
              ,timeNumber : {//届次 //数字  
             	 digits:true
              }
              ,sponsor : {//主办单位
              	chineseLength : 255
              }
              ,awardAddress : {//地点
             	 chineseLength : 255
              }
              ,remark : {//备注
             	 chineseLength : 255
              }         
            },
            messages: {//校验提示信息   如果使用封装好的校验,提示信息不用写有默认值,会自动出现在输入框下面,自己写的校验规则才写提示信息
          	  
            }
        });

    }//end validate
	
     return result ;//return作用是什么?待补充 ctrl中调用service.js时,要返回结果
});
