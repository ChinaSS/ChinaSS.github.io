require(['jquery'], function (jquery) {
	(function ($) {
	    $.fn.setImgMove = function (option) {//mode
	        var effect = option.effect;
	        var picNo = option.picNo;
	        var speed = option.speed;
	        var oDivWidth;
	        if (effect == "fade") {
	            var $clName = $(this).find("img");
	            imgFade($(this));
	        } else if (effect == "rolling") {
	            rolling($(this).selector, picNo, parseInt(speed));
	        } else if (effect == "solRolling") {
	            solRolling($(this).selector);
	        } else if (effect == "accordion") {
	            accordion($(this).selector);
	        }
	        return this;
	    }
	
	    /*
	     无缝滚动
	     */
	    function rolling(className, num, speed) {
	        var csh = 0;//本模块首次初始化
	        var $oDiv = $(className);
	        var $oUl = $(className).find('ul');
	        var $aLi = $(className).find('ul').find('li');
	        var $firstLi=$(className).find('ul').find('li:first');
	        var $img = $(className).find('ul').find('li').find('img');
	        //div展现窗口
	        var rollWidth = $(className).parent().width();
	        alert("高度className"+$(className).parent().height());
	        $img.css({"width":$(className).parent().width()/$img.length,"height":$(className).parents(".pluginBody").height()});
	        
	        if (num == null || num == 0 || num == "0") {
	            if ($firstLi.width() * $aLi.length > rollWidth) {
	                $oDiv.css("width", rollWidth + 'px');
	            } else {
	                //offsetWidth
	                $oDiv.css("width", $firstLi.width() * $aLi.length);
	            }
	        } else {
	            if ($firstLi.width() * num > rollWidth) {
//	                $oDiv.css("width", "1000px");

	                $oDiv.css("width", "100%");
	            } else {
//	                $oDiv.css("width",$firstLi.width() * num);
	            	 $oDiv.css("width", "100%");
	            }
	        }
	        $oDiv.css({"overflow": "hidden", "position": "relative", "height": $aLi.height()});
	        if (csh == 0) {
	            $aLi.clone(true).appendTo($oUl);
	            $aLi = $(className).find('ul').find('li');           
	            $oUl.css("width", $firstLi.width() * $aLi.length);
	            csh++;
	        }
	        $(className + " img.prev").remove("");
	        $(className + " img.next").remove("");
	        $("<img src='"+getPublishServer()+"/plugin/slider/images/prev.png' class='prev' alt='向左'>").appendTo($oDiv);
	        //$oDiv.offset().left
	        $(className + " .prev").css({"position": "relative", "z-index": "99999", "top": $img.height() / 2, "left": "0px"});
	        $(className + " .prev").click(function () {
	        	speed=-2;
	        });
	        $("<img src='"+getPublishServer()+"/plugin/slider/images/next.png' class='next' alt='向右'> ").appendTo($oDiv);
	        $(className + " .next").css({"position": "absolute", "z-index": "99999", "top": $img.height() / 2, "left": $oDiv.width() - 20});
	        $(className + " .next").click(function (evt) {
	        	speed=2
	        });
	        $oUl.css({"position": "absolute", "left": "0px"});
	        var oUlWidth = $oUl.width();
	        function move(){
	            var oulLeft = parseInt($oUl.css("left").substring(0, $oUl.css("left").lastIndexOf('p')));
	            if (oulLeft < (-$oUl.width() / 2)) {
	                $oUl.css("left", 0 + 'px');
	            }
	            if (oulLeft > 0) {
	                $oUl.css("left", parseInt((-oUlWidth) / 2) + 'px');
	            }
	            if (speed == null || speed == "") {
	                speed = 4;
	            }
	            $oUl.css("left", parseInt($oUl.css("left").substring(0, $oUl.css("left").lastIndexOf('p'))) + speed + 'px');
	        }
	         $oDiv.timer= setInterval(move,30);
	        $(className).mouseover(
	            function(evt){
	                clearInterval( $oDiv.timer);
	            }
	        );
	        $(className).mouseout(
	            function(evt){
	                $oDiv.timer= setInterval(move,30);
	            }
	        );
	    }
	
	    /**
	     * 删除相同的li元素
	     */
	    function liMove(obj) {
	        var temp = '';
	        if (obj.length > 1) {
	//                  $(className + ' ul>li')
	            obj.each(function () {
	                if (temp.indexOf($(this).html()) != -1) {
	                    $(this).remove();
	                } else {
	                    temp += $(this).html();
	                }
	
	            })
	        }
	    }
	})(jquery)
});