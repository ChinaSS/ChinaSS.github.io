/**
 * 布局核心引擎.
 */

define( ['Data', 'Toolbar' , 'TemplateUtil' , 'Mustache' , 'MainMenu' , 'Config' , 'text!rowM' , 'text!columnM'], function ( tData, toolbar, tUtil, mustache, mainMenu, config, rowM, columnM ) {
	var layout = {
		getData : function(){
			return tData.getData();
		},
		
		setData : function( data ){
			tData.setData( data );
		},
        /*
        * 入口
        * @param id 模板ID
        * */
        init : function( id ){
            $.post('query?templateId=' + id , function(data){
                //编辑时，templateJson不为空，然后做渲染
                if( data.entity ){
                	//初始化模板信息
                	$("#templateId").val( data.entity.templateId );
                	$("#TNAME").val( data.entity.templateName );
                	$("#TTYPE").val( data.entity.dictTemplateType );
                	$("#TDES").val( data.entity.remark );
                	$("#tempName").text( data.entity.templateName )
                    var templateInfo = $.parseJSON( data.entity.templateJson );
                    //加载所有模板数据
                    layout.setData( templateInfo );
                    //必须广度遍历，渲染引擎主要在renderEngine中执行
                    tUtil.bTraverse( templateInfo , layout.renderEngine );
                    //遍历pluginMap，分别渲染每一个插件
                    layout.renderPluginEngine( templateInfo.plugin );
                } else{
                //新增时，进入初始配置页面	
                	mainMenu.loadFrame('new');
                }
                //工具栏初始
                toolbar.init("body");

                //菜单栏初始化
                mainMenu.init();

            }, "json");
        },

        /*
        * 设置行信息
        * @param id 行ID
         */
		setRows : function (id) {
			var selector = '#' + id;
			var rowno = parseInt($('#rowsNo').val());         //行数
			var containerBody = $(selector).children('.pluginBody');           //容器节点
			var child = null;                                 //子节点
			var view = {};
			var rowData = {};
			
			$.get( config.URL_ROW , function(row){	
				view.rows = [];
				$("input[name='rowList']").each(function (i, e) {
					child = id + '_' + i;
					heightPercent = $("#" + e.id).val(); //每一行的百分比
					//渲染引擎模板view
					view.rows.push({
						childId: child,
						height: heightPercent
					});

					//将各个行数据存入树
					var rowObj = {};
					rowObj.type = 'row';
					rowObj.id = child;
					rowObj.height = heightPercent;
					rowObj.pluginId = child;
					rowObj.layout = [];

					//将行数据存入pluginMap 主要用于编辑
					rowData[child] = heightPercent;
					//layout.insertLayout( rowObj, id )
					layout.treeInsert(rowObj, id);
				});

				layout.setPlugin( id , 'row' , rowData );

				//将引擎模板放入布局内
				var output = mustache.render(row, view);
				containerBody.append(output);

				//初始化渲染后的侧边栏，浮动框
				for (var i = 0; i < rowno; i++) {
					child = id + '_' + i;
					toolbar.init( child );
				}
			});
		},

        /*
        * 编辑行
        * @param id 行ID
         */
		editRows : function( id ){
			var rowData = {};
			$("input[name='rowList']").each(function (i, e) {
				child = id + '_' + i;
				heightPercent = $("#" + e.id).val(); //每一行的百分比

				//修改当前行高度
				$("#" + child).css('height' , heightPercent + '%');

				//将各个行数据存入树
				var rowObj = {};
				rowObj.height = heightPercent;

				//将行数据存入pluginMap 主要用于编辑
				rowData[child] = heightPercent;
				layout.treeEdit(rowObj, child);
			});

			layout.setPlugin( id , 'row' , rowData );
		},

        /*
        * 设置列
        * @param id 列ID
         */
		setColumns : function (id) {
			var selector = '#' + id;
			var columnNo = parseInt($('#columnsNo').val());
			var	containerBody = $(selector).children('.pluginBody');
			var	child = '';

			var view = {};
			var columnData = {};
			//$.get( getPublishServer() + '/views/template/column.html' , function(column) {
			$.get( config.URL_COLUMN , function(column) {
				view.columns = [];
				$("input[name='columnList']").each(function (i, e) {
					//渲染引擎模板view
					child = id + '_' + i;
					widthPercent = $("#" + e.id).val();
					view.columns.push({
						childId: child,
						width: widthPercent
					});
					
					//将各个列数据存入树
					var columnObj = {};
					columnObj.type = 'column';
					columnObj.id = child;
					columnObj.width = widthPercent;
					columnObj.pluginId = child;
					columnObj.layout = [];

					//将行数据存入pluginMap 主要用于编辑
					columnData[child] = widthPercent;
					//layout.insertLayout( columnObj , id );
					layout.treeInsert(columnObj , id);
				});

				layout.setPlugin( id , 'column' , columnData );

				//将引擎模板放入布局内
				var output = mustache.render(column, view);
				$(containerBody).append(output);

				//初始化渲染后的侧边栏，浮动框
				for (var i = 0; i < columnNo; i++) {
					child = id + '_' + i;
					toolbar.init( child );
				}
			});
		},

        /*
        *编辑列
        * @param id 列ID
         */
		editColumns : function( id ){
			var columnData = {};
			$("input[name='columnList']").each(function (i, e) {
				child = id + '_' + i;
				widthPercent = $("#" + e.id).val();

				//修改当前行高度
				$("#" + child).css('width' , widthPercent + '%');

				//将各个列数据存入树
				var columnObj = {};
				columnObj.width = widthPercent;

				//将行数据存入pluginMap 主要用于编辑
				columnData[child] = widthPercent;
				layout.treeEdit(columnObj, child);
			});

			layout.setPlugin( id , 'column' , columnData );
		},

        /*
        * 设置插件
        * @param id 行或者列ID
         */
		setContent : function ( id ) {
			var pluginType = config.MAP_PLUGIN[$('#pluginType').val()];
			var parent = $('#' + id).children('.pluginBody');
			var pluginUUid = id;

			$.get( config.URL_PLUGIN_BUTTON , function( page ){
				parent.append(page);
				require([pluginType], function (plugin) {
					var elementId = id;
					var type = pluginType;
					plugin.init({
						id: elementId,
						type: type,
						afterRender : layout.setPlugin
					});
				});
			});
		},

 
        /*
        * 插入行或者列信息
        * @param childObj  行或者列信息
        * @param parentId  父级ID
         */
        treeInsert : function (childObj , parentId) {
            function insert( obj ) {
                if (obj.id == parentId) {
                    obj.layout.push(childObj);
                    return true;
                }
                return false;
            }
            tUtil.traverse(layout.getData().layout, insert);
        },

        /*
        * 保留
         */
		insertLayout : function ( childObj, parentId ){
			var parent = tUtil.findNode( layout.getData[0], parentId );
			parent.layout.push( childObj );
			return true;
		},

        /*
        * 行或者列修改
        * @param 新的行或者列信息
        * @param 行或者列ID
         */
		treeEdit : function( childObj, childId ){
			function edit( obj ) {
				if (obj.id == childId) {
					if( obj.height ){
						obj.height = childObj.height;
					}else if ( obj.width ){
						obj.width = childObj.width;
					}else{
						alert('insert error, please consult the administrator!')
					}
					return true;
				}
				return false;
			}
			tUtil.traverse(layout.getData().layout, edit);
		},

        /*
        * 找到行或者列，执行deleteLayout方法删除该行或者列
        * @param parentId 行或者列ID
         */
		/*treeDelete : function( parentId ){
			function findNode( obj ) {
				if (obj.id == parentId) {
					//清空布局信息
					layout.deleteLayout(obj);
		            //清空pluginMap内插件信息
		            layout.deletePlugin( obj.id );
		            //重新初始化侧边栏
					tUtil.initSideBar('#' + parentId + ' > .floatBar .cog',  getPublishServer() + '/views/setPage.html', layout.initPage, [parentId]);
					return true;
				}
				return false;
			}
			tUtil.traverse(layout.getData().layout, findNode);
		},*/

        /*
         * 删除布局，执行deletePlugin方法删除该行或者列的插件
         * @param obj
         */
       /* deleteLayout : function( obj ){
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
        },*/

		/*
		* 删除插件信息
		* @param id 插件ID
		 */
		/*deletePlugin : function ( id ) {
			var obj = layout.getData().pluginMap;
			for (var prop in obj) {
				if( obj.hasOwnProperty( prop ) ) {
					if(tUtil.hasString( prop , id )){
						delete obj[prop];
					}
				}
			}
		},*/

		/*
		* 把插件信息插入树，并执行rezize重新调整布局
		* @param id 容器ID
		* @param type 行或者列类型
		* @param data 插件数据
		 */
		setPlugin : function( id, type, data ){
			layout.getData().plugin[id] = {
				type : type,
				content : data
			};

			tUtil.resize(id);
			return layout.getData().plugin[id].content;
		},

		 /********************************反向渲染引擎**********************************/
		/*
		 * 加载渲染引擎
		 * @param item 为行或者列或者插件
		 */
		
		renderEngine : function( item ){ 
			var id = item.id;
			var parentId = tUtil.getParentById( id );
			//如果是parentId为body不渲染 暂时这样
			if( parentId ){
				$("#" + parentId).children('.pluginBody').append( layout.getItemHtml( item ) );
				toolbar.init( id );
			}
		},

		/*
		 * 行列渲染模板
		 * @param item 行或者列
		 */
		getItemHtml : function( item ){
			var output;
			if( item.type == 'row'){
					var view = {
						rows : []
					};
					view.rows.push({
						childId: item.id,
						height: item.height
					});
					output = mustache.render(rowM, view);
			}else if( item.type == 'column' ){
					var view = {
							columns : []
					}
					view.columns.push({
						childId: item.id,
						width: item.width
					});
					output = mustache.render(columnM, view);
			}else{
				alert( '行列信息异常，请联系管理员！');
			}
			return output;
		},
		
		/*
		 * 渲染插件
		 * 
		 */
		renderPluginEngine : function( pluginInfo ){
			for ( k in pluginInfo){
				if( pluginInfo[k].type !='row' && pluginInfo[k].type !='column' ){
					renderWithCss(k);
				}
			}
			
			function renderWithCss(k){
				if( pluginInfo[k].type !='row' && pluginInfo[k].type !='column' ){
					var id = k;
					require( [pluginInfo[k].type, 'css!' + config.BASE_URL + '/plugin/' + pluginInfo[k].type + '/' + pluginInfo[k].type] , function (plugin){
						plugin.setPlugin( id , pluginInfo[id] );
					});
				}
			}
		}
	};
	return layout;
});