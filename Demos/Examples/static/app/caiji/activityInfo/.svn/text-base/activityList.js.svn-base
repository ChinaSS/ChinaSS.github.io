/**
 * 提供activityInfo需要的相关联内容的查询功能
 */
define(["jquery"],function($){
	function queryArtist(artistId){//查询艺术家信息
		var artist = null;
		$.ajax({
			url : getServer()+"/artistInfo/query?artistId="+artistId,
			method : "POST",
			async : false,
			dataType : "json",
			success : function(d){
				artist = d.entity;
			}
		});
		return artist;
	}
	
	function queryOpus(opusId){//查询作品信息
		var opus = null;
		$.ajax({
			url : getServer() + "/caiji/opus/query?opusId="+opusId,
			method : "POST",
			async : false,
			dataType : "json",
			success : function(d){
				opus = d.entity;
			}
		});
		return opus;
	}
	
	function findFiles(fileIds){//查询上传文件资料信息
		var files = null;
		$.ajax({
			url : getServer() + "/activityInfo/file",
			method : "POST",
			async : false,
			data : "fileIds="+fileIds.join(','),
			dataType : "json",
			success : function(d){
				files = d.curPageData;
			}
		});
		return files;
	}
	
	return {
		queryArtist : queryArtist,
		queryOpus : queryOpus,
		findFiles : findFiles
	};
	
});