/*
	滚动横幅

 */
define(['Mustache', 'TemplateUtil','SliderJquery','SelectImg', 'Config'], function (mustache, tUtil,SliderJquery,selectImg, config) {
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
				var imgNo = $('#imgNo').val() ? $('#imgNo').val() : imgsCount ;
				var pluginWidth = $("#" + plugin.settings.id).width() - 10;
				var view = {
						imgs : [],
						root: config.BASE_URL
				};
				view.width = pluginWidth;
				for( i = 0 ; i < imgNo ; i++ ){
					var url = $('#setImgPath' + (i + 1)).val();
					var link = $('#setImgLink' + (i + 1)).val();
					view.imgs.push({
						url : url,
						link : link
					});
				}
				data.content = view;
				return data;
			},
			
			// 插件配置页面初始化
			setInitPage : function (id , type) {
				//图片来源
				var container = "#" + id;
				$(".imgSource").hide();
				$('input[name="imgUrl"]').bind('click', function(){
							if($('input[name="imgUrl"]').filter(':checked').val()=="netImg"){
							}else{
						//从素材库中选择图片
								selectImg.selectImgs("checkBox","#setImgPath");
							}
						});
				//图片地址等详细信息
				$("#setImgList").bind('click', function () {
					$(".imgSource").show();
					$.get( getPublishServer() + '/views/template/sliderInputList.html' , function( list ) {
						var imgsCount = parseInt( $("#imgNo").val() );
						$("#imgNo").parent().append(plugin.renderInputList( list, imgsCount ));
					});
				});
				$("#myplugin").bind('click', function () {      
					require(['css!' + getPublishServer() + '/plugin/slider/slider.css'], function(){
						plugin.setPlugin( id );
					});
				});
			},
			// 插件编辑页面初始化
			setEditPage : function( id, data ){
//					alert('待开发,想要修改新闻列表请重新添加');
					var imgsCount = data.content.imgs.length;
					$.get( getPublishServer() + '/views/template/sliderInputList.html' , function( list ) {
						$("#imgList").append(plugin.renderInputList( list, imgsCount ));
						$.each( data.content.imgs , function( i , e ){
							$("#setImgPath" + ( i + 1 )).val(e.url);
							$("#setImgLink" + ( i + 1 )).val(e.link);
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
				$.get( config.URL_PLUGIN_SLIDER , function( slider ){
					var output = mustache.render(slider, pluginInfo.content);
					$( '#' + id + ' .plugin').remove();
					$( '#' + id + ' .pluginBody').empty();
					$( '#' + id + ' .pluginBody').append(output);
					var imgNo = $('#imgNo').val() ? $('#imgNo').val() : $( '#' + id + ' .pluginBody ul li img').length ;

					var img = new Image(); //创建一个Image对象，实现图片的预下载
	                img.src = $( '#' + id + ' .pluginBody  div ul li img:first').prop("src");
	                img.onload = function () { //图片下载完毕时异步调用callback函数。
	                	$(" .slider").setImgMove(
						        {
						            effect : 'rolling',
						            picNo : imgNo,
						            speed : '2'
						        });	   
	                }
     				});
			},
			renderInputList : function( template , imgs) {
				var view = {
					group : []
				};

				for (var i = 0; i < imgs; i++) {
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