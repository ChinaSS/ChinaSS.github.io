define(["HomeApp","UtilDir/util","UtilDir/grid","UtilDir/treeDialog","CommonDir/dict","CommonDir/dictTree"],
		function(HomeApp,util,grid,treeDialog,dict,dictTree){
/*
 * define的注释:待补充
   service中的内容:
*/	
   
    var showSlidebar = function(){
        //弹出侧边栏
        util.slidebar({
            id:"newsEditPanel",
            width:"500px",
            afterLoad:function(){
                validate();
            }
        });
    };
     var  newsListInit = function(id,$scope){//新闻列表初始化
    	 
        var config = {
            id:"newsList",
            placeAt:"newsListId",            //存放Grid的容器ID
            pageSize:10,                         //一页多少条数据
            index:"checkbox",                   //首列为单选[radio]还是多选[checkbox],默认checkbox
            layout:[                           //列表各标题
                {name:"新闻标题",field:"newsTitle",click:function(e){//查看某个新闻
                    var id = e.data.row.newsId;
                    $.ajax({
                        "url":getServer()+"/news/query?newsId="+id,
                        async:false,
                        dataType:"json",
                        "success":function(d){//操作成功后调整
                            //设置资源数据
                            $scope.$apply(function () {
                                $scope.news.entity = d.entity;
                                $scope.news.artTypeList=dictTree.artTypeList();//12大艺术门类
                                $scope.news.newsTypeCodes=dict.newsTypeCodes();//新闻类型
                                $scope.news.newsSortCodes=dict.newsSortCodes();//新闻类别
                            });
                            showSlidebar();
                        }
                    });
                }},
                {name:"艺术类别",field:"artTypeName"},
                {name:"新闻类别",field:"newsSortName"},
                {name:"新闻类型",field:"newsTypeName"}
                
            ],//end layout
            
            toolbar:[
                {name:"添加",class:"fa fa-plus-circle",callback:function(event){
                    //清空资源数据
                    $scope.$apply(function () {
                        $scope.news.entity = {};
                        $scope.news.artTypeList=dictTree.artTypeList();//12大艺术门类
                        $scope.news.newsTypeCodes=dict.newsTypeCodes();//新闻类型
                        $scope.news.newsSortCodes=dict.newsSortCodes();//新闻类别
                    });
                    showSlidebar();
                }},
                /*{name:"编辑",class:"fa fa-edit",callback:function(event){
                 console.log('编辑')
                 }},*/
                {name:"删除",class:"fa fa-trash-o",callback:function(event){
                    var selected = gridInstance.getSelectedRow();
                    if(selected.length){
                        var newsIds = [];
                        for(var i= 0,item;item=selected[i++];){
                        	newsIds.push(item.newsId);
                        }
                        $.ajax({
                            "url":getServer()+"/news/remove",
                            "type":"POST",
                            "data":"newsIds="+newsIds.join(","),//newsIds为后台定义的要接受的参数
                            "dataType":"json",
                            "success":function(data){
                                if(data.status=="200"){
                                    //表格刷新
                                 	newsListInit("root",$scope);
                                    util.alert("删除成功.");
                                }
                            },
                            "error":function(XMLHttpRequest, textStatus, errorThrown ){
                                util.alert("删除失败.");
                            }
                        });
                    }else{
                        util.alert("请选择要删除的数据.");
                    }
                }}
            ],//end toolbar
            
            data:{type:"URL",value:getServer()+"/news/page"} //指定获取数据的url
        };//end config
        
        gridInstance = grid.init(config);//用config初始化grid
    
     };//end 用户列表初始化
     
     var validate = function(){//校验
         
         $("#newsFormId").validate({//数据验证   为什么外面还要套一层?
             rules:{//要校验的字段及校验规则
            	 newsTitle:{//新闻标题
 	               chineseLength:256
            	},
            	dictArtType:{//艺术类别
             	  chineseLength:40
             	},
             	templateId:{//选择模板
             		required:true,
             		chineseLength:40
             	},
             	dictNewsSort:{//新闻类别
             		chineseLength:32
             	},
             	dictNewsType:{//新闻类型
             		chineseLength:32
             	}
        
             },
             messages: {//校验提示信息
             }
         });
         
     };//end  validate
     
    //return中定义一个变量,并制定变量对应的函数,在ctrl中调用service中的这个变量就是调用变量对应的方法
    return {
        newsListInit:newsListInit
    };
});