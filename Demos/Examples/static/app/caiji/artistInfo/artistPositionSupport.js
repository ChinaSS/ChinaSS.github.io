define(["jquery","app/baseSupport","UtilDir/util","CommonDir/dict"],function($,baseSupport,util,dict){
    
	var result = {};//定义一个对象,其他js调用该js文件时,要求返回的东西都放到这个对象里

	//跳转到新增行政职务页面
	result.addPosition=function($compile,$scope){
		//弹出新增职位dialog   该弹出窗口中可以使用作用域的值 实现双向数据绑定
        baseSupport.contentDialog($compile,$scope,{
	    	setting :{
    		        id : "XzPositionAddDialog" ,//id属性用于区分不同的dialog,dialog中id有默认值,如果不给重新命名id,则使用缓存中的属性
			  		title: "新增行政职务",
			  		buttons:[
			  		       {
			  		    	   name:'保存',
			 		    	   //close :true,//写上该属性,执行完回调函数后,自动关闭对话框
			  		    	   callback:function(dialog){
			  		    		   if($("#positionInfoFormId").valid()){//如果表单验证通过
					  		    		 $scope.$apply(function (){
						  		    		   $scope.artistInfo.tempPosition.dictPostType="1";//设置职务类型为1   行政职务
						  		    		   //将新增页面接受到的值传递给职位数组
						  		    		   $scope.artistInfo.positions.push($scope.artistInfo.tempPosition);
					  		    		 });
						  		    	 dialog.hide();//关闭对话框
			  		    		   }
			  		    	   }
			   		       }
			  		 ]
	       },
	  	  template: "app/caiji/artistInfo/views/addXzPosition.html",
	      afterLoad:function(dialog){//该方法是在加载完dialog,并且dialog没显示之前执行的
  	    	 validate();//调用校验
	    	  
	      }//end afterload
        });//end content dialog
	}
	//跳转到编辑行政职务页面
	result.editPosition=function($compile,$scope,oldPositionObj){
		//弹出新增职位dialog   该弹出窗口中可以使用作用域的值 实现双向数据绑定
        baseSupport.contentDialog($compile,$scope,{
	    	setting :{
    		        id : "XzPositionEidtDialog" ,
			  		title: "编辑行政职务",
			  		buttons:[
			  		       {
			  		    	   name:'保存',
			  		    	   callback:function(dialog){
			  		    		   if($("#positionInfoFormId").valid()){//如果表单验证通过
				  		    		   var newObj = $scope.artistInfo.tempPosition ;
				  		    		   //查找对象在职位数组中的索引
				  		    		   var index=$scope.artistInfo.positions.indexOf(oldPositionObj);
					  		    	   $scope.$apply(function (){
						  		    		//将修改的值重新放回数组中
					  		    			$scope.artistInfo.positions.splice(index,1,newObj);
					  		    	   });
					  		    	 dialog.hide();//关闭对话框
			  		    		   }
			  		    	   }
			   		       }
			  		 ]
	       },
	  	  template: "app/caiji/artistInfo/views/addXzPosition.html",
	      afterLoad:function(dialog){
	    	  
	    	  validate();//调用校验
	      }
        });
	}
	
	
	//行政职务列表数据ng-repeat使用
	result.getPositonDataByArtist = function(artistId,$scope){//根据职务类型查询职务数据
		//发送ajax请求,获取行政职务数据
        $.ajax({
            "url":getServer()+"/artistInfo/queryPositionListByArtist?artistId="+artistId,
            "type":"POST",
            async:false,
            dataType:"json",
            "success":function(d){//操作成功后操作 d是后台返回的封装了一定内容的数据
                //给作用域赋值
                $scope.$apply(function () {//这是调整数据模型的入口吧
                    //eval("$scope.artistInfo."+positionType+"= d.curPageData");//里面的语句要写分号,否则出错
                    $scope.artistInfo.positions=d.curPageData;
                });
            }
        });
	}
	
    var validate = function(){//职位职务校验规则 及提示信息定义
        $("#positionInfoFormId").validate({//行政职位职务输入数据验证   绑定验证
            rules:{//要校验的字段及校验规则
               	orgCode : {//所属机构
            		required:true ,
            		chineseLength:32
                },
                positionName : {//职务名称
                	required:true ,
                	chineseLength:100
                },
                //年月日校验
                sectorTimes : {//届次
                	digits:true,
                	maxlength:100
                },
                isPost : {//是否现任职务
                	maxlength:1
                },
                remarks : {//备注
                	chineseLength:255
                }
            	
            },
            messages: {//校验提示信息   如果使用封装好的校验,提示信息不用写有默认值,会自动出现在输入框下面,自己写的校验规则才写提示信息
          	  
            }
        });
        
    }//end validate
	
     return result ;//return作用是什么?待补充 ctrl中调用service.js时,要返回结果
});
