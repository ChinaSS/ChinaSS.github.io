/**
 * Created by rkg on 2014/11/6.
 */

define([ "Data", "TemplateUtil", "Config", "Mustache"], function( tData, tUtil, config, mustache ){  
	
	var toolbar = {
		getData : function(){
			return tData.getData();
		},
		
		setData : function( data ){
			tData.setData( data );
		},
		/*
		 * 浮动栏初始化
		 * @param id 容器ID
		 */
		init : function( id ){
			var object = this;
			var treelevel = id.split('_').length;
			if( treelevel <= 3 ){
				var floatBar = "<div style='right: "  + ( 45 * (treelevel-1) ) + "px;' class='floatRightBar'>" +
				"<span class='glyphicon glyphicon-cog cog'></span>" +
				"<span class='glyphicon glyphicon-trash trash'></span>" +
				"<span class='glyphicon glyphicon-send header'></span>" +
				"</div>" +
				"<div class='floatLeftBar'>" +
				id +
				"</div>";
			}else if ( treelevel > 3){
				var floatBar = "<div style='left: 0px; top: "  + ( 20 * (treelevel-4)  - 13 ) + "px;' class='floatRightBar'>" +
				"<span class='glyphicon glyphicon-cog cog'></span>" +
				"<span class='glyphicon glyphicon-trash trash'></span>" +
				"<span class='glyphicon glyphicon-send header'></span>" +
				"</div>" +
				"<div class='floatLeftBar'>" +
				id +
				"</div>";
			}

			var targetId = "#" + id;
			$( targetId ).mouseenter(function(evt){
				object.show( $(this).attr('id') , floatBar );
			});

			$( targetId ).mouseleave(function(evt){
				object.remove( $(this) );
			});
		},

		/*
		 * 显示浮动栏
		 * @param id
		 * @param content
		 */
		show : function( id , content){
				$("#" + id).append( content );
				var pluginInfo = toolbar.getPlugin( id );
				if( !pluginInfo ){  //如果找不到插件信息，说明它是连行列都没有分的布局
					tUtil.initSideBar('#' + id + ' > .floatRightBar .cog',  config.URL_SETPAGE , toolbar.initPage, [id , pluginInfo]);
				}else if( pluginInfo.type == 'row' || pluginInfo.type == 'column' ){ 				//如果是行或者列
					tUtil.initSideBar('#' + id + ' > .floatRightBar .cog',  getPublishServer() + '/views/edit' + tUtil.upperFirstLetter(pluginInfo.type) + '.html', toolbar['initEdit' + tUtil.upperFirstLetter(pluginInfo.type)], [id , pluginInfo]);
				}else if( pluginInfo.type ){   //如果是插件
					require([pluginInfo.type], function (plugin) {
						tUtil.initSideBar('#' + id + ' > .floatRightBar .cog',  getPublishServer() + '/plugin/' + pluginInfo.type + '/edit' + tUtil.upperFirstLetter(pluginInfo.type) + '.html', plugin.setEditPage, [id , pluginInfo]);
					});
				}

				$( "#" + id + ' > .floatRightBar .trash').bind('click', function( evt ){
					evt.stopPropagation();
					toolbar.treeDelete( id );
				});
	
				tUtil.initSideBar('#' + id + ' > .floatRightBar .header',  config.URL_SETTITLE , toolbar.setTitle, [id]);
		},

		/*
		 * 去掉浮动栏
		 * @param container
		 */
		remove : function( container ){
			container.children('.floatRightBar').remove();
			container.children('.floatLeftBar').remove();
		},
		
	    /*
        * 找到行或者列，执行deleteLayout方法删除该行或者列
        * @param parentId 行或者列ID
        */
		treeDelete : function( parentId ){
				function findNode( obj ) {
					if (obj.id == parentId) {
						//清空布局信息
						toolbar.deleteLayout(obj);
			            //清空pluginMap内插件信息
			            toolbar.deletePlugin( obj.id );
			            //重新初始化侧边栏
						tUtil.initSideBar('#' + parentId + ' > .floatBar .cog',  getPublishServer() + '/views/setPage.html', toolbar.initPage, [parentId]);
						return true;
					}
					return false;
				}
				tUtil.traverse(toolbar.getData()['layout'], findNode);
		},

        /*
         * 删除布局，执行deletePlugin方法删除该行或者列的插件
         * @param obj
         */
     	deleteLayout : function( obj ){
            var body = $("#" + obj.id).children(".pluginBody");
            var header = $("#" + obj.id).children(".header");
            //清空layout树内该节点
            obj.layout = [];
            //清空当前body
            body.empty();
            body.css("height", "");
            body.css("width", "");
            //清空当前header
            header.children("span").empty();
            header.addClass('hide');
        },

		/*
		* 删除插件信息
		* @param id 插件ID
		 */
		deletePlugin : function ( id ) {
			var obj = toolbar.getData().plugin;
			for (var prop in obj) {
				if( obj.hasOwnProperty( prop ) ) {
					if(tUtil.hasString( prop , id )){
						delete obj[prop];
					}
				}
			}
		},
			
        /*
	        * 找到该插件
	        * @param id 插件ID
         */
		getPlugin : function( id ){
			return toolbar.getData().plugin[id] ? toolbar.getData().plugin[id] : false;
		},
				
	       /***************************************编辑功能**********************************/
		/*
		 *设置列侧边栏初始化
		 * @param id 容器ID
		 */
		initPage : function (id) {
			$("#setRowsNos").bind('click', function(){
				var type = 'row';
				var count = $("#" + type + "sNo").val();
				toolbar.renderList( id , type , count)
			});

			$("#setColumnNos").bind('click', function(){
				var type = 'column';
				var count = $("#" + type + "sNo").val();
				toolbar.renderList( id , type , count)
			});
			
			$("#setContent").bind('click', function(){
				require(['Layout'], function(layout){
					layout.setContent( id );
				});
			});
		},
				
        /*
         *  编辑行页面
         * @param id 容器ID
         * @param data
         */
        initEditRow : function( id, data ){
            var rowsNo = tUtil.getPropertyNumber(data.content);
            toolbar.renderList( id , data.type, rowsNo , toolbar.setInputList, data.content );
        },

        /*
		 * 编辑列页面
		 * @param id 容器ID
		 * @param data
         */
        initEditColumn : function( id, data ){
            var columnsNo = tUtil.getPropertyNumber(data.content);
            toolbar.renderList( id , data.type, columnsNo , toolbar.setInputList, data.content );
        },

		/* 
		 * 给每个input赋值
		 */
		setInputList : function( Type,  data ){
			for (k in data) {
				if (data.hasOwnProperty(k)){
					var sArray = k.split('_');
					var i = parseInt( sArray[sArray.length - 1] );
					$("#set" + Type + (i+1)).val( data[k] );
				}
			}
		},
        
        /*
         * 渲染编辑页面所有的input
         */
		renderList : function( id, type, count , callback , rcData){
			var Type = tUtil.upperFirstLetter( type );

			var view = {
				hasRow : false, //true 就渲染行
				hasColumn : false, // true 就渲染列
				group : []
			};

			view["has" + Type] = true;

			for (var i = 0; i < count; i++) {
				view.group.push({
					index : i+1
				})
			}

			$.get( config.URL_INPUTLIST , function(row) {
				require(['Layout'], function(layout){
					var output = mustache.render( row, view );
					$("." + type + "sInputList").append(output);
					if( !rcData ){
						$("#set" + Type + "s").bind( 'click', function(){
							layout["set" + Type + "s"]( id );
						});
					}else {
						$("#set" + Type + "s").bind( 'click', function(){
							layout["edit" + Type + "s"]( id );
						});
					}
					typeof(callback) == "function" && callback.apply(this, [Type, rcData]);
				});
			});

			return false;
		},
				
       /*
        * 设置标题
        * @param id 行或者列ID
	    */
		setTitle : function( id ){
			toolbar.editTitle( id );
			$("#setTitle").bind('click', function(){
				var header = $('#' + id).children('.header');
				var title = $('#title').val();
				
				//将标题信息插入树
				toolbar.titleInsert(title , id);
				
				header.find('span').text( title );
				header.removeClass('hide');
				
				tUtil.resize(id);

			});
		},
		
		/*
		 * 编辑标题
		 * @param id 容器ID
		 */
		editTitle : function ( id ) {
            function edit( obj ) {
                if (obj.id == id) {
                	$('#title').val( obj.title ? obj.title : '' );
                    return true;
                }
                return false;
            }
            tUtil.traverse(toolbar.getData().layout, edit);
		},
		
        /*
         * 插入标题信息
         * @param title  标题
         * @param id 容器ID
         */
		titleInsert : function ( title, id ){
			function insert( obj ){
				if( obj.id == id ){
					obj.title = title;
					return true;
				}
				return false;
			}
			tUtil.traverse( toolbar.getData().layout , insert );
		}
	};
	return toolbar;
});