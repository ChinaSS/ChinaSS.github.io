/**
 * sarah@author
 */
define(["jquery","TxtInfoDir/txtInfoSupport","CommonDir/uploader","CommonDir/dict"],function($,support,uploader,dict){
	return function($http,$scope){
		$scope.$apply(function(){
			$scope.txtInfo = {
					"template" : {"editTxtInfo" : getStaticPath()+"app/caiji/txtInfo/views/txtInfoEdit.html",
								  "batchUpload" : getStaticPath()+"app/caiji/txtInfo/views/upload.html"},
					"entity" : {},
					"bizTypeCodes" : {},//业务类型键值对应表
					"csInputConfig" : {
						type : "select",
						searchAble : false,
						data : []
					},
					"query" : {
						"dto" : {dictBizType:"",txtSize:"",titleName:""},
						"hidden" : true,
						"csInputConfig" : {
							type : "select",
							searchAble : false,
							data : []
						},
						"query" : function(){
							support.txtListInit($scope);
						},
						"reset" : function(){
							$scope.txtInfo.query.dto={dictBizType:"",txtSize:"",titleName:""};
						}
					},
					"saveEntity" : function(){
						support.saveEntity($scope);
					}
			};
			$scope.upload = {
					bizType : dict.bizType.text,
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
					bizType : dict.bizType.text,
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
		support.txtListInit($scope);
		support.csInputDataInit($scope);
	};
});