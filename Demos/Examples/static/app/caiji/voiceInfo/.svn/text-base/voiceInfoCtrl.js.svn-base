/**
 * sarah@author
 */
define(["jquery","VoiceInfoDir/voiceInfoSupport","CommonDir/uploader","CommonDir/dict","CommonDir/dictTree"],function($,support,uploader,dict,dictTree){
	return function($http,$scope){
		$scope.$apply(function(){
			$scope.voiceInfo = {
					"template" : {"editVoiceInfo" : getStaticPath()+"app/caiji/voiceInfo/views/voiceInfoEdit.html",
								  "batchUpload" : getStaticPath()+"app/caiji/voiceInfo/views/upload.html"},
					"entity" : {},
					"bizTypeCodes" : {},//业务类型键值对应表
					"csInputConfig" : {
						type : "select",
						searchAble : false,
						data : []
					},
					"query" : {
						"dto" : {dictBizType:"",voiceSize:"",titleName:""},
						"hidden" : true,
						"csInputConfig" : {
							type : "select",
							searchAble : false,
							data : []
						},
						"query" : function(){
							support.voiceListInit($scope);
						},
						"reset" : function(){
							$scope.voiceInfo.query.dto={dictBizType:"",voiceSize:"",titleName:""};
						}
					},
					"saveEntity" : function(){
						support.saveEntity($scope);
					}
			};
			$scope.upload = {
					bizType : dict.bizType.voice,
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
					bizType : dict.bizType.voice,
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
		support.voiceListInit($scope);
		support.csInputDataInit($scope);
	};
});