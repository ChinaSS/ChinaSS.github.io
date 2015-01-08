/**
 * sarah@author
 */
define(["jquery","UtilDir/util","UtilDir/grid","CommonDir/dictTree"],function($,util,grid,dictTree){
	var result = {};
	
	result.videoListInit = function($scope){
		var config = {
				id : "videoInfoList",
				placeAt : "videoInfoList",
				pageSize : 10,
				index : "checkbox",
				layout : [{name:"视频标题",field:"titleName",click:function(e){
							$scope.videoInfo.entity.videoId = e.data.row.videoId;
							dataInit($scope);
							showSlidebar($scope);
						  }},
				          {name:"视频大小(KB)",field:"videoSize"},
				          {name:"采集时间",field:"creatTime"},
				          {name:"采集人",field:"creatUser"},
				          {name:"业务类型",field:"dictBizType",format:function(obj){
				        	  var bizType = obj.row.dictBizType;
				        	  if(!$scope.videoInfo.bizTypeCodes.length){
					        		$scope.videoInfo.bizTypeCodes = dictTree.bizTypeCodesForLoop();
					        	}
				        	  for(i=0;i<$scope.videoInfo.bizTypeCodes.length;i++){
				        			if(bizType == $scope.videoInfo.bizTypeCodes[i].dictCode){
				        				return $scope.videoInfo.bizTypeCodes[i].dictName;
				        			}
				        	  }
				          }}],
				toolbar : [{name:"添加",class:"fa fa-plus-circle",callback:function(e){
							$scope.videoInfo.entity.videoId = null;
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
				data : {type:"URL",value:getServer()+"/video/page"},
				formData : {
					dictBizType : $scope.videoInfo.query.dto.dictBizType,
					videoSize : $scope.videoInfo.query.dto.videoSize,
					titleName : $scope.videoInfo.query.dto.titleName
				}
		};
		gridInstance = grid.init(config);
	}; 
	
	//弹出编辑侧边栏
	var showSlidebar = function($scope){
		util.slidebar({
			id:"videoInfoEditPanel",
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
			id:"videoUpload",
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
			$scope.videoInfo.csInputConfig.data = data;
			$scope.videoInfo.query.csInputConfig.data = data;
			$scope.batchUpload.csInputConfig.data = data;
		});
	};
	
	//编辑页面$scope数据初始化
	var dataInit = function($scope){
		if($scope.videoInfo.entity.videoId){
			$.ajax({
				"url" : getServer() + "/video/query?videoId="+$scope.videoInfo.entity.videoId,
				"type" : "POST",
				"dataType" : "json",
				"success" : function(data){
					$scope.$apply(function(){
						$scope.videoInfo.entity = data.entity;
						$scope.upload.data = [];
						$scope.upload.reset();
					});
				}
			});
		}else{
			$scope.$apply(function(){
				$scope.videoInfo.entity = {};
				$scope.upload.data = [];
				$scope.upload.reset();
			});
		}
	};
	
	//批量删除
	var deleteBatch = function(selected,$scope){
		if(selected.length){
			util.confirm("确认删除？",function(){
				var videoIds = [];
				for(i=0;i<selected.length;i++){
					videoIds.push(selected[i].videoId);
				}
				$.ajax({
					"url" : getServer()+"/video/delete",
					"type" : "POST",
					"data" : "videoIds="+videoIds.join(","),
					"dataType" : "json",
					"success":function(data){
                        if(data.status=="200"){
                        	util.alert("删除成功");
                        	result.videoListInit($scope);//删除成功后刷新列表                                    
                        }
                    },
                    "error":function(XMLHttpRequest, textStatus, errorThrown ){
                        util.alert("删除失败");
                    }
				});
			});
		}else{
			util.alert('请选择需要删除的视频！');
		}
	};
	
	//查询条件显示控制
	var queryItemsShow = function($scope){
		$scope.$apply(function(){
			if($scope.videoInfo.query.hidden){
				$scope.videoInfo.query.dto = {dictBizType:"",videoSize:"",titleName:""};
				$('#queryConditions').slideToggle("500");
				$scope.videoInfo.query.hidden = false;
			}else{
				$('#queryConditions').slideToggle("500");
				$scope.videoInfo.query.hidden = true;
			}
		});
	}
	
	//保存entity方法
	result.saveEntity = function($scope){
		if($scope.upload.data.length){
			if($scope.upload.data[$scope.upload.data.length-1].fileId){
				$scope.videoInfo.entity.fileId = $scope.upload.data[$scope.upload.data.length-1].fileId;
				$scope.videoInfo.entity.videoSize = parseInt($scope.upload.data[$scope.upload.data.length-1].size/1024+"");
			}else{
				if($scope.videoInfo.entity.videoId){
					
				}else{
					util.alert('未上传文件!');
					return;
				}
			}
		}
		$.ajax({
			url : getServer()+"/video/save",
			type: "POST",
			data : $scope.videoInfo.entity,
			dataType : "json",
			success: function(data){
				if(data.status == "200"){
					util.alert('保存成功!');
					result.videoListInit($scope);
				}
			}
		});
	}
	
	//批量保存方法
	result.saveBatch = function($scope){
		var batchData = $scope.batchUpload.data;
		var videoFiles = [];
		if(batchData.length){
			for(var i=0;i<batchData.length;i++){
				if(batchData[i].fileId != null && batchData[i].fileId != ""){
					var tempFile = {};
					tempFile.fileId = batchData[i].fileId;
					tempFile.videoSize = parseInt(batchData[i].size/1024+"");
					tempFile.titleName = batchData[i].fileName;
					videoFiles.push(tempFile);
				}
			}
		}
		if($scope.batchUpload.dicBizType){
			if(videoFiles.length){
				for(var j=0;j<videoFiles.length;j++){
					videoFiles[j].dictBizType = $scope.batchUpload.dicBizType;
				}
				var data = {videoFiles:videoFiles};
				$.ajax({
					url : getServer()+"/video/saveBatch",
					type : "POST",
					data : JSON.stringify(data),
					dataType : "json",
					contentType : "application/json",
					success : function(data){
						if(data.status == "200"){
							util.alert('保存成功!');
							result.videoListInit($scope);
						}
					}
				});
			}else{
				util.alert('请上传视频文件!');
			}
		}else{
			util.alert('请选择业务类型!');
		}
	};
	
	
	return result;
});