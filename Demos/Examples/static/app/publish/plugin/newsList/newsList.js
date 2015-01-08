define(['Mustache', 'TemplateUtil', 'Config'], function (mustache, tUtil, config) {
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
				var pluginFilePath = '/' + type + '/' + type;
				require(['css!' + config.BASE_PLUGIN + pluginFilePath + '.css'], function(){
					tUtil.initSideBar('#' + id + ' .plugin',  config.BASE_PLUGIN + pluginFilePath + '.html', plugin.setInitPage, [id, type]);
				});
			},
			
			// 插件配置页面初始化
			setInitPage : function (id , type) {
				//新闻来源
				var container = "#" + id;
				$('.p-nl-manual').bind('click', function(){
					clear();
					renderM();
				});
				
				$('.p-nl-auto').bind('click', function(){
					clear();
					renderA();
				});
				
				function renderA(){
					var news = parseInt($("#newNo").val());
					$(".p-nl-inputList").append(getNewsHtml(news));
					
					$.get(getPublishServer() +"/images/actionNews.json",function(data){
		                var json1=data;
		                json1=json1.news;
		                var newsLength=0;
		                if(json1.length>$("#newNo").val()){
		                	newsLength=$("#newNo").val();
		                }else{
		                	newsLength=json1.length;
		                }
		                //新闻渲染到侧边栏
		                for(var i=0;i<newsLength;i++ ){
                		   $("#newTitle"+(i+1)).val(json1[i].newsTitle);
                		   $("#newLink"+(i+1)).val(json1[i].link);
                        }
					});
					 
					$(".form-group input").attr("readOnly","readOnly");
				}
				
				function renderM(){
					var news = parseInt($("#newNo").val());
					$(".p-nl-inputList").append(getNewsHtml(news));
				}
				
				function clear(){
					$(".p-nl-inputList").empty();
				}
				
				//新闻信息-侧边栏
				function getNewsHtml(number) {
					
					var html = "";
					for (var i = 0; i < number; i++) {
						html += "<label>第" + (i + 1) + "条新闻</label>" +
							"<input type='text' class='form-control' id='newsTitle" + (i + 1) + "' placeholder='输入第" + (i + 1) + "条新闻标题'>"+
							"<input type='text' class='form-control' id='newsLink" + (i + 1) + "' placeholder='输入第" + (i + 1) + "条新闻外链'>"+"";
					}
					return html;
				}
				
				$("#setNewList").bind('click', function () {
					$(".newsSource").show();
					renderM();
				});
				
				$("#myplugin").bind('click', function () {
						plugin.setPlugin( id );
				});
			},

			getData : function( id , type ){
				var p_id = plugin.settings.id ? plugin.settings.id : id;
				var p_type = plugin.settings.type ? plugin.settings.type : type;
				
				var data = {
						type : p_type,
						content : null
				}
				
				var list = new Array();
				var newsWidth = $( "#" + p_id ).width() -30;
				var view = {
						group : [],
						root: config.BASE_URL
				};
				
			    for( var i=0 ; i < $("input[id^='newsTitle']").length ; i++){
					view.group.push({
						newsTitle : $('#newsTitle' + (i + 1)).val(),
						link : $('#newsLink' + (i + 1)).val(),
						newsWidth : newsWidth
					});
			    }	
			    
				data.content = view;
				return data;
			}, 
			
			// 插件编辑页面初始化
			setEditPage : function( id, data ){
				var news = data.content.group;
				$.get( getPublishServer() + '/views/template/newsInputList.html' , function( list ) {
					$("#newsList").append(plugin.renderInputList( list, news.length ));
					$.each( news , function( i , e ){
						$("#newsTitle" + ( i + 1 )).val(e.newsTitle);
						$("#newsLink" + ( i + 1 )).val(e.newsLink);
					});
				});
				
				$("#myplugin").bind('click', function () {
					plugin.setPlugin( id , 'edit' , data.type );
				});
			},
			
			// 渲染插件
			setPlugin : function ( id , status, type ) {
				//如果有data 直接从数据渲染插件
				if( status == 'edit' ){
					var pluginInfo = plugin.getData.apply(this, [id , type]);
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
				
				$.get( getPublishServer() + '/views/template/newsList.html' , function( newsList ){
					var output = mustache.render(newsList, pluginInfo.content);
					$( '#' + id + ' .plugin').remove();
					$( '#' + id + ' .pluginBody').empty();
					$( '#' + id + ' .pluginBody').append(output);
				});
			},
			
			renderInputList : function( template , count) {
				var view = {
					group : []
				};

				for (var i = 0; i < count; i++) {
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