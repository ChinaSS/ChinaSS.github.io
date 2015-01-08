/**
 * 关联艺术家
 */

define(["UtilDir/util","UtilDir/grid","UtilDir/dialog","CommonDir/dict"],function(util,grid,dialog,dict){
	var result = {};
	//艺术家列表初始化
	result.artistListInit = function($scope){
		var config = {
			id:"artistListForChoose",
			placeAt:"relArtistListForChoose",
			pageSize:10,
			index:"checkbox",
			layout:[{name:"姓名",field:"artistName"},
	                {name:"性别",field:"dictSex",format:function(obj){
	                	var sexCode = obj.row.dictSex;
	                	var sexName = "";
	                	if(sexCode != null){
                			var sexCodes = dict.sexCodes();
                			for(j=0;j<sexCodes.length;j++){
                				if(sexCode == sexCodes[j].dictCode){
                					sexName = sexCodes[j].dictName;
                				}
                			}
                		}
	                	return sexName;
	                }},
	                {name:"出生年份",field:"birthdayYear"}],
	        toolbar:[{name:"选择",class:"fa fa-plus-circle",callback:function(event){
	        	var selected = gridInstance.getSelectedRow();
	        	if(selected.length){
	        		var existOrNot = 0;
	        		for(i=0;i<selected.length;i++){
	        			for(j=0;j<$scope.activityInfo.actArtistList.length;j++){
	        				if(selected[i].artistId == $scope.activityInfo.actArtistList[j].artistId){
	        					existOrNot = 1;
	        				}
	        			}
	        		}
	        		if(existOrNot){
	        			util.alert('包含已存在关联艺术家！');
	        		}else{
	        			$scope.$apply(function(){
	        				for(i=0;i<selected.length;i++){
	        					tempArtist = {};
	        					tempArtist.artistId = selected[i].artistId;
	        					tempArtist.artistName = selected[i].artistName;
	        					tempArtist.artistAge = null;
	        					tempArtist.sex = null;
	        					if(selected[i].birthdayYear != null){
                        			var today = new Date();
                        			tempArtist.artistAge = today.getFullYear() - selected[i].birthdayYear;
                        		}
	        					if(selected[i].dictSex != null){
                        			var sexCodes = dict.sexCodes();
                        			for(j=0;j<sexCodes.length;j++){
                        				if(selected[i].dictSex == sexCodes[j].dictCode){
                        					tempArtist.sex = sexCodes[j].dictName;
                        				}
                        			}
                        		}
	        					$scope.activityInfo.actArtistList.push(tempArtist);
	        				}
	        			});
	        		}
	        	}else{
	        		util.alert('请选择艺术家！');
	        	}
	        }}],
	        data : {type : "URL",value : getServer() + "/artistInfo/page"}
		};
		gridInstance = grid.init(config);
	}
	
	
	
	return result;
});