/**
 * 系统业务共用处理js
 * 
 * @author gaodsh@css.com.cn
 */
define([ "jquery" ], function($) {
	
	/**
	 * 时间处理
	 */
	function handleDate(year, month, day) {
		if (year != null && month != null && day != null) {
			return year + "-" + month + "-" + day
		} else if (year != null && month != null && (day == null || day == "")) {
			return year + "-" + month
		} else {
			return "";
		}
	}
	
	return {
		handleDate:handleDate
	};
});
