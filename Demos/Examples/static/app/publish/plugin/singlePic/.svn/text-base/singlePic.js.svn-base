/*
	单张图片插件

 */
define(['Mustache','TemplateUtil','SelectImg', 'Config'], function (mustache, tUtil, SelectImg, config) {
	var plugin = {
		//设置默认选项 备用
		settings : {
			id : null,
			type : null,
			data : null
		},

		//单张图片初始化
		init : function (options) {
			var settings = $.extend(plugin.settings, options);
			var id = settings.id;
			var type = settings.type;
			require(['css!' + getPublishServer() + '/plugin/singlePic/singlePic.css'], function(){
				tUtil.initSideBar('#' + id + ' .plugin',  getPublishServer() + '/plugin/' + type + '/' + type + '.html', plugin.setInitPage, [id, type]);
			});
		},
		
		getData : function( id ,  type ){
			var p_id = plugin.settings.id ? plugin.settings.id : id;
			var p_type = plugin.settings.type ? plugin.settings.type : type;
			
			var data = {
					type : p_type,
					content : null
			}
			
			var view = {
					root: config.BASE_URL
			};
			
			//模板引擎
			view.width = $("#spWidth").val();
			view.height = $("#spHeight").val();
			view.imgUrl = $("#spImgUrl").val();
			view.link = $("#spLink").val();

			data.content = view;
			return data;
		},

		//footer配置页面初始化
		setInitPage : function( id , type ) {		
			var container = "#" + id;
			$('input[name="imgUrl"]').bind('click', function(){
				if($('input[name="imgUrl"]').filter(':checked').val()=="netImg"){
				}else{
					SelectImg.selectImgs("radio","#spImgUrl");
				}
			});
			
			$("#myplugin").bind('click', function () {
				require(['css!' + getPublishServer() + '/plugin/singlePic/singlePic.css'], function(){
					plugin.setPlugin( id );
				});
			});
		},

		// 插件编辑页面初始化
		setEditPage : function( id, data ){
			$("#spWidth").val( data.content.width );
			$("#spHeight").val( data.content.height );
			$("#spImgUrl").val( data.content.imgUrl);
			$("#spLink").val( data.content.link );

			$("#myplugin").bind('click', function () {
				plugin.setPlugin( id , 'edit' , data.type );
			});
		},

		setPlugin : function( id , status, type ) {
			//如果有data 直接从数据渲染插件
			if( status == 'edit' ){
				var pluginInfo = plugin.getData.apply(this, [ id , type]);
				require(['Layout'], function( layout ) {
					layout.setPlugin( id, pluginInfo.type, pluginInfo.content )
				});
			} 
			//没有data，从用户输入取数据，然后渲染插件
			else {
				var pluginInfo = plugin.getData.apply(this);
				//底层接口
				plugin.settings.afterRender.apply( this, [id, pluginInfo.type, pluginInfo.content]);
			}
			
			$.get( getPublishServer() + '/views/template/singlePic.html', function( singlePic ){
				var output = mustache.render( singlePic , pluginInfo.content );
				$( '#' + id + ' .plugin').remove();
				$( '#' + id + ' .pluginBody').empty();
				$( '#' + id + ' .pluginBody').append(output);
			});
		}
	};

	return plugin;
});