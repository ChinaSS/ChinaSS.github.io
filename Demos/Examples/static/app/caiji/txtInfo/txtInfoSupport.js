/**
 * sarah@author
 */
define(["jquery","UtilDir/util","UtilDir/grid","CommonDir/dictTree"],function($,util,grid,dictTree){
	var result = {};
	
	result.txtListInit = function($scope){
		var config = {
				id : "txtInfoList",
				placeAt : "txtInfoList",
				pageSize : 10,
				index : "checkbox",
				layout : [{name:"文本标题",field:"titleName",click:function(e){
							$scope.txtInfo.entity.txtId = e.data.row.txtId;
							dataInit($scope);
							showSlidebar($scope);
						  }},
				          {name:"文本大小(KB)",field:"txtSize"},
				          {name:"采集时间",field:"creatTime"},
				          {name:"采集人",field:"creatUser"},
				          {name:"业务类型",field:"dictBizType",format:function(obj){
				        	  var bizType = obj.row.dictBizType;
				        	  if(!$scope.txtInfo.bizTypeCodes.length){
					        		$scope.txtInfo.bizTypeCodes = dictTree.bizTypeCodesForLoop();
					        	}
				        	  for(i=0;i<$scope.txtInfo.bizTypeCodes.length;i++){
				        			if(bizType == $scope.txtInfo.bizTypeCodes[i].dictCode){
				        				return $scope.txtInfo.bizTypeCodes[i].dictName;
				        			}
				        	  }
				          }}],
				toolbar : [{name:"添加",class:"fa fa-plus-circle",callback:function(e){
							$scope.txtInfo.entity.txtId = null;
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
				data : {type:"URL",value:getServer()+"/txt/page"},
				formData : {
					dictBizType : $scope.txtInfo.query.dto.dictBizType,
					txtSize : $scope.txtInfo.query.dto.txtSize,
					titleName : $scope.txtInfo.query.dto.titleName
				}
		};
		gridInstance = grid.init(config);
	}; 
	
	//弹出编辑侧边栏
	var showSlidebar = function($scope){
		util.slidebar({
			id:"txtInfoEditPanel",
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
			id:"txtUpload",
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
			$scope.txtInfo.csInputConfig.data = data;
			$scope.txtInfo.query.csInputConfig.data = data;
			$scope.batchUpload.csInputConfig.data = data;
		});
	};
	
	//编辑页面$scope数据初始化
	var dataInit = function($scope){
		if($scope.txtInfo.entity.txtId){
			$.ajax({
				"url" : getServer() + "/txt/query?txtId="+$scope.txtInfo.entity.txtId,
				"type" : "POST",
				"dataType" : "json",
				"success" : function(data){
					$scope.$apply(function(){
						$scope.txtInfo.entity = data.entity;
						$scope.upload.data = [];
						$scope.upload.reset();
					});
				}
			});
		}else{
			$scope.$apply(function(){
				$scope.txtInfo.entity = {};
				$scope.upload.data = [];
				$scope.upload.reset();
			});
		}
	};
	
	//批量删除
	var deleteBatch = function(selected,$scope){
		if(selected.length){
			util.confirm("确认删除？",function(){
				var txtIds = [];
				for(i=0;i<selected.length;i++){
					txtIds.push(selected[i].txtId);
				}
				$.ajax({
					"url" : getServer()+"/txt/delete",
					"type" : "POST",
					"data" : "txtIds="+txtIds.join(","),
					"dataType" : "json",
					"success":function(data){
                        if(data.status=="200"){
                        	util.alert("删除成功");
                        	result.txtListInit($scope);//删除成功后刷新列表                                    
                        }
                    },
                    "error":function(XMLHttpRequest, textStatus, errorThrown ){
                        util.alert("删除失败");
                    }
				});
			});
		}else{
			util.alert('请选择需要删除的文本！');
		}
	};
	
	//查询条件显示控制
	var queryItemsShow = function($scope){
		$scope.$apply(function(){
			if($scope.txtInfo.query.hidden){
				$scope.txtInfo.query.dto = {dictBizType:"",txtSize:"",titleName:""};
				$('#queryConditions').slideToggle("500");
				$scope.txtInfo.query.hidden = false;
			}else{
				$('#queryConditions').slideToggle("500");
				$scope.txtInfo.query.hidden = true;
			}
		});
	}
	
	//保存entity方法
	result.saveEntity = function($scope){
		if($scope.upload.data.length){
			if($scope.upload.data[$scope.upload.data.length-1].fileId){
				$scope.txtInfo.entity.fileId = $scope.upload.data[$scope.upload.data.length-1].fileId;
				$scope.txtInfo.entity.txtSize = parseInt($scope.upload.data[$scope.upload.data.length-1].size/1024+"");
			}else{
				if($scope.txtInfo.entity.txtId){
					
				}else{
					util.alert('未上传文件!');
					return;
				}
			}
		}
		$.ajax({
			url : getServer()+"/txt/save",
			type: "POST",
			data : $scope.txtInfo.entity,
			dataType : "json",
			success: function(data){
				if(data.status == "200"){
					util.alert('保存成功!');
					result.txtListInit($scope);
				}
			}
		});
	}
	
	//批量保存方法
	result.saveBatch = function($scope){
		var batchData = $scope.batchUpload.data;
		var txtFiles = [];
		if(batchData.length){
			for(var i=0;i<batchData.length;i++){
				if(batchData[i].fileId != null && batchData[i].fileId != ""){
					var tempFile = {};
					tempFile.fileId = batchData[i].fileId;
					tempFile.txtSize = parseInt(batchData[i].size/1024+"");
					tempFile.titleName = batchData[i].fileName;
					txtFiles.push(tempFile);
				}
			}
		}
		if($scope.batchUpload.dicBizType){
			if(txtFiles.length){
				for(var j=0;j<txtFiles.length;j++){
					txtFiles[j].dictBizType = $scope.batchUpload.dicBizType;
				}
				var data = {txtFiles:txtFiles};
				$.ajax({
					url : getServer()+"/txt/saveBatch",
					type : "POST",
					data : JSON.stringify(data),
					dataType : "json",
					contentType : "application/json",
					success : function(data){
						if(data.status == "200"){
							util.alert('保存成功!');
							result.txtListInit($scope);
						}
					}
				});
			}else{
				util.alert('请上传文本文件!');
			}
		}else{
			util.alert('请选择业务类型!');
		}
	};
	
	
	return result;
});