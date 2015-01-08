define(["jquery","UtilDir/util","UtilDir/grid","app/template/templateSupport"],function($,util,grid,service){

	return function($http, $scope){
		
		$scope.$apply(function(){
			
			$scope.template = {
					template:{
						editRole: getServer() + "/static/app/template/views/templateEdit.html"
					},
					entity:{},
					saveEntity:function(){
						//数据验证
					}
			};
		});
		
		service.templateListInit($scope);
	}
});