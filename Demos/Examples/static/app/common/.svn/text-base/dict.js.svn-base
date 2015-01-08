/**
 * 共用代码处理js
 * 
 * @author gaodsh@css.com.cn
 */
define([ "jquery" ], function($) {
	function dictData(dictType) {
		var list = null;
		$.ajax({
			url : getServer() + "/dict/list?dictType=" + dictType,
			method : "POST",
			async : false,
			dataType : "json",
			success : function(d) {
				list = d.curPageData;
			}
		});
		return list;
	}

	function resourceType() {
		return dictData("D_RESOURCES_TYPE");
	}

	function sexCodes() {//性别
		return dictData("D_SEX");
	}
	function userTypeCodes() {//用户类型
		return dictData("D_USER_TYPE");
	}
	function nationCodes() {//民族
		return dictData("D_NATION");
	}
	function politicalCodes() {//政治面貌
		return dictData("D_POLITICAL");
	}
	function nationalityCodes() {//国籍
		return dictData("D_NATIONALITY");
	}
	function activityTypeCodes(){//活动类别
		return dictData("D_ACTIVITY_TYPE");
	}
	function xzPositionCodes() {//行政职务
		return dictData("D_XZPOSITION");
	}
	function wlPositionCodes() {//文联职务
		return dictData("D_WLPOSITION");
	}
	function xhPositionCodes() {//协会职务
		return dictData("D_XHPOSITION");
	}
	function jsPositionCodes() {//技术职务
		return dictData("D_JSPOSITION");
	}
	function jsPositionLevelCodes() {//技术职务级别
		return dictData("D_JSLEVEL");
	}
	function newsSortCodes() {//新闻类别
		return dictData("D_NEWS_SORT");
	}
	function newsTypeCodes() {//新闻类型
		return dictData("D_NEWS_TYPE");
	}

	return {
		// 系统管理-资源-资源类型
		resourceType : resourceType,
		// 性别
		sexCodes : sexCodes,
		//用户类别
		userTypeCodes : userTypeCodes,
		//民族
        nationCodes : nationCodes,
        //政治面貌
        politicalCodes : politicalCodes,
        //国籍
        nationalityCodes : nationalityCodes,
        //活动类别
        activityTypeCodes : activityTypeCodes,
        //行政职务
        xzPositionCodes : xzPositionCodes,
        //文联职务
        wlPositionCodes : wlPositionCodes,
        //协会职务
        xhPositionCodes : xhPositionCodes,
        //技术职务
        jsPositionCodes : jsPositionCodes,
        //技术职务级别
        jsPositionLevelCodes : jsPositionLevelCodes,
        //附件上传业务类型
        bizType:{opus:"10",activity:"20",picture:"30",voice:"40",video:"60",text:"70"},
        //新闻类别
	     newsSortCodes : newsSortCodes,
	    //新闻类型
	    newsTypeCodes : newsTypeCodes
	};
});
