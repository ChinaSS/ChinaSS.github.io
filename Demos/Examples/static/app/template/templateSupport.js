define(["HomeApp", "UtilDir/util", "UtilDir/grid"], function(HomeApp, util, grid){
	
	var templateListInit = function($scope){
		var config = {
				id: "templateList",
				placeAt: "templateListId",
				pageSize: 10,
				index:"checkbox",
				layout:[
				    {
						name: "模板名称",
						field: "templateName",
						click: function(e){
							var id = e.data.row.templateId;
							window.open( getServer() + "/template/initSave?templateId=" + id);
						}
				    }, {
						name: "模板类型",
						field: "dictTemplateType"
					}, {
						name: "是否发布",
						field: "isPublish"
					}, {
						name: "模板描述",
						field: "remark"
					}],
				toolbar:[
				         {
				        	 name:"添加",
				             class: "fa fa-plus-circle",
				             callback: function(event){
				            	 window.open( getServer() +"/template/initSave");
				             }
				         }, //添加
				         {
				        	 name: "删除",
				        	 class : "fa fa-trash-o",
				        	 callback: function(event){
					        	 util.confirm("确定要删除选择的数据吗?",function(dialog){
						        		  var selected = gridInstance.getSelectedRow();
						        		  if(selected.length){
						        			  var templateIds = [];
						        			  for(var i = 0 , item ; item = selected[i++];){
						        				  templateIds.push(item.templateId);
						        			  }
						        			  $.ajax({
						        				  "url": getServer() + "/template/remove",
						        				  "type": "POST",
						        				  "data": "templateIds=" + templateIds.join(","),
						        				  "dataType": "json",
						        				  "success": function(data){
						        					  if(data.status == "200"){
						        						  grid.getGrid("templateList").refresh();
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
					        	  });
				        	 }
				       } //删除
				],
				data: {
					type: "URL",
					value: getServer() + "/template/page"
				}
		};
		gridInstance = grid.init(config);
	};
	
	return {
		templateListInit : templateListInit
	}
});