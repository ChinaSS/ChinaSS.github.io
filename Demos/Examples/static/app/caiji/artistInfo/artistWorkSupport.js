define(["jquery","app/baseSupport","UtilDir/inputSelect","UtilDir/util","CommonDir/dict"],function($,baseSupport,inputSelect,util,dict){
    
	var result = {};//定义一个对象,其他js调用该js文件时,要求返回的东西都放到这个对象里
	
	//跳转到新增工作经历页面
	result.addWork=function($compile,$scope){
        baseSupport.contentDialog($compile,$scope,{
	    	setting :{
    		        id : "workAddDialog" ,//id属性用于区分不同的dialog,dialog中id有默认值,如果不给重新命名id,则使用缓存中的属性
			  		title: "新增工作经历",
			  		buttons:[
			  		       {
			  		    	   name:'保存',
			 		    	   //close :true,//写上该属性,执行完回调函数后,自动关闭对话框
			  		    	   callback:function(){
			  		    		   if($("#workFormId").valid()){//如果表单验证通过
					  		    		 $scope.$apply(function (){
						  		    		   //将新增页面接受到的值传递给共走经历数组
						  		    		   $scope.artistInfo.works.push($scope.artistInfo.tempWork);
					  		    		 });
			  		    		   }
			  		    	   }
			   		       }
			  		 ]
	       },
	  	  template: "app/caiji/artistInfo/views/addWork.html",
	      afterLoad:function(dialog){//该方法是在加载完dialog,并且dialog没显示之前执行的
  	    	 validate();//调用校验
	      }//end afterload
        });//end content dialog
	}//end addWork
	//跳转到编辑行政职务页面
	result.editWork=function($compile,$scope,oldWorkObj){
		//弹出新增职位dialog   该弹出窗口中可以使用作用域的值 实现双向数据绑定
        baseSupport.contentDialog($compile,$scope,{
	    	setting :{
	    		    id : "WorkEditDialog" ,
			  		title: "编辑工作信息",
			  		buttons:[
			  		       {
			  		    	   name:'保存',
			 		    	   close :true,//写上该属性,执行完回调函数后,自动关闭对话框
			  		    	   callback:function(dialog){
			  		    		   if($("#workFormId").valid()){//如果表单验证通过
				  		    		   var newObj = $scope.artistInfo.tempWork ;
				  		    		   //查找对象在职位数组中的索引
				  		    		   var index=$scope.artistInfo.works.indexOf(oldWorkObj);
					  		    	   $scope.$apply(function (){
						  		    		//将修改的值重新放回数组中
					  		    			$scope.artistInfo.works.splice(index,1,newObj);
					  		    	   });
						  		       dialog.hide();//关闭对话框
			  		    		   }
			  		    	   }
			   		       }
			  		 ]
	       },
	  	  template: "app/caiji/artistInfo/views/addWork.html",
	      afterLoad:function(dialog){
	    	  validate();//调用校验
	      }
        });
	}
	
	//工作信息列表数据ng-repeat使用
	result.getWorkDataByArtist = function(artistId,$scope){//根据艺术家查询工作经历信息
		//发送ajax请求,获取行政职务数据
        $.ajax({
            "url":getServer()+"/artistInfo/queryWorkListByArtist?artistId="+artistId,
            "type":"POST",
            async:false,
            dataType:"json",
            "success":function(d){//操作成功后操作 d是后台返回的封装了一定内容的数据
                //给作用域赋值
                $scope.$apply(function () {//这是调整数据模型的入口吧
                    $scope.artistInfo.works=d.curPageData;
                });
            }
        });
	}
	
    var validate = function(){
        $("#workFormId").validate({//行政职位职务输入数据验证   绑定验证
            rules:{//要校验的字段及校验规则
            	workUnits : {//工作单位
            		chineseLength:256
                },
                position : {//职位
                	chineseLength:200
                },
                //年月日校验
                performance : {//工作成绩/成果/业绩
                	chineseLength:2000
                }
            },
            messages: {//校验提示信息   如果使用封装好的校验,提示信息不用写有默认值,会自动出现在输入框下面,自己写的校验规则才写提示信息
          	  
            }
        });

    }//end validate
	
     return result ;//return作用是什么?待补充 ctrl中调用service.js时,要返回结果
});
