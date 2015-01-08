define(['Mustache', 'TemplateUtil', 'Config'], function (mustache, tUtil, config) {
	var plugin = {
			settings : {
				id : null,
				type : null,
				data : null
			},
			
			//footer初始化
			init : function (options) {
				var settings = $.extend(plugin.settings, options);
				var id = settings.id;
				var type = settings.type;
				var pluginFilePath = '/' + type + '/' + type;
				require(['css!' + config.BASE_PLUGIN + pluginFilePath + '.css'], function(){
					tUtil.initSideBar('#' + id + ' .plugin',  config.BASE_PLUGIN + pluginFilePath + '.html', plugin.setInitPage, [id, type]);
				});
			},

			//footer配置页面初始化
			setInitPage : function (id , type) {
				$("#setFriendlinkList").bind('click', function () {
					$.get( getPublishServer() + '/views/template/footerInputList.html' , function( list ) {
						var count = parseInt( $("#friendLinkNo").val() );
						$("#friendLinkNo").parent().append(plugin.renderInputList( list, count ) );
					});
				});
				
				$("#myplugin").bind('click', function () {      
						plugin.setPlugin( id );
				});
			},
			
			getData : function(){
				var data = {
						type : plugin.settings.type,
						content : null
				}
				
				var friendLinkNo = $('#friendLinkNo').val() ? $('#friendLinkNo').val() : friendLinkCount ;
				var pluginWidth = $("#" + plugin.settings.id).width() - 10;
				var view = {
						friendLinks : [],
						root: config.BASE_URL
				};
				
				view.width = pluginWidth;
				for( i = 0 ; i < friendLinkNo ; i++ ){
					var title = $('#setFriendLinkTitle' + (i + 1)).val();
					var link = $('#setFriendLinkLink' + (i + 1)).val();
					view.friendLinks.push({
						title : title,
						link : link
					});
				}
				
				data.content = view;
				return data;
			},
			
			// footer编辑页面初始化
			setEditPage : function( id, data ){
				var friendLinkCount = data.content.friendLinks.length;
				$.get( getPublishServer() + '/views/template/footerInputList.html' , function( list ) {
					$("#friendLinkList").append(plugin.renderInputList( list, friendLinkCount ));
					$.each( data.content.friendLinks , function( i , e ){
						$("#setFriendLinkTitle" + ( i + 1 )).val(e.title);
						$("#setFriendLinkLink" + ( i + 1 )).val(e.link);
					});
				});
				
				$("#myplugin").bind('click', function () {
					plugin.setPlugin( id , data );
				});
			},
			
			/*
			 * 渲染插件
			 * @param id 容器ID
			 * @param data 插件信息 格式：
			 *         data : {
			 *         		type: '',
			 *         		content: {}
			 *         }
			 */
			
			setPlugin : function ( id , data ) {
				if ( data ){  //如果传data，是修改状态
					var pluginInfo = data;
				} else{  //如果不传data，是新增
					var pluginInfo = plugin.getData.apply(this);
					//底层接口
					plugin.settings.afterRender.apply(this, [id , pluginInfo.type , pluginInfo.content]);
				}
				
				$.get( getPublishServer() + '/views/template/footer.html' , function( footer ){
					var output = mustache.render(footer, pluginInfo.content);
					$( '#' + id + ' .plugin').remove();
					$( '#' + id + ' .pluginBody').empty();
					$( '#' + id + ' .pluginBody').append(output);
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