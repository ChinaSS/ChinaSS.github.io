/**
 * 树形字典管理
 * @author gaodsh@css.com.cn
 */
 define(["jquery","UtilDir/grid","OpusDir/opusSupport","OpusDir/chooseSupport",'CommonDir/uploader','CommonDir/dict'],function($,grid,support,chooseSupport,uploader,dict){

    return function($compile,$scope){
        $scope.$apply(function () {
            $scope.opus = {
                    template:{
                        opusEdit: getStaticPath()+ "app/caiji/opus/views/opusEdit.html",
                        artistChoose: getStaticPath() + 'app/caiji/opus/views/artistChoose.html'
                    },
                    entity:{},
                    query:{
                    	dto:{opusName:'',opusType:''},
                    	query:function(){
                    		 support.opusListInit($scope);
                    	},
                    	reset:function(){
                    		this.dto = {opusName:'',opusType:''};
                    	}
                    },
                    saveEntity:function(){support.save($scope);},
                    validate:function(){},
                    delEntity:function(){},
                    isModify:function(){
                    	return support.isModify($scope);
                    },
                    typeTree:{
                    	list:[],
                    	id:"opusTypeTree"
                    },
                    artist:{
                    	artistName:"",
                    	add:function(){chooseSupport.showArtistPanel($scope)},
		        		onChoose:function(){
		        			chooseSupport.onChoose($scope);
		        		},
		        		list:[],
		        		del:function(index){
		        			chooseSupport.onDelete($scope,index);
		        		},
		        		delList:[]
                    },
                    csInputConfig:{
	                    type : "checkbox",
	                    searchAble: true,
	                	data: []
	                }
            };
            $scope.upload = {
	            	searchURL:"",
		            formData:{
		                bizType:dict.bizType.opus
		            }
            };
        });
        
       //列表初始化
       support.opusListInit($scope);
	   
    };
    

});
 