/**
 * sarah@author
 */
define(["jquery","VideoInfoDir/videoInfoSupport","CommonDir/uploader","CommonDir/dict"],function($,support,uploader,dict){
	return function($http,$scope){
		$scope.$apply(function(){
			$scope.videoInfo = {
					"template" : {"editVideoInfo" : getStaticPath()+"app/caiji/videoInfo/views/videoInfoEdit.html",
								  "batchUpload" : getStaticPath()+"app/caiji/videoInfo/views/upload.html"},
					"entity" : {},
					"bizTypeCodes" : {},//业务类型键值对应表
					"csInputConfig" : {
						type : "select",
						searchAble : false,
						data : []
					},
					"query" : {
						"dto" : {dictBizType:"",videoSize:"",titleName:""},
						"hidden" : true,
						"csInputConfig" : {
							type : "select",
							searchAble : false,
							data : []
						},
						"query" : function(){
							support.videoListInit($scope);
						},
						"reset" : function(){
							$scope.videoInfo.query.dto={dictBizType:"",videoSize:"",titleName:""};
						}
					},
					"saveEntity" : function(){
						support.saveEntity($scope);
					}
			};
			$scope.upload = {
					bizType : dict.bizType.video,
					data : [],
					isUpload : true,
					init : function(){
						if(this.isUpload){
							uploader.uploaderInit(this.bizType,$scope);
						}
						this.isUpload = false;
					},
					reset : function(){
						uploader.resetQueue();
					}
			};
			$scope.batchUpload = {
					bizType : dict.bizType.video,
					dicBizType : "",
					data : [],
					isUpload : true,
					init : function(){
						if(this.isUpload){
							uploader.uploaderInit(this.bizType,$scope,"batchPicker","batchControl","batchUpload");
						}
						this.isUpload = false;
					},
					del : function(index){
						var del = this.data[index];
						if(del.id){
							uploader.removeFile(del.id);
						}
						this.data.splice(index, 1);
					},
					reset : function(){
						uploader.resetQueue();
					},
					save : function(){
						support.saveBatch($scope);
					},
					csInputConfig : {
						type : "select",
						searchAble : false,
						data : []//dictTree.bizTypeCodes()
					}
					
			};
		});
		support.videoListInit($scope);
		support.csInputDataInit($scope);
	};
});