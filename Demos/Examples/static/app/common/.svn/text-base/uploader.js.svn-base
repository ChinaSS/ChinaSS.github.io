/**
 * 附件上传
 * 坑：按钮或者他的父级被设置 display:none 隐藏了，在这种情况下 flash 会停止运行，请改用以下方式隐藏，给 需要隐藏的元素加 webuploader-element-invisible 类名代替加 display:none 属性。
 * @author gaodsh@css.com.cn
 */
 define([ "jquery",'UtilDir/dialog','WebUploader',"css!WebUploaderCss" ], function($,Dialog,webuploader) {
 	var uploader;
 	var batchUp;
 	var uploaderInit = function (bizType,$scope,pickId,controlId,uploadName){
 		 
 		 var selectId = "#picker";
 		 if(pickId){
 			 selectId = "#"+pickId;
 		 }
 		 var uploadId ="#ctlBtn";
 		 if(controlId){
 			 uploadId = "#"+controlId;
 		 }
 		 var initUploadName = "upload";
 		 if(uploadName){
 			 initUploadName = uploadName;
 		 }
	
 		 var init =  webuploader.create({
			
		    // swf文件路径
		    swf: getStaticPath() + 'modules/webuploader/Uploader.swf',
		    
		    // 文件接收服务端。
		    server: getServer()+'/file/upload',
		
		    // 选择文件的按钮。可选。
		    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
		    pick: selectId,
		    
		    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
		    resize: false,
		    
		    //其他上传服务端参数
		    //初始化以后添加
			//uploader.options.formData.uid = 123;
		    formData:{
		    	bizType:bizType
		    }
		});
 		 
		
		// 当有文件被添加进队列的时候
 		init.on( 'fileQueued', function( file ) {
        	 $scope.$apply(function () {
				$scope[initUploadName].data.push({
									id : file.id,
									fileName : file.name,
									fileAliases : '',
									filePath : '',
									state : '等待上传...',
									width : '0%',
									pbar : false,
									fileId :'',
									size : file.size
								});
        	 });
			
        });
        
        // 文件上传过程中创建进度条实时显示。
 		init.on( 'uploadProgress', function( file, percentage ) {
	          for (var i = 0; i < $scope[initUploadName].data.length; i++) {
					if(file.id==$scope[initUploadName].data[i].id){
						 $scope.$apply(function () {
							$scope[initUploadName].data[i].state = '上传中';
							$scope[initUploadName].data[i].pbar = true;
							$scope[initUploadName].data[i].width = percentage * 100 + '%';
						 });
					}
			  }
        });
        
 		init.on( 'uploadSuccess', function( file ) {
		    for (var i = 0; i < $scope[initUploadName].data.length; i++) {
					if(file.id==$scope[initUploadName].data[i].id){
						 $scope.$apply(function () {
							$scope[initUploadName].data[i].state = '已上传';
							$scope[initUploadName].data[i].fileHeight = file._info.height;
							$scope[initUploadName].data[i].fileWidth = file._info.width;
						 });
					}
			}
		});
		
 		init.on( 'uploadError', function( file ) {
		    for (var i = 0; i < $scope[initUploadName].data.length; i++) {
					if(file.id==$scope[initUploadName].data[i].id){
						 $scope.$apply(function () {
							$scope[initUploadName].data[i].state = '上传出错';
						 });
					}
			}
		});
		
 		init.on( 'uploadComplete', function( file ) {
	          for (var i = 0; i < $scope[initUploadName].data.length; i++) {
					if(file.id==$scope[initUploadName].data[i].id){
						 $scope.$apply(function () {
							$scope[initUploadName].data[i].pbar = false;
						 });
					}
			  }
		});
		
 		init.on( 'uploadAccept', function( file, response ) {
		   if ("200" == response.status) {
	          for (var i = 0; i < $scope[initUploadName].data.length; i++) {
					if(file.file.id==$scope[initUploadName].data[i].id){
						$scope[initUploadName].data[i].fileId = response.entity.fileId;
					}
			  }						
			 return true;
			}
		   return false;
		});
		
 		uploadName ? batchUp = init : uploader=init;
 		
        $(uploadId).click(function(){
        	uploadName ? batchUp.upload() : uploader.upload();
        });
        
	}
	
	function removeFile(id){
		if(uploader){
			uploader.removeFile(id,true);
		}
	}
	function resetQueue(){
		if(uploader){
			uploader.reset();
		}
		if(batchUp){
			batchUp.reset();
		}
	}
	
	return {
		uploaderInit : uploaderInit,
		removeFile : removeFile,
		resetQueue : resetQueue
	};
	
 });