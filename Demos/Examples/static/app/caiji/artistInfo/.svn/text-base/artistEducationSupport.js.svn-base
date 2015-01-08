define(["jquery","app/baseSupport","UtilDir/inputSelect","UtilDir/util","CommonDir/dict"],function($,baseSupport,inputSelect,util,dict){
    
	var result = {};//定义一个对象,其他js调用该js文件时,要求返回的东西都放到这个对象里
	//新增教育信息页面
	result.addEducation=function($compile,$scope){
        baseSupport.contentDialog($compile,$scope,{
	    	setting :{
    		        id : "educationAddDialog" ,//id属性用于区分不同的dialog,dialog中id有默认值,如果不给重新命名id,则使用缓存中的属性
			  		title: "新增教育信息",
			  		buttons:[
			  		       {
			  		    	   name:'保存',
			 		    	   //close :true,//写上该属性,执行完回调函数后,自动关闭对话框
			  		    	   callback:function(dialog){
			  		    		   if($("#educationFormId").valid()){//如果表单验证通过
					  		    		 $scope.$apply(function (){
						  		    		   //将新增页面接受到的值传递给共走经历数组
						  		    		   $scope.artistInfo.educations.push($scope.artistInfo.tempEducation);
					  		    		 });
					  		    		dialog.hide();
			  		    		   }
			  		    		   
			  		    	   }
			   		       }
			  		 ]
	       },
	  	  template: "app/caiji/artistInfo/views/addEducation.html",
	      afterLoad:function(dialog){//该方法是在加载完dialog,并且dialog没显示之前执行的
  	    	 validate();//调用校验
	      }//end afterload
        });//end content dialog
	}//end addWork
	//跳转到编辑行政职务页面
	result.editEducation=function($compile,$scope,oldEducationObj){
		//弹出新增职位dialog   该弹出窗口中可以使用作用域的值 实现双向数据绑定
        baseSupport.contentDialog($compile,$scope,{
	    	setting :{
	    		    id : "educationEditDialog" ,
			  		title: "编辑教育信息",
			  		buttons:[
			  		       {
			  		    	   name:'保存',
			 		    	   close :true,//写上该属性,执行完回调函数后,自动关闭对话框
			  		    	   callback:function(dialog){
			  		    		   if($("#educationFormId").valid()){//如果表单验证通过
				  		    		   var newObj = $scope.artistInfo.tempEducation ;
				  		    		   //查找对象在职位数组中的索引
				  		    		   var index=$scope.artistInfo.educations.indexOf(oldEducationObj);
					  		    	   $scope.$apply(function (){
						  		    		//将修改的值重新放回数组中
					  		    			$scope.artistInfo.educations.splice(index,1,newObj);
					  		    	   });
						  		       dialog.hide();//关闭对话框
			  		    		   }
			  		    	   }
			   		       }
			  		 ]
	       },
	  	  template: "app/caiji/artistInfo/views/addEducation.html",
	      afterLoad:function(dialog){
	    	  validate();//调用校验
	      }
        });
	}

	
	//教育信息列表数据ng-repeat使用
	result.getEducationDataByArtist = function(artistId,$scope){//根据艺术家查询工作经历信息
		//发送ajax请求,获取行政职务数据
        $.ajax({
            "url":getServer()+"/artistInfo/queryEducationListByArtist?artistId="+artistId,
            "type":"POST",
            async:false,
            dataType:"json",
            "success":function(d){//操作成功后操作 d是后台返回的封装了一定内容的数据
                //给作用域赋值
                $scope.$apply(function () {//这是调整数据模型的入口吧
                    $scope.artistInfo.educations=d.curPageData;
                });
            }
        });
	}
	
    var validate = function(){
        $("#educationFormId").validate({//行政职位职务输入数据验证   绑定验证
            rules:{//要校验的字段及校验规则
            	dictStudyCountry : {//就读国家
            		chineseLength:32
                },
                college : {//就读学校
                	chineseLength:100
                },
                //年月日校验
                dictDiscipline : {//学习专业
                	chineseLength:100
                },
                dictEduEg : {//学历
                	chineseLength:32
                },
                dictDegree : {//获得学位
                	chineseLength:32
                },
            	
            },
            messages: {//校验提示信息   如果使用封装好的校验,提示信息不用写有默认值,会自动出现在输入框下面,自己写的校验规则才写提示信息
          	  
            }
        });
        
    }//end validate
	
     return result ;//return作用是什么?待补充 ctrl中调用service.js时,要返回结果
});
