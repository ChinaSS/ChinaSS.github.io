/**
 * Created by liangjing on 2014/12/8.
 */
define(['Mustache', 'TemplateUtil'], function (mustache, tUtil) {
	var plugin = {
			settings : {
				id: '',
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
				$("#setVideoList").bind('click', function () {
					$.get( getPublishServer() + '/views/template/videoInputList.html' , function( list ) {
						var videoCount = parseInt( $("#videoNo").val() );
						$("#videoNo").parent().append(plugin.renderInputList( list, videoCount ) );
					});
				});
				$("#myplugin").bind('click', function () {      
					require(['css!' + getPublishServer() + '/plugin/video/video.css'], function(){
						plugin.setPlugin( id );
					});
				});
			},
			getData : function(){
				var newsStyle=$('input[name="videoType"]:checked').val();
				var data = {
						type : plugin.settings.type,
						content : null
				}
				var viewNo = $('#videoNo').val() ? $('#videoNo').val():videoCount ;
				var pluginWidth = $("#" + plugin.settings.id).width() - 10;
				var view = {
						videos : [],
						newsType:newsStyle,
						root: config.BASE_URL
				};
				view.width = pluginWidth;
				for( i = 0 ; i < viewNo ; i++ ){
					var link = $('#setVideoLink').val();
					var des = $('#setVideoWords').val();
					view.videos.push({
						link : link,
						des : des
					});
				}
				data.content = view;
				return data;
			},
			// 插件编辑页面初始化
			setEditPage : function( id, data ){
//					alert('待开发,想要修改新闻列表请重新添加');
					var videoCount = data.content.views.length;
					$.get( getPublishServer() + '/views/template/videoInputList.html' , function( list ) {
						$("#videoList").append(plugin.renderInputList( list, videoCount ));
						$.each( data.content.views , function( i , e ){
							$("#setVideoLink" ).val(e.link);
							$("#setVideoWords").val(e.des);
						});
					});
					$("#myplugin").bind('click', function () {						
						plugin.setPlugin( id , data);		
					});
			},
			// 渲染插件
			setPlugin : function ( id , data) {//type,videoCount 
				if ( data ){  //如果传data，是修改状态
					var pluginInfo = data;
				} else{  //如果不传data，是新增
					var pluginInfo = plugin.getData.apply(this);
					//底层接口
					plugin.settings.afterRender.apply(this, [id , pluginInfo.type , pluginInfo.content]);
				}
				$.get( getPublishServer() + '/views/template/video.html' , function( video ){
					var output = mustache.render(video, pluginInfo.content);
					$('#' + id  + ' .plugin').remove();
					$('#' + id  + ' .pluginBody').empty();
					$('#' + id  + ' .pluginBody').append(output);
					if(pluginInfo.content.newsType=="newsVideo"){
						$(".opusView").hide();
					    $(".newsViews").show();
					}else{
						$(".opusView").show();
					    $(".newsViews").hide();
					}
					//样式控制
//					alert(container+":"+$(container).width());
					$(".newsViews ,.opusView").css({ "position":" relative"," width": $('#' + id ).width()," height": $('#' + id ).height(),"overflow":"hidden" });
				    $("marquee").attr("behavior", "scroll");
				    $("marquee").attr("direction", "left");
				    $("marquee").attr("scrollamount", "2");
				    
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

