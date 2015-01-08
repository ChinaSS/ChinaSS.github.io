define(["HomeApp","UtilDir/util","UtilDir/grid","UtilDir/treeDialog","UtilDir/typeahead","UtilDir/inputSelect","AwardInfoDir/awardInfoSupport","CommonDir/dict"],
		function(HomeApp,util,grid,treeDialog,typeahead,inputSelect,awardInfoSupport,dict){
/*
 * define的注释:待补充
   service中的内容:
*/	
	var result = {};//定义一个对象,ctrl.js调用该js文件时,要求返回的东西都放到这个对象里
	
    result.awardListInit = function(id,$scope){//奖项列表初始化
        var config = {
            id:"awardInfoList",//grid的id吧?待确认
            placeAt:"awardInfoListId",            //存放Grid的div容器ID   
            pageSize:10,                         //一页多少条数据
            index:"checkbox",                   //首列为单选[radio]还是多选[checkbox],默认checkbox
            layout:[                           //列表各标题
                {name:"奖项名称",field:"awardName",click:function(e){//点击该域时触发的click事件
                    var awardId = e.data.row.awardId;
                    $.ajax({
                        "url":getServer()+"/awardInfo/query?awardId="+awardId,
                        "type":"POST",
                        async:false,
                        dataType:"json",
                        "success":function(d){//列表点击姓名,进入详情页面,初始化需要的组件   ??数据d的内容时谁  在哪里封装的
                            //给作用域变量赋值  不赋值是没有值的   此操作要在前面,否则下面的代码无法使用作用域的值
                            $scope.$apply(function () {
                                $scope.awardInfo.entity = d.entity;//查询成功后将值赋给作用于中的对象
                            });
                           //根据获奖者类型初始化要显示的输入框(艺术家,作品,活动)
                            if($scope.awardInfo.entity.dictAwardType=="1"){//艺术家获奖
                     		   //艺术家输入框显示
                     		   $("#artistDiv").css("display","visible");
                     		   //作品输入框隐藏
                     		   $("#opusDiv").css("display","none");
                     		   //活动输入框隐藏
                     		   $("#activityDiv").css("display","none");

                            }else if($scope.awardInfo.entity.dictAwardType=="2"){//作品获奖
                       		   //艺术家输入框隐藏
                     		   $("#artistDiv").css("display","none");
                     		   //作品输入框显示
                     		   $("#opusDiv").css("display","visible");
                     		   //活动输入框隐藏
                     		   $("#activityDiv").css("display","none");
                                      	
                            }else if($scope.awardInfo.entity.dictAwardType=="3"){//活动获奖
                        		   //艺术家输入框隐藏
                     		   $("#artistDiv").css("display","none");
                     		   //作品输入框隐藏
                     		   $("#opusDiv").css("display","none");
                     		   //活动输入框显示
                     		   $("#activityDiv").css("display","visible");
                                	
                            }
                            showSlidebar($scope);//滑出右侧编辑页面
                        }
                    });
                }},
                {name:"艺术家(作品/活动)名称",field:"typeName"},
                {name:"奖项/称号",field:"honoraryTitl"},
                {name:"奖项类型",field:"businessName"},
                {name:"主办单位",field:"sponsor"},
                {name:"备注",field:"remark"}
                
            ],//end layout
            //按钮操作定义
            toolbar:[
                {name:"添加",class:"fa fa-plus-circle",callback:function(event){
                    //点击添加按钮之后,获取数据,给编辑页面使用
                    $scope.$apply(function () {//数据初始化
                        $scope.awardInfo.entity = {};//清空对象的值
                        $scope.awardInfo.entity.dictAwardType="1";//添加时默认艺术家获奖
                        //添加时默认艺术家输入框可用,作品,活动输入框隐藏,在编辑的html页面控制
                    });
                    showSlidebar($scope);//滑出右侧页面
                }},
                {name:"删除",class:"fa fa-trash-o",callback:function(event){
                    var selected = gridInstance.getSelectedRow();
                    if(selected.length){
                        var awardIds = [];
                        for(var i= 0,item;item=selected[i++];){
                        	awardIds.push(item.awardId);
                        }
                        $.ajax({
                            "url":getServer()+"/awardInfo/remove",
                            "type":"POST",
                            "data":"awardIds="+awardIds.join(","),//userIds为后台处理方法中注解定义的要接受的参数名称,名称要对应,否则接收不到请求
                            "dataType":"json",
                            "success":function(data){
                                if(data.status=="200"){
                                    //表格刷新
                                	result.awardListInit("root",$scope);//删除成功后刷新列表
                                    util.alert("删除成功.");
                                }
                            },
                            "error":function(XMLHttpRequest, textStatus, errorThrown ){
                                util.alert("删除失败.");
                            }
                        });
                    }else{
                        util.alert("请选择要删除的数据.");
                    }
                }}
            ],//end toolbar
            
            data:{type:"URL",value:getServer()+"/awardInfo/page"} //指定获取列表数据的url
        };//end config
        
        gridInstance = grid.init(config);//用config初始化grid列表
    
     };//end 用户列表初始化
     
     
     var showSlidebar = function($scope){//弹出右侧艺术家编辑页面
        //绑定日期组件到指定样式   日期组件使用示例
        require(["Date","DateCN","css!"+getStaticPath()+"modules/bootstrap/plugins/datetimepicker/css/datetimepicker.min.css"],function(){
        	$(".form-date").datetimepicker({format: 'yyyy-mm-dd',language: 'cn',autoclose: true,minView:2});
        });
       //弹出侧边栏
       util.slidebar({
           id:"awardInfoEditPanel",//右侧滑出页面的div  id 即edit.html中的最外层div  id
           width:"600px",//滑出页面的宽度
           afterLoad:function(){
             	validate();//校验  调用的是本js中的 validata方法
           }
       });                    
        
    };//end showSlidebar
    

	result.saveEntity = function($scope){//保存艺术家所有信息的处理过程  在ctrl中调用
		      if($("#awardInfoFormId").valid()){//看表单验证知否通过  valid()方法是jquery validate插件中 检查表单验证是否通过的方法  返回值类型为boolean)
		    	      //console.log($scope.awardInfo.entity);
				      $.ajax({//发送保存数据请求
					          url:getServer()+"/awardInfo/save",//保存数据调用的后台处理程序访问url
					          type:"POST",
					          data: $scope.awardInfo.entity,//将json对象转换成json字符串
					          dataType:"json",
					          //contentType: "application/json",
					          success:function(data){
					              if(data.status=="200"){
					                  //保存数据成功后刷新列表
					                  util.alert("保存成功.");
					                  result.awardListInit("root",$scope);//初始化列表
					              }
					          },
					          error:function(XMLHttpRequest, textStatus, errorThrown ){
					              util.alert("保存失败.");
					          }
			          });//end ajax
		     }
     };
     
     
     var validate = function(){//获奖基本信息校验
         $("#awardInfoFormId").validate({
             rules:{//要校验的字段及校验规则
            	 dictAwardCode:{//奖项id 名称
             		required:true ,
             		chineseLength:32 
             	}
                 ,honoraryTitl : {//奖项/称号
                 	chineseLength : 200 
                 }
                 ,typeId:{//艺术家姓名
                  	 required:true ,
                  	chineseLength : 32 
                 }
                 ,dictAwardType : {//奖项类型
                  	 required:true ,
                  	chineseLength : 32 
                 }
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
         
     };//end  validate
     
    //return中定义一个变量,并制定变量对应的函数,在ctrl中调用support中的这个变量就是调用变量对应的方法
    return result ;//return作用是什么?待补充
    	
});