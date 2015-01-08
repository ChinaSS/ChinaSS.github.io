/**
 * 关联作品信息相关功能
 */
define(["UtilDir/util","UtilDir/grid","UtilDir/dialog"],function(util,grid,dialog){
	var result = {};
	//作品列表初始化
	result.opusListInit = function($scope){
		var config = {
			id : "opusListForChoose",
			placeAt : "relOpusListForChoose",
			pageSize : 10,
			index : "checkbox",
			layout : [{name : "作品名称" , field : "opusName" },
			          {name : "主题" , field : "topic" },
			          {name : "出处" , field : "masterParticipants" },
			          {name : "创作年份" , field : "creationYear" },
			          {name : "发表年份" , field:"issuanceYear" }],
			toolbar : [{name : "选择" , class : "fa fa-plus-circle" , callback:function(event){
				var selected = gridInstance.getSelectedRow();
				if(selected.length){
					var existOrNot = 0;
					for(i=0;i<selected.length;i++){
						for(j=0;j<$scope.activityInfo.actOpusList.length;j++){
							if(selected[i].opusId == $scope.activityInfo.actOpusList[j].opusId){
								existOrNot = 1;
							}
						}
					}
					if(existOrNot){
						util.alert('包含已存在关联作品');
					}else{
						$scope.$apply(function(){
							for(i=0;i<selected.length;i++){
								tempOpus = {};
								tempOpus.opusId = selected[i].opusId;
								tempOpus.opusName = selected[i].opusName;
								tempOpus.topic = selected[i].topic;
								tempOpus.masterParticipants = selected[i].masterParticipants;
                        		tempOpus.creationYear = selected[i].creationYear;
                        		tempOpus.issuanceYear = selected[i].issuanceYear;
                        		$scope.activityInfo.actOpusList.push(tempOpus);
							}
						});
					}
				}else{
					util.alert('请选择作品！');
				}
			}}],
			data : {type : "URL" , value : getServer() + "/caiji/opus/page"}
		};
		gridInstance = grid.init(config);
	};
	
	//关联作品前端显示列表删除功能
	result.delOpus = function($scope,index){
		util.confirm("确认删除？",function(){
			$scope.$apply(function(){
				$scope.activityInfo.actOpusList.splice(index,1);
			});
		});
	}
	
	//打开可选择作品列表侧边栏
	result.addOpus = function($scope){
		util.slidebar({
			id:"relOpus",
			width:"500px",
			afterLoad:function(){}
		});
		result.opusListInit($scope);
	};
	
	return result;
});