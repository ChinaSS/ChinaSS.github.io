define(['Data', 'Mustache', 'Config', 'TemplateUtil'], function(tData, mustache, config, tUtil){
    var mainMenu = {
        init : function(){
        	mainMenu.initSave();
        	mainMenu.preview();
        	mainMenu.config();
        },
        
        initSave : function(){
        	$("#save").bind('click', function(){
        		mainMenu.save();
        	});
        },
        
        setTemplateInfo : function(){
        	$("#TNAME").val( $('#TName').val() );
        	$("#TTYPE").val( $('#TType').val() );
        	$("#TDES").val( $('#TDes').val() );
        },
        
        save : function(){
            require(['Layout'], function (layout){
                var data = {
                    templateName : $('#TNAME').val(),
                    dictTemplateType : $('#TTYPE').val(),
                    isPublish : '0',
                    remark : $('#TDES').val(),
                    templateJson : tData,
                };

                $.ajax({
                    url:getServer()+"/template/save",
                    type:"POST",
                    data: JSON.stringify(data),
                    dataType:"json",
                    contentType: 'application/json',
                    success:function(data){
                    	alert('保存成功！');
                    }
                });
            });
        },
        
        preview : function(){
        	var previewButton = ".toggle-slider .preview";
        	var editButton = ".toggle-slider .edit";
        	var slider = ".toggle-slider .slider-wrapper .c-slider";
        	
        	function scrollTo( bar , position ){
    			$(bar).animate({
    				left: position
    			}, 200, function(){
    				//alert(2);
    			});
        	}
        	
        	$(previewButton).bind('click', function(){
        		if( !$(previewButton).hasClass('on') ){
        			$(editButton).removeClass('on');
        			$(this).addClass('on');
        			scrollTo( slider ,  '-2' );
        		}
        	});
        	
        	$(editButton).bind('click', function(){
        		if( !$(editButton).hasClass('on') ){
        			$(previewButton).removeClass('on');
        			$(this).addClass('on');
        			scrollTo( slider ,  '26' );
        		}
        	});
        },
        
        config : function(){
        	$('#config').bind('click', function(){
        		//初始化配置页面总入口
/*        		$.get( config.TMP_METRO , function(row){	
        			view = {};
    				var output = mustache.render(row, view);
    				$('.configPage').append(output);
    				$('body').css('overflow', 'hidden');
    				$('.configPage').fadeIn();
        		});*/
        		//mainMenu.loadModule( config.TMP_METRO_Main );
        	});
        },
        
        /*
         * 初始化加载整个配置框架
         * @param initType 初始化类型 new为模板信息页 ，其他情况暂时直接跳控制面板
         */
        loadFrame: function( initType ){
        	mainMenu.initFrame();
        	if( initType == 'new'){
        		mainMenu.loadModule( config.TMP_METRO_BASE ); 
        	}
        	else{
        		mainMenu.loadModule( config.TMP_METRO_MAIN ); 
        	}
        },
        
        /*
         * 加载除模块外所有事件
         */
        initFrame: function(){
        	$(".configPage").fadeIn();
            $('#quit').off('click').on('click' ,function(e) {
                mainMenu.exit();
            }); 
        },
        /*
         * 用于动态加载配置页面单项模块
         * @param templatePath 配置项模板路径
         * @param initFunc 配置项模板板加载后初始化
         */
        loadModule : function( templatePath , func ){
        	var name = tUtil.getFileNameByPath(templatePath);
        	var fileName = tUtil.removeFileExtention(name);
        	
    		$.get( templatePath , function(row){	
    			view = {};
				var output = mustache.render(row, view);
				$('.configPageMain').empty();
				$('.configPageMain').append(output);
				$('body').css('overflow', 'hidden');
				$('.configPageMain').fadeIn();
				mainMenu['init' + fileName].apply(this, []);
    		});
        },
        /*
         * 初始化模板基本信息页
         * @param
         */
        initbaseInfo : function(){
        	$("#TNext").bind('click', function(){
        		mainMenu.setTemplateInfo();
        		mainMenu.loadModule( config.TMP_METRO_BASETEMP ); 
        	});
        },
        
        /*
         * 初始化模板基本信息页
         * @param
         
        initmain : function(){
        	$("#rkgConfirm").bind('click', function(){
        		
        	});
        },*/
        
        /*
         * 初始化模板选择页
         * @param
         */
        initbaseTemp : function(){
        	$("#templateEmpty").bind('click', function(){
        		mainMenu.exit();
        	});
        	
        	$("#templateOne").bind('click', function(){
        		mainMenu.exit();
        	});
        },
        
        exit : function(){
        	var mainContainer = '.configPage';
        	var moduleContainer = '.configPage .configPageMain';
        	$(moduleContainer).empty();
        	$(mainContainer).fadeOut();
        	$('body').css('overflow', 'scroll');
        }
    }

    return mainMenu;
});