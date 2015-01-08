define(["jquery","app/baseSupport","UtilDir/inputSelect","UtilDir/util","CommonDir/dict"],function($,baseSupport,inputSelect,util,dict){
    
	var result = {};//定义一个对象,其他js调用该js文件时,要求返回的东西都放到这个对象里
	
	//跳转到新增师承页面
	result.addTeacherStudent=function($compile,$scope){
        baseSupport.contentDialog($compile,$scope,{
	    	setting :{
    		        id : "teacherStudentAddDialog" ,//id属性用于区分不同的dialog,dialog中id有默认值,如果不给重新命名id,则使用缓存中的属性
			  		title: "新增师承关系",
			  		buttons:[
			  		       {
			  		    	   name:'保存',
			 		    	   //close :true,//写上该属性,执行完回调函数后,自动关闭对话框
			  		    	   callback:function(dialog){
			  		    		   if($("#teacherStudentFormId").valid()){//如果表单验证通过
					  		    		 $scope.$apply(function (){
						  		    		   //将新增页面接受到的值传递给共走经历数组
						  		    		   $scope.artistInfo.teacherStudents.push($scope.artistInfo.tempTeacherStudent);
					  		    		 });
			  		    		   }
			  		    		 dialog.hide();
			  		    	   }
			   		       }
			  		 ]
	       },
	  	  template: "app/caiji/artistInfo/views/addTeacherStudent.html",
	      afterLoad:function(dialog){//该方法是在加载完dialog,并且dialog没显示之前执行的
  	    	 validate();//调用校验
  	    	 
    	    //新增时   默认添加老师 //学生信息置为当前艺术家
    	    $scope.$apply(function(){
    	       $scope.artistInfo.tempTeacherStudent.addTeacherOrStudentflag="addTeacher";//默认添加艺术家
    		   $scope.artistInfo.tempTeacherStudent.studentId=$scope.artistInfo.entity.artistId;
    		   $scope.artistInfo.tempTeacherStudent.studentName=$scope.artistInfo.entity.artistName;
    	    });

	      }//end afterload
        });//end content dialog
	}//end addTeacherStudent
	
	//跳转到编辑师承页面
	result.editTeacherStudent=function($compile,$scope,oldTeacherStudentObj){
		//弹出新增职位dialog   该弹出窗口中可以使用作用域的值 实现双向数据绑定
        baseSupport.contentDialog($compile,$scope,{
	    	setting :{
	    		    id : "teacherStudentEditDialog" ,
			  		title: "编辑艺术家师承信息",
			  		buttons:[
			  		       {
			  		    	   name:'保存',
			 		    	   close :true,//写上该属性,执行完回调函数后,自动关闭对话框
			  		    	   callback:function(dialog){
			  		    		   if($("#teacherStudentFormId").valid()){//如果表单验证通过
				  		    		   var newObj = $scope.artistInfo.tempTeacherStudent ;
				  		    		   //查找对象在职位数组中的索引
				  		    		   var index=$scope.artistInfo.teacherStudents.indexOf(oldTeacherStudentObj);
					  		    	   $scope.$apply(function (){
						  		    		//将修改的值重新放回数组中
					  		    			$scope.artistInfo.teacherStudents.splice(index,1,newObj);
					  		    	   });
						  		       dialog.hide();//关闭对话框
			  		    		   }
			  		    	   }
			   		       }
			  		 ]
	       },
	  	  template: "app/caiji/artistInfo/views/addTeacherStudent.html",
	      afterLoad:function(dialog){
	    	  validate();//调用校验
	    	  //根据当前师承关系中,艺术家是老师还是学生初始化radio
	    	  if($scope.artistInfo.tempTeacherStudent.studentId==$scope.artistInfo.entity.artistId){//当前艺术家为学生
	    		  //初始化radio为添加老师
	    		  $("#teacherOrStudent_teacher").attr("checked","checked");
	    		  $("#teacherOrStudent_student").removeAttr("checked");
	    		  //学生输入框置为disable
	       		   $("#studentName").attr("disabled","disabled");
	    		   $("#teacherName").removeAttr("disabled");

	    	  }else if($scope.artistInfo.tempTeacherStudent.teacherId==$scope.artistInfo.entity.artistId){//当前艺术家为老师
	    		  //初始化radio为添加学生
	    		  $("#teacherOrStudent_student").attr("checked","checked");
	    		  $("#teacherOrStudent_teacher").removeAttr("checked");
	    		  //老师输入框置为disable
	       		   $("#teacherName").attr("disabled","disabled");
	    		   $("#studentName").removeAttr("disabled");
	    	  }
	      }
        });
	}
	
	
	//师承列表数据ng-repeat使用
	result.getTeacherStudentDataByArtist = function(artistId,$scope){//根据艺术家查询工作经历信息
		//发送ajax请求,获取行政职务数据
        $.ajax({
            "url":getServer()+"/artistInfo/queryTeacherStudentListByArtist?artistId="+artistId,
            "type":"POST",
            async:false,
            dataType:"json",
            "success":function(d){//操作成功后操作 d是后台返回的封装了一定内容的数据
                //给作用域赋值
                $scope.$apply(function () {//这是调整数据模型的入口吧
                    $scope.artistInfo.teacherStudents=d.curPageData;
                });
            }
        });
	}
	
    var validate = function(){
        $("#teacherStudentFormId").validate({//行政职位职务输入数据验证   绑定验证
            rules:{//要校验的字段及校验规则
//            	workUnits : {//工作单位
//            		chineseLength:256
//                },
//                position : {//职位
//                	chineseLength:200
//                },
//                //年月日校验
//                performance : {//工作成绩/成果/业绩
//                	chineseLength:2000
//                }
            },
            messages: {//校验提示信息   如果使用封装好的校验,提示信息不用写有默认值,会自动出现在输入框下面,自己写的校验规则才写提示信息
          	  
            }
        });

    }//end validate
	
     return result ;//return作用是什么?待补充 ctrl中调用service.js时,要返回结果
});
