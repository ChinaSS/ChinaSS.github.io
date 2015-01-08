/**
 * 树形字典管理
 * @author gaodsh@css.com.cn
 */
 define(["UtilDir/util","UtilDir/grid",'CommonDir/utils'],function(util,grid,utils){
    //数据列表
    var opusListInit = function($scope){
        var config = {
            id:"opusList",
            placeAt:"opusListId",            //存放Grid的容器ID
            pageSize:10,                         //一页多少条数据
            index:"checkbox",                   //首列为单选[radio]还是多选[checkbox],默认checkbox
            layout:[
                {name:"作品名称",field:"opusName",click:function(e){modifyOpus($scope,e.data.row.opusId);}},
                {name:"主题",field:"topic"},
                {name:"出处",field:"masterParticipants"},
                {name:"创作时间",format:function(data){
                	return utils.handleDate(data.row.creationYear,data.row.creationMonth,data.row.creationDay);
                }},
                {name:"发表时间",format:function(data){
                	return utils.handleDate(data.row.issuanceYear,data.row.issuanceMonth,data.row.issuanceDay);
                }}
            ],
            toolbar:[
                {name:"添加",class:"fa fa-plus-circle",callback:function(event){addOpus($scope);}},
                {name:"删除",class:"fa fa-trash-o",callback:delOpus}
            ],
            data : {type : "URL",value : getServer() + "/caiji/opus/page"},
            formData:{
            	opusName : $scope.opus.query.dto.opusName,
            	opusType : $scope.opus.query.dto.opusType
            }
        };
        grid.init(config);
    };
    
    //判断是否是修改
    function isModify($scope){
    	if($scope.opus.entity.opusId){
    		return true;
    	}
    	return false;
    }
    
    //添加
    function addOpus($scope){
		//清空资源数据
        $scope.$apply(function () {
        	$scope.opus.entity = {};
        	$scope.opus.artist.list = [];
        	$scope.opus.artist.delList = [];
        	$scope.upload.data = [];
        	$scope.upload.delList = [];
        });
        showSlidebar($scope);
    }
    
    //修改
    function modifyOpus($scope,opusId){
    	queryOpus(opusId,$scope);
    	queryOpusTypeTree($scope,opusId);
    	queryArtistInit($scope,opusId);
    	queryOpusFileInit($scope,opusId);
    	showSlidebar($scope);
    }
    
    //删除
    function delOpus(){
    	var selected = grid.getGrid("opusList").getSelectedRow();
        if(selected.length){
        	util.confirm("确定要删除选择的数据吗?",function(){
        		var opusIds = [];
                for(var i= 0,item;item=selected[i++];){
                    opusIds.push(item.opusId);
                }
	            $.ajax({
	                url:getServer()+"/caiji/opus/remove",
	                type:"POST",
	                data: "opusIds="+ opusIds.join(","),
	                dataType:"json",
	                success:function(data){
	                    if(data.status=="200"){
	                        //表格刷新
	                        grid.getGrid("opusList").refresh();
	                        util.alert("删除成功.");
	                    }else{
	                    	util.alert("删除失败.");
	                    }
	                }
	            });
        	});
        }else{
            util.alert("请选择要删除的数据.");
        }
    }
    
    //数据验证
    var validate = function(){
    	 $("#opusFormId").validate({
            rules:{
                creationDay:{ymdDate:["#creationYear","#creationMonth"]}
            },
            messages: {
            }
        });
        return $("#opusFormId").valid();
    };
    var showSlidebar = function($scope){
        //弹出侧边栏
        util.slidebar({
            id:"opusEditPanel",
            width:"800px",
            afterLoad:function(){
				queryOpusPosition($scope);
            }
        });
    };
    
    //保存后台
    var save = function($scope){
    	if(validate()){
            //验证通过，保存数据
    		var data ={
	    		entity:$scope.opus.entity,
	    		addEntities:queryOpusTypeAddData($scope),
	    		delEntities:queryOpusTypeDelData($scope),
	    		addOrUpdateArtists:$scope.opus.artist.list,
	    		delArtists:$scope.opus.artist.delList,
	    		files:getAddFileData($scope),
	    		delFiles : getDelFileData($scope)
    		};
            $.ajax({
                url:getServer()+"/caiji/opus/save",
                type:"POST",
                data: JSON.stringify(data),
                dataType:"json",
                contentType: 'application/json', 
                success:function(data){
                    if(data.status == "200"){
                        //表格数据
                        grid.getGrid("opusList").refresh();
                        util.alert("保存成功.");
                    }
                }
            });
        }
    }
    //查询作品对象
    function queryOpus(opusId,$scope){
    	$.ajax({
            url:getServer()+"/caiji/opus/query?opusId=" + opusId,
            type:'POST',
            dataType:"json",
            success:function(data){
                //设置资源数据
            	if("200" == data.status){
            		$scope.$apply(function () {
                    	$scope.opus.entity = data.entity;
                    	$scope.upload.searchURL = getServer() +"/caiji/opus/file?opusId=" + data.entity.opusId
                	});
            	}
            }
        });
    }    
    
    //查询作品类型树
  function queryOpusTypeTree($scope,opusId){
	$.ajax({
        url:getServer()+"/caiji/opus/type?opusId=" + opusId,
        type:'POST',
        dataType:"json",
        success:function(data){
            //设置资源数据
        	if("200" == data.status){
        		$scope.$apply(function () {
                	$scope.opus.typeTree.list = data.curPageData;
            	});
        	}
        }
    });  	
  }
  
    /**
	 * 查询新勾选的节点
	 */
	function queryOpusTypeAddData($scope) {
		var tree = $.fn.zTree.getZTreeObj($scope.opus.typeTree.id)
		var nodes = tree.getChangeCheckedNodes();
		var add = [];
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			if (!node.checkedOld) {
				add.push({id:{opusId:$scope.opus.entity.opusId,dictOpusType:node.id}});
			}
		}
		return add;
	}
  
   /**
	 * 查询初始数据被勾选掉的数据
	 */
	function queryOpusTypeDelData($scope) {
		var tree = $.fn.zTree.getZTreeObj($scope.opus.typeTree.id)
		var nodes = tree.getChangeCheckedNodes();
		var del = [];
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			if (node.checkedOld) {
				del.push({id:{opusId:$scope.opus.entity.opusId,dictOpusType:node.id}});
			}
		}
		return del;
	}
	
	
	/**
	 * 查询当前作品的参与人员
	 */
	function queryArtistInit ($scope,opusId){
		$.ajax({
	        url: getServer() + "/caiji/opus/artist?opusId=" + opusId,
	        type:'POST',
	        dataType:"json",
	        success:function(data){
	            //设置资源数据
	        	if("200" == data.status){
	        		$scope.$apply(function () {
	                	$scope.opus.artist.list = data.curPageData;
	            	});
	        	}
	        }
	    });  	
	}
	
	/**
	 * 获取上传文件数据
	 */
	function getAddFileData($scope){
		var ids = $scope.upload.addFileId;
		var add = [];
		if(ids){
			for (var i = 0; i < ids.length; i++) {
				add.push({id:{opusId:$scope.opus.entity.opusId,fileId:ids[i]}});	
			}
		}
		return add;
	}
	/**
	 * 获取删除文件数据
	 */
	function getDelFileData($scope){
		var delList = $scope.upload.delFileId;
		var del = [];
		if(delList){
			for (var i = 0; i < delList.length; i++) {
				del.push({id:{opusId:$scope.opus.entity.opusId,fileId:delList[i]}});
			}	
		}
		return del;
	}
	
	/**
	 * 查询当前作品的作品
	 */
	function queryOpusFileInit ($scope,opusId){
		$.ajax({
	        url: getServer() + "/caiji/opus/file?opusId=" + opusId,
	        type:'POST',
	        dataType:"json",
	        success:function(data){
	            //设置资源数据
	        	if("200" == data.status){
	        		$scope.$apply(function () {
	                	$scope.upload.data = data.curPageData;
	            	});
	        	}
	        }
	    });  	
	}	
	/**
	 * POSITION
	 */
	function queryOpusPosition($scope){
		$.ajax({
	        url: getServer() + '/dictTree/queryByType?dictType=D_OPUS_POSITION',
	        type:'POST',
	        dataType:"json",
	        success:function(data){
				//设置资源数据
	        	if("200" == data.status){
	        		$scope.$apply(function () {
	                	$scope.opus.csInputConfig.data = data.curPageData;
	            	});
	        	}	        	
	        }
	    });  
	}

	

    return {
        opusListInit:opusListInit,
        isModify:isModify,
        save:save
    };
});