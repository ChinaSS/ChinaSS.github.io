/**
 * 树形字典管理
 * @author gaodsh@css.com.cn
 */
define(["OpusDir/opusSupport","ZTree","css!ZTreeCss"],function(support){
    var Directive = {};
    
    Directive.treeType = function ($scope, element, attrs) {
        var setting = {
            data: {
                simpleData: {
                    enable : true
                }
            },
            check: {
				enable: true
			}
        };
        $.fn.zTree.init(element, setting,$scope.opus.typeTree.list);
        //监听，如果有变动则重新渲染树
        $scope.$watch('opus.typeTree.list',function(){
            $.fn.zTree.init(element, setting,$scope.opus.typeTree.list);
        });
    };


    return Directive;
});
