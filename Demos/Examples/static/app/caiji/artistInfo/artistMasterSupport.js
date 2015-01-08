define(["jquery","app/baseSupport","UtilDir/inputSelect","UtilDir/util","CommonDir/dict"],function($,baseSupport,inputSelect,util,dict){
    
	var result = {};//定义一个对象,其他js调用该js文件时,要求返回的东西都放到这个对象里
	
	//教育列表数据  ng-repeat使用
	result.getMasterDataByArtist = function(artistId,$scope){//根据职务类型查询职务数据
		//发送ajax请求,获取教育列表数据
        $.ajax({
            "url":getServer()+"/artistInfo/queryMasterListByArtist?artistId="+artistId,
            "type":"POST",
            async:false,
            dataType:"json",
            "success":function(d){//操作成功后操作 d是后台返回的封装了一定内容的数据
                //给作用域赋值
                $scope.$apply(function () {//这是调整数据模型的入口吧
                    $scope.artistInfo.masters=d.curPageData;
                });
            }
        });
	}
	
    var validate = function(){}//end validate
	
     return result ;//return作用是什么?待补充 ctrl中调用service.js时,要返回结果
});
