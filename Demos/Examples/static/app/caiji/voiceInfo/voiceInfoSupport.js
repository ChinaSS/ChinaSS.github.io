/**
 * sarah@author
 */
define(["jquery","UtilDir/util","UtilDir/grid","CommonDir/dictTree"],function($,util,grid,dictTree){
	var result = {};
	
	result.voiceListInit = function($scope){
		var config = {
				id : "voiceInfoList",
				placeAt : "voiceInfoList",
				pageSize : 10,
				index : "checkbox",
				layout : [{name:"音频标题",field:"titleName",click:function(e){
							$scope.voiceInfo.entity.voiceId = e.data.row.voiceId;
							dataInit($scope);
							showSlidebar($scope);
						  }},
				          {name:"音频大小(KB)",field:"voiceSize"},
				          {name:"采集时间",field:"creatTime"},
				          {name:"采集人",field:"creatUser"},
				          {name:"业务类型",field:"dictBizType",format:function(obj){
				        	  var bizType = obj.row.dictBizType;
				        	  if(!$scope.voiceInfo.bizTypeCodes.length){
					        		$scope.voiceInfo.bizTypeCodes = dictTree.bizTypeCodesForLoop();
					        	}
				        	  for(i=0;i<$scope.voiceInfo.bizTypeCodes.length;i++){
				        			if(bizType == $scope.voiceInfo.bizTypeCodes[i].dictCode){
				        				return $scope.voiceInfo.bizTypeCodes[i].dictName;
				        			}
				        	  }
				          }}],
				toolbar : [{name:"添加",class:"fa fa-plus-circle",callback:function(e){
							$scope.voiceInfo.entity.voiceId = null;
							dataInit($scope);
							showSlidebar($scope);
						   }},{name:"批量上传",class:"fa fa-cloud-upload",callback:function(e){
							   showUploadSlidebar($scope);
						   }},{name:"删除",class:"fa fa-trash-o",callback:function(e){
							   var selected = gridInstance.getSelectedRow();
							   deleteBatch(selected,$scope);
						   }},{name:"查询",class:"fa fa-search",callback:function(e){
							   queryItemsShow($scope);
						   }}],
				data : {type:"URL",value:getServer()+"/voice/page"},
				formData : {
					dictBizType : $scope.voiceInfo.query.dto.dictBizType,
					voiceSize : $scope.voiceInfo.query.dto.voiceSize,
					titleName : $scope.voiceInfo.query.dto.titleName
				}
		};
		gridInstance = grid.init(config);
	}; 
	
	//弹出编辑侧边栏
	var showSlidebar = function($scope){
		util.slidebar({
			id:"voiceInfoEditPanel",
			width:"800px",
			afterload:function(){
				
			}
		});
		$scope.upload.init();
	};
	
	//弹出批量上传侧边栏
	var showUploadSlidebar = function($scope){
		$scope.$apply(function(){
			$scope.batchUpload.data = [];
			$scope.batchUpload.reset();
			$scope.batchUpload.dicBizType = "";
		});
		util.slidebar({
			id:"voiceUpload",
			width:"800px",
			afterload:function(){
				
			}
		});
		$scope.batchUpload.init();
	};
	
	//给csInput赋值
	result.csInputDataInit = function($scope){
		$scope.$apply(function(){
			var data = dictTree.bizTypeCodes();
			$scope.voiceInfo.csInputConfig.data = data;
			$scope.voiceInfo.query.csInputConfig.data = data;
			$scope.batchUpload.csInputConfig.data = data;
		});
	};
	
	//编辑页面$scope数据初始化
	var dataInit = function($scope){
		if($scope.voiceInfo.entity.voiceId){
			$.ajax({
				"url" : getServer() + "/voice/query?voiceId="+$scope.voiceInfo.entity.voiceId,
				"type" : "POST",
				"dataType" : "json",
				"success" : function(data){
					$scope.$apply(function(){
						$scope.voiceInfo.entity = data.entity;
						$scope.upload.data = [];
						$scope.upload.reset();
					});
				}
			});
		}else{
			$scope.$apply(function(){
				$scope.voiceInfo.entity = {};
				$scope.upload.data = [];
				$scope.upload.reset();
			});
		}
	};
	
	//批量删除
	var deleteBatch = function(selected,$scope){
		if(selected.length){
			util.confirm("确认删除？",function(){
				var voiceIds = [];
				for(i=0;i<selected.length;i++){
					voiceIds.push(selected[i].voiceId);
				}
				$.ajax({
					"url" : getServer()+"/voice/delete",
					"type" : "POST",
					"data" : "voiceIds="+voiceIds.join(","),
					"dataType" : "json",
					"success":function(data){
                        if(data.status=="200"){
                        	util.alert("删除成功");
                        	result.voiceListInit($scope);//删除成功后刷新列表                                    
                        }
                    },
                    "error":function(XMLHttpRequest, textStatus, errorThrown ){
                        util.alert("删除失败");
                    }
				});
			});
		}else{
			util.alert('请选择需要删除的音频！');
		}
	};
	
	//查询条件显示控制
	var queryItemsShow = function($scope){
		$scope.$apply(function(){
			if($scope.voiceInfo.query.hidden){
				$scope.voiceInfo.query.dto = {dictBizType:"",voiceSize:"",titleName:""};
				$('#queryConditions').slideToggle("500");
				$scope.voiceInfo.query.hidden = false;
			}else{
				$('#queryConditions').slideToggle("500");
				$scope.voiceInfo.query.hidden = true;
			}
		});
	}
	
	//保存entity方法
	result.saveEntity = function($scope){
		if($scope.upload.data.length){
			if($scope.upload.data[$scope.upload.data.length-1].fileId){
				$scope.voiceInfo.entity.fileId = $scope.upload.data[$scope.upload.data.length-1].fileId;
				$scope.voiceInfo.entity.voiceSize = parseInt($scope.upload.data[$scope.upload.data.length-1].size/1024+"");
			}else{
				if($scope.voiceInfo.entity.voiceId){
					
				}else{
					util.alert('未上传文件!');
					return;
				}
			}
		}
		$.ajax({
			url : getServer()+"/voice/save",
			type: "POST",
			data : $scope.voiceInfo.entity,
			dataType : "json",
			success: function(data){
				if(data.status == "200"){
					util.alert('保存成功!');
					result.voiceListInit($scope);
				}
			}
		});
	}
	
	//批量保存方法
	result.saveBatch = function($scope){
		var batchData = $scope.batchUpload.data;
		var voiceFiles = [];
		if(batchData.length){
			for(var i=0;i<batchData.length;i++){
				if(batchData[i].fileId != null && batchData[i].fileId != ""){
					var tempFile = {};
					tempFile.fileId = batchData[i].fileId;
					tempFile.voiceSize = parseInt(batchData[i].size/1024+"");
					tempFile.titleName = batchData[i].fileName;
					voiceFiles.push(tempFile);
				}
			}
		}
		if($scope.batchUpload.dicBizType){
			if(voiceFiles.length){
				for(var j=0;j<voiceFiles.length;j++){
					voiceFiles[j].dictBizType = $scope.batchUpload.dicBizType;
				}
				var data = {voiceFiles:voiceFiles};
				$.ajax({
					url : getServer()+"/voice/saveBatch",
					type : "POST",
					data : JSON.stringify(data),
					dataType : "json",
					contentType : "application/json",
					success : function(data){
						if(data.status == "200"){
							util.alert('保存成功!');
							result.voiceListInit($scope);
						}
					}
				});
			}else{
				util.alert('请上传音频文件!');
			}
		}else{
			util.alert('请选择业务类型!');
		}
	};
	
	
	return result;
});