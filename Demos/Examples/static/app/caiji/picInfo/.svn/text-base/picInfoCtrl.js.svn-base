/**
 * sarah@author
 */
define(["jquery","PicInfoDir/picInfoSupport","CommonDir/uploader","CommonDir/dict","CommonDir/dictTree"],function($,support,uploader,dict,dictTree){
	return function($http,$scope){
		$scope.$apply(function(){
			$scope.picInfo = {
					"template" : {"editPicInfo":getStaticPath()+"app/caiji/picInfo/views/picInfoEdit.html",
								  "upload":getStaticPath()+"app/caiji/picInfo/views/upload.html"},
					"entity" : {},
					"bizTypeTree" : [],
					query: {
						dto : {dictBizType:"",picSize:"",titleName:""},
						hidden : true,
						query : function(){
							support.pictureListInit($scope);
						},
						reset : function(){
							$scope.picInfo.query.dto={dictBizType:"",picSize:"",titleName:""};
						},
						csInputConfig : {
							type : "select",
							searchAble : false,
							data : []
						}
					},
					"pictureUrl" : "",
					"bizTypeCodes" :[],
					"csInputConfig" : {
						type : "select",
						searchAble : false,
						data : [],
						callback : function(data){
							$scope.picInfo.entity.dicBizType = data;
						}
					},
					"saveEntity" : function(){
						support.saveEntity($scope);
					},
					"show" : function(){
						return support.show($scope);
					}
			};
			$scope.upload = {
					bizType : dict.bizType.picture,
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
					bizType : dict.bizType.picture,
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
						data : dictTree.bizTypeCodes()
					}
					
			};
		});
		support.pictureListInit($scope);
		support.queryBizType($scope);
	};
});