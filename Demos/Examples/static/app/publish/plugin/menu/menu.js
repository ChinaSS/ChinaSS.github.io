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
			
			//页面数据封装
			getData : function(){
				var data = {
						type : plugin.settings.type,
						content : null
				}
				var menuNo = $('#menuNo').val() ? $('#menuNo').val() : menusCount ;
				//var pluginWidth = $("#" + plugin.settings.id).width() - 10;
				var view = {
						menus : [],
						root: config.BASE_URL
				};
				//view.width = pluginWidth;
				for( i = 0 ; i < menuNo ; i++ ){
					var title = $('#setMenuTitle' + (i + 1)).val();
					var link = $('#setMenuLink' + (i + 1)).val();
					view.menus.push({
						title : title,
						link : link
					});
				}
				
				data.content = view;
				return data;
			},
			
			// 插件配置页面初始化
			setInitPage : function (id , type) {
				$("#setMenuList").bind('click', function () {
					$.get( getPublishServer() + '/views/template/menusInputList.html' , function( list ) {
						var menusCount = parseInt( $("#menuNo").val() );
						$("#menuNo").parent().append(plugin.renderInputList( list, menusCount ) );
					});
				});
				$("#myplugin").bind('click', function () {      
					require(['css!' + getPublishServer() + '/plugin/menu/menu.css'], function(){
						plugin.setPlugin( id );
					});
				});
			},
			
			// 插件编辑页面初始化
			setEditPage : function( id, data ){
					var menusCount = data.content.menus.length;
					$.get( getPublishServer() + '/views/template/menusInputList.html' , function( list ) {
						$("#menuList").append(plugin.renderInputList( list, menusCount ));
						$.each( data.content.menus , function( i , e ){
							$("#setMenuTitle" + ( i + 1 )).val(e.title);
							$("#setMenuLink" + ( i + 1 )).val(e.link);
						});
					});
					$("#myplugin").bind('click', function () {
						plugin.setPlugin( id , data);
					});
			},
			// 渲染插件
			setPlugin : function ( id , data) {
				if ( data ){  //如果传data，是修改状态
					var pluginInfo = data;
				} else{  //如果不传data，是新增
					var pluginInfo = plugin.getData.apply(this);
					//底层接口
					plugin.settings.afterRender.apply(this, [id , pluginInfo.type , pluginInfo.content]);
				}	
				$.get( getPublishServer() + '/views/template/menu.html' , function( menu ){
					var output = mustache.render(menu, pluginInfo.content);
					$( '#' + id + ' .plugin').remove();
					$( '#' + id + ' .pluginBody').empty();
					$( '#' + id + ' .pluginBody').append(output);
					
					//样式控制
					/*var $oDivWidth = $(".navMenu").width();
				    var $liNum = $(".navMenu>ul").find("li").length;
				    var chaNum = 0;
				    var paddingWidth;
				    var $aLia = $(".navMenu>ul li>a");
				    for (var i = 0; i < $aLia.length; i++) {
				        chaNum += $(".navMenu ul li a")[i].innerText.length;
				    }
				    paddingWidth = ($oDivWidth - chaNum * 16) / ($liNum * 2) - 5;
				    $(".navMenu ul li a").css({"padding-left": paddingWidth + "px", "padding-right": paddingWidth + "px"});*/
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