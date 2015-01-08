
/**
 * 共用js代码，查询并处理dicttree，返回inputSelect组件需要的data格式
 * @author huqs@css.com.cn
 */
define([ "jquery"], function($) {
	/**
	 * 返回数据属性:id 代码值,name 名称,data 子节点数组
	 * 适用于csInput中树形数据
	 */
	function dictData(dictType) {//根据dictType查询树(ZTree格式) 
		var list = null;
		$.ajax({
			url : getServer() + "/dictTree/queryByType?dictType=" + dictType,
			method : "POST",
			async : false,
			dataType : "json",
			success : function(d) {
				list = d.curPageData;
			}
		});
		return list;
	}
	function queryTreeListData(dictType) {//根据type查询树的列表
		var list = null;
		$.ajax({
			url : getServer() + "/dictTree/typeTree?dictType=" + dictType,
			method : "POST",
			async : false,
			dataType : "json",
			success : function(d) {
				list = d.curPageData;
			}
		});
		return list;
	}
	function queryTreeList(pCode,dictType) {//根据dictType、pCode查询树的某一级列表(即树中某个节点的一级子节点列表)
		var list = null;
		$.ajax({
			url : getServer() + "/dictTree/tree?id=" + pCode + "&dictType=" + dictType,
			method : "POST",
			async : false,
			dataType : "json",
			success : function(d) {
				list = d;
			}
		});
		return list;
	}
	
	function queryTreeEntity(dictType,dictCode){//查询单个dictTree对象
		var treeEntity = null;
		$.ajax({
			url : getServer()+"/dictTree/queryByCode?dictType="+dictType+"&dictCode="+dictCode,
			method : "POST",
			async : false,
			dataType : "json",
			success : function(d){
				treeEntity = d.entity;
			}
		});
		return treeEntity;
	}
	
	function bizTypeCodes(){
		return dictData("D_BUSINESS_TYPE");//业务类型zTree数据
	}
	function bizTypeCodesForLoop(){
		return queryTreeListData("D_BUSINESS_TYPE");
	}	
	function regionTree(){
		return dictData("D_REGION");
	}
	
	function regionCodes(){//查询地区列表
		return queryTreeListData("D_REGION");  
	}
	function artTypeList(){//查询12大艺术类别
		return queryTreeList("D_ART_TYPE","D_ART_TYPE");
	}
	function regionEntity(dictCode){//按dictCode查询出一个地区的对象
		return queryTreeEntity("D_REGION",dictCode);
	}
	function educationCodes(){//学历
		return dictData("D_EDUCATION");
	}
	function degreeCodes(){//学位
		return dictData("D_DEGREE");
	}
	function awardsCodes(){//奖项
		return dictData("D_AWARDS_TYPE");
	}
	function artTypeCodes(){//艺术类别
		return dictData("D_ART_TYPE");
	}
	
	function opusPositionCodes(){//作品职务
		return dictData("D_OPUS_POSITION");
	}
	

	return {
        regionCodes : regionCodes,//地区
        artTypeList : artTypeList,//12大艺术门类
        regionEntity : regionEntity,
        bizTypeCodes : bizTypeCodes,
        regionTree : regionTree,
        queryUrl:{
        	region : getServer() + '/dictTree/queryByType?dictType=D_REGION',
			orgType : getServer()+ '/dictTree/queryByType?dictType=D_ORG_TYPE',
			businessType : getServer() + "/dictTree/queryByType?dictType=D_BUSINESS_TYPE"
        },
         bizTypeCodesForLoop : bizTypeCodesForLoop,
         educationCodes : educationCodes, //学历
         degreeCodes : degreeCodes, //学位
         opusPositionCodes : opusPositionCodes, //艺术家在作品中的职务
         awardsCodes : awardsCodes, //奖项
         artTypeCodes : artTypeCodes //艺术类别
   };
});
