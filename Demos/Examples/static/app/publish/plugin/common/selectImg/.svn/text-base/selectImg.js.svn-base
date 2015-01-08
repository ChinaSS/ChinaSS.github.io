define (["jquery","Dialog","Mustache","InputSelect/inputSelect"],function($,baseDialog,mustache,inputSelect){
			var selectImgs=function (inputType,renderPosition,pageNumber,imgType,imgName,imgSize){
			   	var output ="";
		        var dialog ;
		        var selectFlag=true;
		        var num;
		        var pageSize=9;
				if(!pageNumber){
					pageNumber=1;
				}
				if(!imgType){
					imgType="";
				}
				if(!imgName){
					imgName="";
				}
				if(!imgSize){
					imgSize="";
				}
				 $.get(getServer() +"/picture/page?pageNumber="+pageNumber+"&pageSize=9&dictBizType="+imgType+"&titleName="+imgName+"&picSize="+imgSize,function(data){
		                var json1=$.parseJSON(data);
		                num=Math.ceil(json1.allDataCount/9);
		                if(json1!=null){
		                	json1={"imgCounts":json1.allDataCount,"imgs":json1.curPageData};
		                	if(inputType=="radio"){
		                		  $.get(getPublishServer() +"/plugin/common/selectImg/radioImg.html",function(mat){
				                        //页面
				                    	init(mat);
				                    });
		                	}else{
		                		  $.get(getPublishServer() +"/plugin/common/selectImg/checkBoxImg.html",function(mat){
				                        //页面
				                    	init(mat);
				                    });
		                	}
		                    function init(mat){
		                    	require(['css!' + getPublishServer() + '/plugin/common/selectImg/selectImg.css'], function(){
		                    	 output += mustache.render(mat,json1 );
		                    	 //预览窗口,为弹出框增加操作按钮
		                            var buttons = [];
		                            buttons.push(
		                                {name:"确定",callback:function(){
		                                    //此处写扩展代码
		                                	function setPicName( id ){
		                                		return getServer() + '/file/download?fileId=' + id + '&bizType=30';
		                                	}
		                                	
		                                    var $ImgChecked=$(".matImgs ul li input:checked").prev("img");
		                                    if(inputType=="radio"){
		                                    	 var imgId=$ImgChecked[0].id;
			                                    $(renderPosition).val(setPicName(imgId));
			                                    dialog.hide();
		                                    }else{
		                                    	   for(var i=0;i<$ImgChecked.length;i++ ){
		                                    		   var imgId=$ImgChecked[i].id;
		                                    		   $(renderPosition+(i+1)).val(setPicName(imgId));
		   		                                    dialog.hide();
				                                    }
		                                    }
		                                }}
		                            );
		                             dialog = baseDialog({
		                                id:"TestDialog",
		                                cache:false,                 //是否缓存，默认为true
		                                title:"请选择图片",
		                                width:"566px",
		                                height:"500px",
		                                body:"img",
		                                dialogSize:"",               //modal-lg或modal-sm
		                                buttons:buttons
		                            });
		                            //可以通过返回的dialog对象调用相关方法,图片渲染到弹出窗口
		                            dialog.setBody(output);
		                            $('<div class="option"><label>图片类型:</label><span><input id="imgType"></input></span><br/><label>图片名称:</label><input type="text" id="imgName">	<label>图片尺寸:</label><input type="text" id="imgSize"><button type="button" class="btn btn-success query">查询</button></div>').prependTo(".matImgs");
		                            $.get(getServer() +"/dictTree/queryByType?dictType=D_BUSINESS_TYPE",function(data){
		                            	data=$.parseJSON(data);
		                            	inputSelect({
			                                id : "imgType",
			                                type : "select",
			                                data : data.curPageData
			                            });
		                            });
		                            
		                            dialog.show();
		                            $(".matImgs ul li img").promise().done(
		                            		function(){
		        		             		    $(".matImgs ul li img").click(
		        	                			        function(evt){
		        	                			            var $checkbox =  $(this).next("input[type="+inputType+"]");
		        	                			            if(!$checkbox.prop("checked")){
		        	                			                $checkbox.prop("checked",true);
		        	                			                if(inputType=="radio"){
		        	                			                	$("img").css({"border":"0px"});
		        	                			                }
		        	                			                $(this).css({"border":"red 2px solid","width":" 95%;","height":"120px","padding-left":"0px"});
		        	                			              
		        	                			            } else {
		        	                			                $checkbox.prop("checked", false);
		        	                			                $(this).css({"border":"0"});
		        	                			            }
//		        	                			            evt.stopPropagation();
		        	                			        }
		        	                			    );
		        	                			    $(".matImgs ul li input[type="+inputType+"]").click(
		        	                			        function(evt){
		        	                			            var $img =  $(this).prev("img");
		        	                			            if($(this).prop("checked")){
		        	                			            	if(inputType=="radio"){
		        	                			                	$("img").css({"border":"none"});
		        	                			                }
		        	                			                $img.css({"border":"red 2px solid","width":" 95%;","height":"120px","padding-left":"0px"});
		        	                			                
		        	                			            }
		        	                			            else{
		        	                			                $img.css({"border":"0"});
		        	                			            }
//		        	                			            evt.stopPropagation();
		        	                			        }
		        	                			    );
		                            			
		                            		});
	                            	 //条件查询
		                            $(".option .query").click(
		                            function(){
		                            	imgName=$(".option #imgName").val();
		                            	alert("条件查询"+imgName);
		                            	pageNumber=1;
		                            	pageSize="";
		                           	 $.get(getServer() +"/picture/page?pageNumber="+pageNumber+"&pageSize=9&dictBizType="+imgType+"&titleName="+imgName+"&picSize="+imgSize,function(data){
										 var json1=$.parseJSON(data);
										 if(json1.curPageData){
											 json1={"imgCounts":json1.allDataCount,"imgs":json1.curPageData};
											 output = mustache.render(mat,json1 );
											 $(".matImgs ul").html("");
											 $(".matImgs ").append(output);
										 }
									 });
		                            }		
		                            );
		                            //加载更多
									 $(".modal-body").scroll(function(evt){
											if($(this).scrollTop()+ $(this).height()>=$(".matImgs").height()){
												pageNumber++;
												if(pageNumber<num){
													 $.get(getServer() +"/picture/page?pageNumber="+pageNumber+"&pageSize=9&dictBizType="+imgType+"&titleName="+imgName+"&picSize="+imgSize,function(data){
														 var json1=$.parseJSON(data);
														 if(json1.curPageData){
															 json1={"imgCounts":json1.allDataCount,"imgs":json1.curPageData};
															 output = mustache.render(mat,json1 );
															 $(".matImgs ").append(output);
														 }
													 });
												}else{
													alert("没有更多图片了");
												 }
												
											}
//											 evt.stopPropagation();
					                        });
		    					});
		                    }
		                }
		            }
		        );
			}
		return {
			selectImgs:selectImgs
		}
	}
);


