/**
 * 选择艺术家
 * @author gaodsh@css.com.cn
 */
 define(["UtilDir/util","UtilDir/grid","UtilDir/dialog"],function(util,grid,dialog){
    //数据列表
    var chooseArtistList = function($scope){
        var config = {
            id:"chooseArtistList",
            placeAt:"chooseArtistListId",            
            pageSize:10,                         
            index:"checkbox",                   
            layout:[
                {name:"姓名",field:"artistName"},
                {name:"性别",field:"dictSex"},
                {name:"出生日期",field:"birthday"}
            ],
            data : {type : "URL",value : getServer() + "/artistInfo/page"},
            formData:{
            	artistName : $scope.opus.artist.artistName
            }
        };
        grid.init(config);
    };
    
	var showArtistPanel = function ($scope){
		chooseArtistList($scope);
		util.slidebar({
		    id:"artistChoosePanel",
			width:"500px"
		});
	}    
	
	var onChoose = function($scope){
		var rows = grid.getGrid("chooseArtistList").getSelectedRow();
		var choosed = [];
		if (rows.length > 0) {
			for(var i = 0 ; i < rows.length; i++){
				if(!isExist($scope,rows[i].artistId)){
					$scope.opus.artist.list.push({id:{artistId:rows[i].artistId,opusId:$scope.opus.entity.opusId},artistName:rows[i].artistName})
				}
			}
		}
	}
	
	function isExist($scope,id){
		var list = $scope.opus.artist.list;
		for(var i=0 ;i< list.length ;i++){
			if(id==list[i].id.artistId){
				return true;
			}
		}
		return false;
	}
	
	var onClose = function(){
		
	}
	
	//删除
	var onDelete = function($scope,index){
		var del = $scope.opus.artist.list[index];
		console.log(del);
		if(del.old){
			$scope.opus.artist.delList.push({id:{artistId:del.id.artistId,opusId:$scope.opus.entity.opusId}});
		}
		$scope.opus.artist.list.splice(index,1);
	}
	

    
    return {
    	showArtistPanel : showArtistPanel,
    	onChoose : onChoose,
    	onDelete : onDelete
    };
    
    
});