require.config({
	baseUrl:  getServer() + "/static/app/publish/",
	paths: {
		//lib
		"Bootstrap": "lib/bootstrap/js/bootstrap.min",
		"Json2": "lib/json2/json2",
		"Webuploader": "lib/webuploader/webuploader",
		"Mustache": "lib/mustache",
		
		//app
		"Data": "js/app/data",
		"Layout": "js/app/layout",
		"Toolbar": "js/app/toolbar",
        "MainMenu": "js/app/mainMenu",
		"TemplateUtil": "js/app/templateUtil",
        "Config": "js/app/config",
		"Plugin": "app/plugin",
		"BaseDialog": "lib/util/baseDialog",
		"Util": "lib/util/util",
		"Dialog":"lib/util/dialog",
		"InputSelect":"plugin/common/inputSelect",
        
		//plugin
		"singlePic": "plugin/singlePic/singlePic",
		"newsList": "plugin/newsList/newsList",
		"imgText": "plugin/imgText/imgText",
		"slider": "plugin/slider/slider",
		"menu": "plugin/menu/menu",
		"footer" : "plugin/footer/footer",
		"video":"plugin/video/video",
		"tab":"plugin/tab/tab",
		
		//temp
		"SliderJquery" : "plugin/slider/sliderJquery",
		"SelectImg":"plugin/common/selectImg/selectImg",
			
		//Mustache template
	    "rowM" : "views/template/row.html",
	    "columnM" : "views/template/column.html"
	},
	shim: {
		"Bootstrap": ["jquery"],
		"Json2": {}
	},
	map: {
		'*': {
			'css': 'lib/requirejs/plugin/css.min',
			'text': 'lib/requirejs/plugin/text'
		}
	}
});

require(["Bootstrap","Data", "Layout", "Toolbar"], function ( bootstrap , tData, layout, toolbar ) {
	var templateId = $("#templateId").val();
	layout.init( templateId );
});