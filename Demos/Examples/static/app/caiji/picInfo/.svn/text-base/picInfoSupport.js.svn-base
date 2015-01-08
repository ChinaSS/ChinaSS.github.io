/**
 * author@sarah
 */
define(["jquery","UtilDir/util","UtilDir/grid","CommonDir/dict","CommonDir/dictTree"],function($,util,grid,dict,dictTree){
	
	var result = {};
	
	result.pictureListInit = function($scope){
		var config = {
				id:"pictureInfoList",
				placeAt:"pictureInfoList",
				pageSize:10,
				index:"checkbox",
				layout:[{name:"图片名称",field:"titleName",click:function(e){
					$scope.$apply(function(){
						$scope.picInfo.entity = e.data.row;
						$scope.upload.reset();
						$scope.upload.data = [];
						var tempPicture = {fileName:"",fileId:""};
						tempPicture.fileName = e.data.row.titleName;
						tempPicture.fileId = e.data.row.fileId;
						$scope.upload.data.push(tempPicture);
						$scope.picInfo.pictureUrl = getServer() + '/file/downloadPic?fileId=' + $scope.upload.data[$scope.upload.data.length-1].fileId + '&bizType=' + $scope.upload.bizType;
						});
					showSlidebar($scope);
					}},
				        {name:"图片大小(KB)",field:"picSize"},
				        {name:"图片高度",field:"picHeight"},
				        {name:"图片宽度",field:"picWidth"},
				        {name:"采集时间",field:"creatTime",format:function(obj){
				        	return obj.row.creatTime;
				        }},
				        {name:"业务类型",field:"dictBizType",format:function(obj){
				        	var bizType = obj.row.dictBizType;
				        	if(!$scope.picInfo.bizTypeCodes.length){
				        		$scope.picInfo.bizTypeCodes = dictTree.bizTypeCodesForLoop();
				        	}
				        	for(i=0;i<$scope.picInfo.bizTypeCodes.length;i++){
			        			if(bizType == $scope.picInfo.bizTypeCodes[i].dictCode){
			        				return $scope.picInfo.bizTypeCodes[i].dictName;
			        			}
			        		}
				        }}],
				toolbar:[{name:"添加",class:"fa fa-plus-circle",callback:function(e){
					$scope.$apply(function(){
						$scope.picInfo.entity = {};
						$scope.upload.reset();
						$scope.upload.data = [{fileName:"",fileId:""}];
					});
					showSlidebar($scope);
					}},{name:"批量上传",class:"fa fa-cloud-upload",callback:function(e){
						$scope.$apply(function(){
							$scope.batchUpload.data=[];
							$scope.batchUpload.reset();
						});
						showUpload($scope);
					}},{name:"删除",class:"fa fa-trash-o",callback:function(e){
						var selected = gridInstance.getSelectedRow();
						if(selected.length){
							util.confirm("确认删除？",function(){
								var picIds = [];
								for(i=0;i<selected.length;i++){
									picIds.push(selected[i].picId);
								}
								$.ajax({
									"url" : getServer()+"/picture/delete",
									"type" : "POST",
									"data" : "picIds="+picIds.join(","),
									"dataType" : "json",
									"success":function(data){
		                                if(data.status=="200"){
		                                	util.alert("删除成功");
		                                	result.pictureListInit($scope);//删除成功后刷新列表                                    
		                                }
		                            },
		                            "error":function(XMLHttpRequest, textStatus, errorThrown ){
		                                util.alert("删除失败");
		                            }
								});
							});
						}else{
							util.alert('请选择需要删除的图片！');
						}
					}},
					{name:"查询",class:"fa fa-search",callback:function(e){
						$scope.$apply(function(){
							if($scope.picInfo.query.hidden){
								$scope.picInfo.query.dto = {dictBizType:"",picSize:"",titleName:""};
								$('#queryConditions').slideToggle("500");
								$scope.picInfo.query.hidden = false;
							}else{
								$('#queryConditions').slideToggle("500");
								$scope.picInfo.query.hidden = true;
							}
						});
					}}],
				data:{type:"URL",value:getServer()+"/picture/page"},
				formData : {
					dictBizType : $scope.picInfo.query.dto.dictBizType,
					picSize : $scope.picInfo.query.dto.picSize,
					titleName : $scope.picInfo.query.dto.titleName
				}
		};
		gridInstance = grid.init(config);
	};
	
	var showSlidebar = function($scope){
		$scope.upload.init();
		util.slidebar({
			id:"picInfoEditPanel",
			width:"800px",
			afterLoad:function(){
				
			}
		});
	};
	
	var showUpload = function($scope){
		$scope.$apply(function(){
			$scope.batchUpload.dicBizType = "";
		});
		util.slidebar({
			id:"pictureUpload",
			width:"800px",
			afterLoad:function(){
				
			}
		});
		$scope.batchUpload.init();
	}
	
	result.saveEntity = function($scope){
		//处理回传图片信息，考虑用户误操作情况
		var data = $scope.upload.data;
		var fileId = $scope.picInfo.entity.fileId;
		if(data.length){
			if(data[data.length-1].fileId != null && data[data.length-1].fileId != ""){
				$scope.picInfo.entity.fileId = data[data.length-1].fileId;
			}
		}
		if(fileId != $scope.picInfo.entity.fileId){
			$scope.picInfo.entity.titleName = data[data.length-1].fileName;
			$scope.picInfo.entity.picSize = parseInt(data[data.length-1].size/1024+"");
		}else{
			$scope.picInfo.entity.titleName = data[data.length-1].fileName;
		}
		
		if($scope.picInfo.entity.fileId != null){
			$.ajax({
				"url" : getServer()+"/picture/save",
				"type" : "POST",
				"data" : $scope.picInfo.entity,
				"dataType" :"json",
				"success" : function(data){
					if(data.status == "200"){
						util.alert('保存成功!');
						result.pictureListInit($scope);
					}
				},
				"error" : function(XMLHttpRequest, textStatus, errorThrown){
					util.alert('保存失败!');
				}
			});
		}else{
			util.alert('未上传图片！');
		}
		
	}
	
	result.saveBatch = function($scope){
		var batchData = $scope.batchUpload.data;
		var pictureFiles = [];
		if(batchData.length){
			for(i=0;i<batchData.length;i++){
				if(batchData[i].fileId != null && batchData[i].fileId != ""){
					var tempFile = {};
					tempFile.fileId = batchData[i].fileId;
					tempFile.picSize = parseInt(batchData[i].size/1024+"");
					tempFile.titleName = batchData[i].fileName;
					tempFile.picHeight = batchData[i].fileHeight;
					tempFile.picWidth = batchData[i].fileWidth;
					pictureFiles.push(tempFile);
				}
			}
		}
		if($scope.batchUpload.dicBizType){
			for(j=0;j<pictureFiles.length;j++){
				pictureFiles[j].dictBizType = $scope.batchUpload.dicBizType;
			}
			if(pictureFiles.length){
				var data = {pictureFiles:pictureFiles};
				$.ajax({
					"url" : getServer()+"/picture/saveBatch",
					"type" : "POST",
					"data" : JSON.stringify(data),
					"dataType" :"json",
					"contentType": 'application/json', 
					"success" : function(data){
						if(data.status == "200"){
							util.alert('保存成功!');
							result.pictureListInit($scope);
						}
					}
				});
			}else{
				util.alert('未上传图片！');
			}
		}else{
			util.alert('请选择业务类型!');
		}
	};
	
	result.show = function($scope){
		if($scope.upload.data.length){
			if($scope.upload.data[$scope.upload.data.length-1].fileId != null && $scope.upload.data[$scope.upload.data.length-1].fileId != ""){
					$scope.picInfo.pictureUrl = getServer() + '/file/downloadPic?fileId=' + $scope.upload.data[$scope.upload.data.length-1].fileId + '&bizType=' + $scope.upload.bizType;
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}	
	};
	
	result.queryBizType = function ($scope){
		$.ajax({
			url : dictTree.queryUrl.businessType,
			method : "POST",
			async : false,
			dataType : "json",
			success : function(d){
				if("200" == d.status){
					$scope.$apply(function(){
						$scope.picInfo.query.csInputConfig.data = d.curPageData;
						$scope.picInfo.csInputConfig.data = d.curPageData;
						$scope.upload.csInputConfig.data = d.curPageData;
					});					
				}
			}
		});		
		
	}
	
	
	return result;
});