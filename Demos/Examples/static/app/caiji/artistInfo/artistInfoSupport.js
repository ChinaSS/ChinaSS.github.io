define(["HomeApp","UtilDir/util","UtilDir/grid","UtilDir/treeDialog","UtilDir/inputSelect","ArtistInfoDir/artistPositionSupport","ArtistInfoDir/artistMasterSupport","ArtistInfoDir/artistWorkSupport","ArtistInfoDir/artistEducationSupport","ArtistInfoDir/opusArtistRelSupport","ArtistInfoDir/activityArtistRelSupport","ArtistInfoDir/researchArtistRelSupport","ArtistInfoDir/awardInfoSupport","ArtistInfoDir/newsArtistRelSupport","ArtistInfoDir/teacherStudentSupport","CommonDir/dict"],
		function(HomeApp,util,grid,treeDialog,inputSelect,positionSupport,masterSupport,workSupport,educationSupport,opusArtistRelSupport,activityArtistRelSupport,researchArtistRelSupport,awardSupport,newsArtistRelSupport,teacherStudentSupport,dict){
/*
 * define的注释:待补充
   service中的内容:
*/	
	var result = {};//定义一个对象,ctrl.js调用该js文件时,要求返回的东西都放到这个对象里
    var showSlidebar = function($scope){//弹出右侧艺术家编辑页面
        //绑定日期组件到指定样式   日期组件使用示例
        require(["Date","DateCN","css!"+getStaticPath()+"modules/bootstrap/plugins/datetimepicker/css/datetimepicker.min.css"],function(){
        	$(".form-date").datetimepicker({format: 'yyyy-mm-dd',language: 'cn',autoclose: true,minView:2});
        });
        
     //弹出侧边栏
       util.slidebar({
           id:"EditArtistInfoPanel",//右侧滑出页面的div  id 即edit.html中的最外层div  id
           width:"900px",//滑出页面的宽度
           afterLoad:function(){
           	validate();//校验  调用的是本js中的 validata方法
           }
       });                    
        
    };//end showSlidebar
    
	
     result.artistListInit = function(id,$scope){//艺术家列表初始化
        var config = {
            id:"artistInfoList",//grid的id吧?待确认
            placeAt:"artistInfoListId",            //存放Grid的div容器ID   
            pageSize:10,                         //一页多少条数据
            index:"checkbox",                   //首列为单选[radio]还是多选[checkbox],默认checkbox
            layout:[                           //列表各标题
                {name:"姓名",field:"artistName",click:function(e){//点击该域时触发的click事件
                    var artistId = e.data.row.artistId;
                    //console.log(e.data.row);
                    $.ajax({
                        "url":getServer()+"/artistInfo/query?artistId="+artistId,
                        "type":"POST",
                        async:false,
                        dataType:"json",
                        "success":function(d){//列表点击姓名,进入详情页面,初始化需要的组件   ??数据d的内容时谁  在哪里封装的
                            //给作用域变量赋值  不赋值是没有值的   此操作要在前面,否则下面的代码无法使用作用域的值
                            $scope.$apply(function () {
                                $scope.artistInfo.entity = d.entity;//查询成功后将值赋给作用于中的对象
                                $scope.artistInfo.sexCodes = dict.sexCodes();//性别代码表数据
                                $scope.artistInfo.nationCodes = dict.nationCodes();//民族代码表数据
                                $scope.artistInfo.politicalCodes = dict.politicalCodes();//政治面貌代码表数据
                            });
                            //获取艺术家行政职务列表数据   直接绑定行政职务变量
                            positionSupport.getPositonDataByArtist(artistId,$scope);//初始化艺术家职务数据模型
                            //获取艺术家师承列表数据 
                            //masterSupport.getMasterDataByArtist(artistId,$scope);
                            //获取艺术家工作经历列表数据
                            workSupport.getWorkDataByArtist(artistId,$scope);
                            //获取艺术家教育经历列表数据
                            educationSupport.getEducationDataByArtist(artistId,$scope);
                            //获取艺术家作品关联信息
                            opusArtistRelSupport.getOpusArtistRelDataByArtist(artistId,$scope);
                            //获取艺术家活动关联信息
                            activityArtistRelSupport.getActivityArtistRelDataByArtist(artistId,$scope);
                            //获取艺术家研究评论关联信息
                            researchArtistRelSupport.getResearchArtistRelDataByArtist(artistId,$scope);
                            //获取艺术家新闻关联信息
                            newsArtistRelSupport.getNewsArtistRelDataByArtist(artistId,$scope);
                            //获取艺术家获奖信息
                            awardSupport.getAwardDataByArtist(artistId,$scope);
                            //获取艺术家师承关系列表信息
                            teacherStudentSupport.getTeacherStudentDataByArtist(artistId,$scope);
                            
                            
                            showSlidebar($scope);//滑出右侧编辑页面
                        }
                    });
                }},
                {name:"年龄",field:"birthdayYear",format:function(obj){//处理显示值  obj作用待定
                	//此处待优化
                	//console.log(obj);
                	var curDate = new Date();
                	var curYear = curDate.getFullYear();
                	var year=obj.row.birthdayYear;
                	var age=curYear-year+1;
                	var result = year==null?"":age
                	return result;
                }},
//                {name:"性别",field:"dictSex"},
                {name:"性别",field:"sexName"},
                {name:"所在地",field:"birthPlaceName"},
                {name:"艺术类别",field:"",format:function(obj){//处理显示值  obj作用待定
                	return "待完成";
                }},
                
            ],//end layout
            //按钮操作定义
            toolbar:[
                {name:"添加",class:"fa fa-plus-circle",callback:function(event){
                    //点击添加按钮之后,获取数据,给编辑页面使用
                    $scope.$apply(function () {//数据初始化
                        $scope.artistInfo.entity = {};//清空对象的值
                        $scope.artistInfo.sexCodes = dict.sexCodes();//性别代码表数据  下拉列表
                        $scope.artistInfo.nationCodes = dict.nationCodes();//民族代码表数据 下拉列表
                        $scope.artistInfo.politicalCodes = dict.politicalCodes();//政治面貌代码表数据 下拉列表
                    });
                    showSlidebar($scope);//滑出右侧页面
                }},
                /*{name:"编辑",class:"fa fa-edit",callback:function(event){
                 console.log('编辑')
                 }},*/
                {name:"删除",class:"fa fa-trash-o",callback:function(event){
                    var selected = gridInstance.getSelectedRow();
                    if(selected.length){
                        var artistIds = [];
                        for(var i= 0,item;item=selected[i++];){
                        	artistIds.push(item.artistId);
                        }
                        $.ajax({
                            "url":getServer()+"/artistInfo/remove",
                            "type":"POST",
                            "data":"artistIds="+artistIds.join(","),//userIds为后台处理方法中注解定义的要接受的参数名称,名称要对应,否则接收不到请求
                            "dataType":"json",
                            "success":function(data){
                                if(data.status=="200"){
                                    //表格刷新
                                	result.artistListInit("root",$scope);//删除成功后刷新列表
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
            
            data:{type:"URL",value:getServer()+"/artistInfo/page"} //指定获取列表数据的url
        };//end config
        
        gridInstance = grid.init(config);//用config初始化grid列表
    
     };//end 用户列表初始化
     
     
 	var getRealData = function(url){//处理后台传递给ztree的数据   该方法应该做成公用的,不应该每个模块的support中都写
		var data = null;
    	$.ajax({
    		url:url,
    		async:false,
            dataType:"json",
            "success":function(d){//操作成功后调整
            	data = d.curPageData;
            }
    	})
    	return data;
	}

	result.saveEntity = function($scope){//保存艺术家所有信息的处理过程  在ctrl中调用
		      if($("#artistInfoFormId").valid()){//看表单验证知否通过  valid()方法是jquery validate插件中 检查表单验证是否通过的方法  返回值类型为boolean)
		        //$("#artistInfoFormId").validate();//validate方法是校验表单,返回validator对象
		    	 $scope.artistInfo.artistInfoAll.artistInfo=$scope.artistInfo.entity;
		    	 $scope.artistInfo.artistInfoAll.positions=$scope.artistInfo.positions;//职位
		    	 $scope.artistInfo.artistInfoAll.educations=$scope.artistInfo.educations;//教育
		    	 $scope.artistInfo.artistInfoAll.works=$scope.artistInfo.works;//工作经历
		    	 $scope.artistInfo.artistInfoAll.opusArtistRels=$scope.artistInfo.opusArtistRels;//作品艺术家关联信息
		    	 $scope.artistInfo.artistInfoAll.activityArtistRels=$scope.artistInfo.activityArtistRels;//作品艺术家关联信息
		    	 $scope.artistInfo.artistInfoAll.researchArtistRels=$scope.artistInfo.researchArtistRels;//研究评论艺术家关联信息
		    	 $scope.artistInfo.artistInfoAll.awards=$scope.artistInfo.awards;//获奖艺术家关联信息
		    	 $scope.artistInfo.artistInfoAll.newsArtistRels=$scope.artistInfo.newsArtistRels;//新闻艺术家关联信息
		    	 $scope.artistInfo.artistInfoAll.teacherStudents=$scope.artistInfo.teacherStudents;//师承信息
				      $.ajax({//发送保存数据请求
					          url:getServer()+"/artistInfo/save",//保存数据调用的后台处理程序访问url
					          type:"POST",
					          data: JSON.stringify($scope.artistInfo.artistInfoAll),//将json对象转换成json字符串
					          dataType:"json",
					          contentType: "application/json",
					          success:function(data){
					              if(data.status=="200"){
					                  //保存数据成功后刷新列表
					                  util.alert("保存成功.");
					                  result.artistListInit("root",$scope);//初始化列表
					                  //保存成功后,清空要删除的数组
					                  
					              }
					          },
					          error:function(XMLHttpRequest, textStatus, errorThrown ){
					              util.alert("保存失败.");
					          }
			          });//end ajax
		     }
     };
     
     
     var validate = function(){//艺术家基本信息校验
         $("#artistInfoFormId").validate({//艺术家基本信息输入数据验证   为什么外面还要套一层?  绑定校验到该表单
             rules:{//要校验的字段及校验规则
             	artistName:{//姓名
             		required:true ,
             		chineseLength:50 
             	}
                 ,artistAliases : {//笔名/艺名
                 	chineseLength : 100 
                 }
                 ,tencentQq:{//qq
                 	chineseLength:15 
                 }
                 ,manberShipCard : {//会员证号
                 	chineseLength : 200
                 }
                 ,dictAddress : {//现所在地  代码表
                 	chineseLength : 300
                 }
                 ,familyAddress : {//家庭地址
                 	chineseLength : 300
                 }
                 ,workAddress : {//办公地址
                 	chineseLength : 300
                 }
                 ,familyZip : {//家庭邮编
                 	zipcode : true
                 }
                 ,workZip : {//办公邮编
                 	zipcode : true
                 }
                 ,workPhone : {//办公电话
                 	phone : true
                 }
                 ,familyPhone : {//住宅电话
                 	phone : true
                 }
                 ,tellIphone : {//手机号码
                 	mobile : true
                 }
                 ,faxNum : {//传真号码
                 	fax : true
                 }
                 ,blog : {//博客
                 	chineseLength : 100
                 }
                ,microblog : {//微博
             	   chineseLength : 100
                 }
                ,email : {//邮箱
             	   email:true
                }
                ,introduction : {//简介
             	   chineseLength : 2000
                }
                 
            },
             messages: {//校验提示信息   如果使用封装好的校验,提示信息不用写有默认值,会自动出现在输入框下面,自己写的校验规则才写提示信息
             }
         });
         
     };//end  validate
     
    //return中定义一个变量,并制定变量对应的函数,在ctrl中调用support中的这个变量就是调用变量对应的方法
    return result ;//return作用是什么?待补充
    	
});