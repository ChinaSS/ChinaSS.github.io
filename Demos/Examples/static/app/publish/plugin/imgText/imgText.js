/**
 * Created by rkg on 2014/11/17.
 */
define(['Mustache', 'TemplateUtil','SelectImg'], function (mustache, tUtil,selectImg) {
	var plugin = {
		settings : {
			id: ''
		},

		init : function (options) {
			var settings = $.extend(plugin.settings, options);
			var id = settings.id;
			var type = settings.type;
			tUtil.initSideBar('#' + id + ' .plugin',  getPublishServer() + '/plugin/' + type + '/' + type + '.html', plugin.setInitPage, [id, type]);
		},

		// 插件配置页面初始化
		setInitPage : function ( id , type ) {
			$('input[name="imgUrl"]').bind('click', function(){
				if($('input[name="imgUrl"]').filter(':checked').val()=="netImg"){
					
				}else{
					alert("从素材库中选择图片");
					selectImg.selectImgs("radio","#picUrl");
				}
			});
			$("#setNewList").bind('click', function () {
				$.get( getPublishServer() + '/views/template/newsInputList.html' , function( list ) {
					var count = parseInt( $("#newNo").val() );
					$("#newNo").parent().append(plugin.renderInputList( list, count ) );
				});
			});

			$("#myplugin").bind('click', function () {
				require(['css!' + getPublishServer() + '/plugin/imgText/imgText.css'], function(){
					plugin.setPlugin( id , type );
				});
			});
		},

		// 插件编辑页面初始化
		setEditPage : function( id, data ){
			var newsCount = data.content.news.length;
			$.get( getPublishServer() + '/views/template/newsInputList.html' , function( list ) {
				$("#newList").append(plugin.renderInputList( list, newsCount ));

				$.each( data.content.news , function( i , e ){
					$("#setNewsTitle" + ( i + 1 )).val(e.title);
					$("#setNewsLink" + ( i + 1 )).val(e.newsLink);
				});

				$("#picUrl").val( data.content.imgUrl );
				$("#picLink").val( data.content.imgLink );
				$("#picPercent").val( data.content.imgPercent );
			});

			$("#myplugin").bind('click', function () {
				plugin.setPlugin( id , data.type , newsCount );
			});
		},

		// 渲染插件
		setPlugin : function ( id , type , newsCount ) {
			var newsNo = $('#newNo').val() ? $('#newNo').val() : newsCount ;
			var container = "#" + plugin.settings.id;
			var pluginWidth = $(container).width() - 10;
			var pluginHeight = $(container).height() - 10;
			var view = {
				news : []
			};

			$.get( getPublishServer() + '/views/template/imgText.html' , function( imgtext ){
				view.width = pluginWidth;
				view.imgUrl = $("#picUrl").val();
				view.imgLink = $("#picLink").val();
				view.imgHeight = pluginHeight * ( $("#picPercent").val() ) / 100;
				view.imgPercent = $("#picPercent").val();

				for( i = 0 ; i < newsNo ; i++ ){
					var title = $('#setNewsTitle' + (i + 1)).val();
					var link = $('#setNewsLink' + (i + 1)).val();
					view.news.push({
						title : title,
						newsLink : link
					});
				}

				var output = mustache.render(imgtext, view);

				$(container + ' .plugin').remove();
				$(container + ' .pluginBody').empty();
				$(container + ' .pluginBody').append(output);

				plugin.settings.afterRender.apply(this, [id , type , view]);
			});
		},

		renderInputList : function( template , news) {
			var view = {
				group : []
			};

			for (var i = 0; i < news; i++) {
				view.group.push({
					index: i + 1
				});
			}

			var output = mustache.render( template , view );
			return output;
		}
	};

	return plugin;
});