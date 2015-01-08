/**
 * Created by liangjing on 2014/11/17.
 */
//tab页面内容

//iframe和普通方式共用函数
function tabContent(selector, url) {
    $(selector).css({"border-bottom": "0px", "border-top": "2px solid red", "border-left": "1px solid #999", "border-right": "1px solid #999"});
    $(selector).prevAll().css({"border-bottom": "1px solid #999", "border-top": "1px solid #999", "border-left": "0px", "border-right": "0px"});
    $(selector).nextAll().css({"border-bottom": "1px solid #999", "border-top": "1px solid #999", "border-left": "0px", "border-right": "0px"});
    var firstLi = $(".tabIndex  li:first").val();
    if ($(selector).index() < 1) {
        $(selector).css({"border-left": "0px"});
    } else {
        $(".tabIndex  li:first,.tabPlain  li:first").css({"border-left": "1px solid #999"});
    }
    $(".tabIndex  li:last,.tabPlain  li:last").css({"border-right": "1px solid #999"});
    if(url!=null){
        $("#content").attr("src", url);
    }
}
//普通方式tab函数
function tabPlain(selector) {
//        this.firstChild.hash--获取路径，控制显示
    $(selector+" ul>li").mouseover(function () {
        //tab样式
        plugin.tabContent(this,null);
        //内容隐藏显示
        $(this.firstChild.hash).css({"display":"block"});
        $(this.firstChild.hash).prevAll().css({"display":"none"});
        $(this.firstChild.hash).nextAll().css({"display":"none"});
    });
}
define(['Mustache', 'TemplateUtil'], function (mustache, tUtil) {
	var plugin = {
			settings : {
				id : null,
				type : null,
				data : null
			},
			init : function (options) {
				var settings = $.extend(plugin.settings, options);
				var id = settings.id;
				var type = settings.type;
				tUtil.initSideBar('#' + id + ' .plugin',  getPublishServer() + '/plugin/' + type + '/' + type + '.html', plugin.setInitPage, [id, type]);
			},

			// 插件配置页面初始化
			setInitPage : function (id , type) {
				$("#setTabList").bind('click', function () {
					$.get( getPublishServer() + '/views/template/tabInputList.html' , function( list ) {
						var count = parseInt( $("#tabNo").val() );
						$("#tabNo").parent().append(plugin.renderInputList( list, count ) );
					});
				});
				$("#myplugin").bind('click', function () {      
					require(['css!' + getPublishServer() + '/plugin/tab/tab.css'], function(){
						plugin.setPlugin( id );
					});
				});
			},
			//封装页面数据
			getData : function(){
				var data = {
						type : plugin.settings.type,
						content : null
				}
				var contentStyle=$('input[name="tabType"]:checked').val();
				var tabNo = $('#tabNo').val() ? $('#tabNo').val() : tabsCount ;
				var pluginWidth = $("#" + plugin.settings.id).width() - 10;
				
				var view = {
						tabs : [],
						tabType:contentStyle,
						root: config.BASE_URL
				};
				
				view.width = pluginWidth;
				for( i = 0 ; i < tabNo ; i++ ){
					var title = $('#setTabTitle' + (i + 1)).val();
					var des = $('#setTabWords' + (i + 1)).val();
					view.tabs.push({
						title : title,
						des: des,
						index:i+1
					});
				}
				data.content = view;
				return data;
			},
			// 插件编辑页面初始化
			setEditPage : function( id, data ){
//					alert('待开发,想要修改新闻列表请重新添加');
					var tabsCount = data.content.tabs.length;
					$.get( getPublishServer() + '/views/template/tabInputList.html' , function( list ) {
						$("#tabList").append(plugin.renderInputList( list, tabsCount ));
						$.each( data.content.tabs , function( i , e ){
							$("#setTabTitle" + ( i + 1 )).val(e.title);
							$("#setTabWords" + ( i + 1 )).val(e.des);
						});
					});
					$("#myplugin").bind('click', function () {
						plugin.setPlugin( id , data);
					});
			},
			// 渲染插件
			setPlugin : function ( id ,data ) {
				if ( data ){  //如果传data，是修改状态
					var pluginInfo = data;
				} else{  //如果不传data，是新增
					var pluginInfo = plugin.getData.apply(this);
					//底层接口
					plugin.settings.afterRender.apply(this, [id , pluginInfo.type , pluginInfo.content]);
				}				
				$.get( getPublishServer() + '/views/template/tab.html' , function( tab ){
					
					var output = mustache.render(tab, pluginInfo.content);
					$( '#' + id + ' .plugin').remove();
					$( '#' + id + ' .pluginBody').empty();
					$( '#' + id + ' .pluginBody').append(output);
					//选择方式
					if(pluginInfo.content.tabType=="linkType"){
						$(".tabIndex").show();
						$(".tabPlain").hide();
//						alert($(container + ' .pluginBody').height());
						$(".tabIndex").css({"width":$( '#' + id + ' .pluginBody').width(),"height":"100%","overflow":"hidden"});
						$(".tabContent iframe").attr("src",pluginInfo.content.tabs[0].des);
						}else if(pluginInfo.content.tabType=="manualType"){
						$(".tabIndex").hide();
						$(".tabContent").hide();
						$(".tabPlain").show();
						tabPlain("#tabPlain");
					}else{
						alert("请选择方式");
					}
					//样式控制
					$(".tabIndex  li:first,.tabPlain li:first").css({"border-bottom": "0px", "border-top": "2px solid red"});
			        $(".tabIndex  li:last,.tabPlain li:last").css({"border-right": "1px solid #999", "border-left": "1px solid #999"});
				});
			},
			renderInputList : function( template , menus) {
				var view = {
					group : []
				};
				for (var i = 0; i < menus; i++) {
					view.group.push({
						index: i + 1
					});
				}
				var output = mustache.render( template , view );
				return output;
			}
	}
	return plugin;
});
$(document).ready(
	    function () {
	        $(".tabIndex  li:first,.tabPlain li:first").css({"border-bottom": "0px", "border-top": "2px solid red"});
	        $(".tabIndex  li:last,.tabPlain li:last").css({"border-right": "1px solid #999", "border-left": "1px solid #999"});
	    }
	);