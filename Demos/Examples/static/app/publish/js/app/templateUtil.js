/**
 * Created by rkg on 2014/11/6.
 * Once you’ve fixed a hard-to-debug error
 * If you’re writing code and think, “I hope [something] doesn’t happen—that would really mess up this code,
 * If you’re writing code that will be used by people you don’t know,
 */
define(function(){
	var tUtil = {
		openNewWindow : function () {
			this.windowObjectReference = window.open( getPublishServer() + '/template.jsp', '专题编辑', 'centerscreen=yes,height=768,width=1044,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
		},

		/*
			@selector 为需要绑定弹出框的按钮
			@url 弹出的html模板
			@callback 回调函数
			@param 回调函数参数
		*/
		initSideBar : function ( selector, url, callBack, param) {
			$(selector).bind('click', function (e) {
				e.stopPropagation();

				//弹出侧边栏
				require(['Util'], function (util) {
					util.slidebar({
						url: url,
						width: '250px',
						allowClick: [],
						cache: false,
						'afterLoad': function () {
							typeof(callBack) == "function" && callBack.apply(e, param);
						}
					});
				});
			});
		},

        //深度算法
		traverse : function( treeObj , func ){
			for (var i = 0 ; i < treeObj.length ; i++ ) {
				var result = func.apply(this, [treeObj[i]]);
				//只有没找到结果并且有子布局的时候才继续遍历
				if ( (result == false) && (treeObj[i].layout.length > 0) ) {
					//going on step down in the object tree!!
					tUtil.traverse(treeObj[i].layout, func);
				}
			}
		},

		findNode : function( treeObj , id ){
			for ( var i = 0 ; i < treeObj.layout.length ; i ++ ){
				if (treeObj.layout[i].id == id){
					var result = 1;
				}
				if ( ( result !=1 ) && ( treeObj.layout.length > 0 ) ){
					tUtil.findNode(treeObj.layout[i], id);
				}
			}
			return treeObj.layout[i]
			/*	if (treeObj.id == id) {
					return treeObj;
				}
				else if ( treeObj.layout != null ){
					for ( var i = 0 ; i < treeObj.layout.length ; i++ ){
						return tUtil.findNode(treeObj.layout[i], id);
					}
				}
				return null;*/
		},
        //广度遍历
        bTraverse : function( treeObj, func ){
            var queue = [],
                next = treeObj;
            while (next) {
                if (next.layout) {
                    //$.each(next.layout, function(i, layout) {
                	for( i = 0 ; i < next.layout.length ;  i ++ ){
                		queue.push(next.layout[i]);
                		func.apply(this, [next.layout[i]]);
                	}
                }
                next = queue.shift();
            }
        },
		/*
		 用来渲染select内容
		 @param
		 selector : select 选择器
		 optionData ： select的option渲染数据
		 selectHandler : select回调方法
		 */

		renderSelectOption : function (selector, optionData, selectHandler) {
			$.each(selectValues, function (key, value) {
				$(selector).append($('<option>', { value: key }).text(value));
			});
		},

		initWebuploader : function () {
			require(['Webuploader', 'css!' + getPublishServer() + '/lib/webuploader/webuploader.css'], function (webuploader) {
				var uploader = webuploader.create({
					auto: true,
					server: 'http://webuploader.duapp.com/server/fileupload.php',
					pick: '#filePicker',
					accept: {
						title: 'Images',
						extensions: 'gif,jpg,jpeg,bmp,png',
						mimeTypes: 'image/*'
					}
				});
			});
		},

		upperFirstLetter : function (string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		},

		hasString : function( string, target ){
			if (string.indexOf(target) > -1) {
				return true;
			} else {
				return false;
			}
		},

		getPropertyNumber : function( obj ){
			var count = 0;
			for (k in obj) {
				if (obj.hasOwnProperty(k)){
					count++;
				}
			}
			return count;
		},
		
		hello : function(){
			data = new Date();
			alert( '我还在被开发中哦！  :P ' + data );
		},
		
		//通过模板ID查找父级节点
		getParentById : function( id ){
			var searchLastIndex = id.lastIndexOf('_');
			if( searchLastIndex == -1 ){
				return false; //是body
			}else{
				return id.substring(0 , searchLastIndex);
			}
		},
		
		getFileNameByPath : function( path ){
			var array = path.split('/');
			var pathName = array[array.length - 1];
			return pathName;
		},
		
		removeFileExtention : function( fileName ){
			var array = fileName.split('.');
			var pathName = array[0];
			return pathName;
		},
		
		/*
		* 添加或者删除标题时，重新计算插件高度
		* @param id 容器ID
		 */
		resize : function( id ){
			var height;
			if( $("#" + id + " > .header").hasClass('hide')) {
				height = $("#" + id).height();
			}else{
				height = $("#" + id).height() - $("#" + id + " > .header").outerHeight(true);
			}

			$("#" + id + " > .pluginBody").height( height );
		}
	};
	return tUtil;
});