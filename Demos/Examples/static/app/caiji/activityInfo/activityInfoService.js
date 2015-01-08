define(["UtilDir/util","UtilDir/grid","CommonDir/dict","CommonDir/dictTree","UtilDir/inputSelect","ActivityInfoDir/activityList","ActivityInfoDir/activityArtistRelSupport"],function(util,grid,dict,dictTree,inputSelect,activityList,actArtistRel){

	var result = {};
	
	//活动信息列表初始化
	result.activityListInit = function($scope){
   	 	var config = {
            id:"activityInfoList",//grid的ID
            placeAt:"activityInfoList",              
            pageSize:10,                         
            index:"checkbox",                   
            layout:[
                {name:"活动名称",field:"actName",click:function(e){
                    var id = e.data.row.activityId;
                    $.ajax({
                        "url":getServer()+"/activityInfo/query?activityId="+id,
                        "type":"POST",
                        dataType:"json",
                        "success":function(d){
                            $scope.$apply(function () {
                                $scope.activityInfo.entity = d.entity;
                                //inputSelect组件需要的当前活动艺术类别的id数组
                                var actArtTypeList = d.entity.activityArtTypeList;
                                var tempArtTypeList = [];
                                if(actArtTypeList != null ){
                                	for(i=0;i<actArtTypeList.length;i++){
                                		var tempObj = actArtTypeList[i].id.dictArtType;
                                		tempArtTypeList.push(tempObj);
                                	}
                                }
                                $scope.activityInfo.artTypeList = tempArtTypeList;
                                
                                //关联艺术家信息读取处理
                                var actArtistList = d.entity.activityArtistList;
                                var tempArtistList = [];
                                if(actArtistList != null){
                                	for(i=0;i<actArtistList.length;i++){
                                		var tempArtist = {};
                                		var artistEntity = activityList.queryArtist(actArtistList[i].id.artistId);
                                		tempArtist.artistId = artistEntity.artistId;
                                		tempArtist.artistName = artistEntity.artistName;
                                		tempArtist.artistAge = null;
                                		if(artistEntity.birthdayYear != null){
                                			var today = new Date();
                                			tempArtist.artistAge = today.getFullYear() - artistEntity.birthdayYear;
                                		}
                                		tempArtist.sex = null;
                                		if(artistEntity.dictSex != null){
                                			var sexCodes = dict.sexCodes();
                                			for(j=0;j<sexCodes.length;j++){
                                				if(artistEntity.dictSex == sexCodes[j].dictCode){
                                					tempArtist.sex = sexCodes[j].dictName;
                                				}
                                			}
                                		}
                                		tempArtistList.push(tempArtist);
                                	}
                                }
                                $scope.activityInfo.actArtistList = tempArtistList;
                                
                                //关联作品信息读取处理
                                var actOpusList = d.entity.activityOpusList;
                                var tempOpusList =[];
                                if(actOpusList != null){
                                	for(i=0;i<actOpusList.length;i++){
                                		var tempOpus = {};
                                		tempOpus.opusId = actOpusList[i].id.opusId;
                                		var opusEntity = activityList.queryOpus(actOpusList[i].id.opusId);
                                		tempOpus.opusName = opusEntity.opusName;
                                		tempOpus.topic = opusEntity.topic;
                                		tempOpus.masterParticipants = opusEntity.masterParticipants;
                                		tempOpus.creationYear = opusEntity.creationYear;
                                		tempOpus.issuanceYear = opusEntity.issuanceYear;
                                		tempOpusList.push(tempOpus);
                                	}
                                }
                                $scope.activityInfo.actOpusList = tempOpusList;
                                
                                //关联文件信息读取处理
                                var actFileList = d.entity.activityFileList;
                                var tempFileList = [];
                                var fileIds = [];
                                if(actFileList != null){
                                	for(i=0;i<actFileList.length;i++){
                                		var fileId = actFileList[i].id.fileId;
                                		fileIds.push(fileId);
                                	}
                                	tempFileList = activityList.findFiles(fileIds);
                                }
                                $scope.upload.data = tempFileList; 
                                //置空uploader的上传列表
                                $scope.upload.reset();
                            });
                            showSlidebar($scope);
                        }
                    });
                }},
                {name:"届次",field:"timeNumber"},
                {name:"活动地点",field:"actAddress",format:function(obj){
                	var actAddress = obj.row.actAddress;
                	var addressNames = "";
                	if(actAddress != null){
                		var actAddressList = actAddress.split(',');
                		for(i=0;i<actAddressList.length;i++){
                			if(i != actAddressList.length-1){
                				addressNames = addressNames+dictTree.regionEntity(actAddressList[i]).dictName+",";
                			}else{
                				addressNames = addressNames+dictTree.regionEntity(actAddressList[i]).dictName;
                			}
                		}
                	}
                	return addressNames;

                }},
                {name:"活动类别",field:"dictActType",format:function(obj){
                	var dictActType = obj.row.dictActType;
                	$scope.activityInfo.dictActTypeCodes = dict.activityTypeCodes();
                	if(dictActType != null){
                		for(i=0;i<$scope.activityInfo.dictActTypeCodes.length;i++){
                    		if(dictActType == $scope.activityInfo.dictActTypeCodes[i].dictCode){
                    			return $scope.activityInfo.dictActTypeCodes[i].dictName;
                    		}
                    	}
                	}else{
                		return "";
                	}
                	
                }},
                {name:"艺术类别",field:"",format:function(obj){
                	$scope.activityInfo.artTypeCodes = dictTree.artTypeList();
                	var artTypeForView = "";
                	if(obj.row.activityArtTypeList != null && obj.row.activityArtTypeList.length>0){
                		var artTypeList = obj.row.activityArtTypeList;
                		for(i=0;i<artTypeList.length;i++){
                			for(j=0;j<$scope.activityInfo.artTypeCodes.length;j++){
                				if(artTypeList[i].id.dictArtType == $scope.activityInfo.artTypeCodes[j].id){
                					if(!(i == (artTypeList.length-1))){
                						artTypeForView = artTypeForView+$scope.activityInfo.artTypeCodes[j].name+",";
                					}else{
                						artTypeForView = artTypeForView+$scope.activityInfo.artTypeCodes[j].name;
                					}
                				}
                			}
                		}
                	}
                	return artTypeForView;
                	
                }},
                {name:"主办单位",field:"",format:function(obj){
                	return "待完成";
                }},
                {name:"活动时间",field:"",format:function(obj){
                	var year = obj.row.beginYear;
                	var month = obj.row.beginMonth;
                	var day = obj.row.beginDay;
                	if(!year){
                		return "";
                	}
                	if(!month){
                		return year+"";
                	}
                	if(!day){
                		return year+"."+month;
                	}
                	return year+"."+month+"."+day;
                }}
                
            ],
            toolbar:[
                {name:"添加",class:"fa fa-plus-circle",callback:function(event){
                    //清空资源数据
                    $scope.$apply(function () {
                        $scope.activityInfo.entity = {};
                        $scope.activityInfo.artTypeList = [];
                        $scope.activityInfo.actArtistList = [];
                        $scope.activityInfo.actOpusList = [];
                        $scope.upload.data = [];
                        $scope.upload.reset();
                    });
                    showSlidebar($scope);//滑出右侧页面
                }},
                {name:"查询",class:"fa fa-search",callback:function(event){//图标需修改、暂时作为查询第一页结果功能
                	$.ajax({
                		"url": getServer()+"/activityInfo/pages",
                		"type":"POST",
                		"data":1,
                		"dataType":"json",
                		"success":function(data){
                			if(data.status=="200"){
                				result.activityListInit($scope);
                			}
                		},
                		"error":function(XMLHttpRequest, textStatus, errorThrown){
                			util.alert("查询失败");
                		}
                	});
                }},
                {name:"删除",class:"fa fa-trash-o",callback:function(event){
                	var selected = gridInstance.getSelectedRow();
                    if(selected.length){
                	util.confirm("确认删除？",function(){
                		var activityIds = [];
                        for(var i= 0,item;item=selected[i++];){
                        	activityIds.push(item.activityId);
                        }
                        $.ajax({
                            "url":getServer()+"/activityInfo/remove",
                            "type":"POST",
                            "data":"activityIds="+activityIds.join(","),//userIds为后台处理方法中注解定义的要接受的参数名称,名称要对应,否则接收不到请求
                            "dataType":"json",
                            "success":function(data){
                                if(data.status=="200"){
                                    //表格刷新
                                	util.alert("删除成功");
                                	result.activityListInit($scope);//删除成功后刷新列表                                    
                                }
                            },
                            "error":function(XMLHttpRequest, textStatus, errorThrown ){
                                util.alert("删除失败");
                            }
                        });
                	});
                		}else{
                        util.alert("请选择要删除的数据");
                    }
                    
                }}
            ],
            data:{type:"URL",value:getServer()+"/activityInfo/pages"}
        };
        
        gridInstance = grid.init(config);//用config初始化grid列表
    
     };

     //弹出侧边栏
     var showSlidebar = function($scope){
         util.slidebar({
             id:"ActivityInfoEditPanel",//edit.html中的最外层div  id
             width:"900px",//滑出页面的宽度
             afterLoad:function(){
//             	validate();//校验
             	inputSelect({
                	id:"activityArtType",
                	type:"checkbox",
                	data:$scope.activityInfo.artTypeCodes,
                	initData:$scope.activityInfo.artTypeList,
                	callback : function(data){
                		$scope.activityInfo.artTypeList = data;
                	}
                });
             }
         });                    //"css!"+getStaticPath()+"modules/util/css/grid.css"
  
     };
     
     //保存方法
     result.saveEntity = function($scope){
//	      if($("#activityInfoForm").valid()){
    	 //此处均传回所有已选类别，不作筛选出delList和addList
    	 //处理回传的艺术类别信息
    	 $scope.activityInfo.entity.activityArtTypeList = [];
    	 if($scope.activityInfo.artTypeList != null){
    		 for(i=0;i<$scope.activityInfo.artTypeList.length;i++){
				 var tempObj = {id:{activityId:"",dictArtType:""}};
				 tempObj.id.dictArtType = $scope.activityInfo.artTypeList[i];
				 $scope.activityInfo.entity.activityArtTypeList.push(tempObj);
			 }
    		 for(i=0;i<$scope.activityInfo.entity.activityArtTypeList.length;i++){
				 $scope.activityInfo.entity.activityArtTypeList[i].id.activityId = $scope.activityInfo.entity.activityId;
			 }
    	 }
    	 //处理回传的关联艺术家信息
    	 $scope.activityInfo.entity.activityArtistList = [];
    	 if($scope.activityInfo.actArtistList != null){
    		 for(i=0;i<$scope.activityInfo.actArtistList.length;i++){
    			 var tempObj = {id:{activityId:"",artistId:""}};
    			 tempObj.id.artistId = $scope.activityInfo.actArtistList[i].artistId;
    			 $scope.activityInfo.entity.activityArtistList.push(tempObj);
    		 }
    		 for(i=0;i<$scope.activityInfo.entity.activityArtistList.length;i++){
    			 $scope.activityInfo.entity.activityArtistList[i].id.activityId = $scope.activityInfo.entity.activityId;
    		 }
    	 }
    	 //处理回传的关联作品信息
    	 $scope.activityInfo.entity.activityOpusList = [];
    	 if($scope.activityInfo.actOpusList != null){
    		 for(i=0;i<$scope.activityInfo.actOpusList.length;i++){
    			 var tempObj = {id:{activityId:"",opusId:""}};
    			 tempObj.id.opusId = $scope.activityInfo.actOpusList[i].opusId;
    			 $scope.activityInfo.entity.activityOpusList.push(tempObj);
    		 }
    		 for(i=0;i<$scope.activityInfo.entity.activityOpusList.length;i++){
    			 $scope.activityInfo.entity.activityOpusList[i].id.activityId = $scope.activityInfo.entity.activityId;
    		 }
    	 }
    	 //处理回传的关联文件信息
    	 $scope.activityInfo.entity.activityFileList = [];
    	 if($scope.upload.data != null){
    		 for(i=0;i<$scope.upload.data.length;i++){
    			 var tempObj = {id:{activityId:"",fileId:""}};
    			 if($scope.upload.data[i].fileId != null && $scope.upload.data[i].fileId != ""){
    				 tempObj.id.fileId = $scope.upload.data[i].fileId;
    				 $scope.activityInfo.entity.activityFileList.push(tempObj);
    			 }
    		 }
    		 for(i=0;i<$scope.activityInfo.entity.activityFileList.length;i++){
    			 $scope.activityInfo.entity.activityFileList[i].id.activityId = $scope.activityInfo.entity.activityId;
    		 }
    	 }
    	 
	      $.ajax({
	          "url":getServer()+"/activityInfo/save",
	          "type":"POST",
	          "data": JSON.stringify($scope.activityInfo.entity),
	          "dataType":"json",
	          contentType: 'application/json', 
	          "success":function(data){
	              if(data.status=="200"){
	                  //保存数据成功后刷新列表
	                  util.alert("保存成功");
	                  result.activityListInit($scope);//初始化列表
	              }
	          },
	          "error":function(XMLHttpRequest, textStatus, errorThrown ){
	              util.alert("保存失败");
	          }
	      });
//	     }
};
	//删除前端显示的关联艺术家$scope.activityInfo.actArtistList中的艺术家
	result.delArtist = function($scope,index){
		util.confirm("确认删除？",function(){
			$scope.$apply(function(){
				$scope.activityInfo.actArtistList.splice(index,1);
			});
			
		});
		
	};
	//增加前端显示的关联艺术家list，并放在$scope.activityInfo.actArtistList中
	result.addArtist = function($scope){
		util.slidebar({
            id:"relArtist",//侧边栏html中的最外层div的id
            width:"500px",//滑出页面的宽度
            afterLoad:function(){
            }
        });
		actArtistRel.artistListInit($scope);
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

       
    };
    
    
    
    
	var getRealData = function(url){//处理后台传递给ztree的数据   该方法应该做成公用的,不应该每个模块的service中都写
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

	

    //return中定义一个变量,并制定变量对应的函数,在ctrl中调用service中的这个变量就是调用变量对应的方法
    return result ;
    	
});