(function($) {
    $.fn.myPlugin = function(m) {
    	m = $.extend({
            event: 'mouseover', // 触发事件
            show: 'fadeIn', // 显示方式
            time: '1000', //图片轮换间隔时间
            current: 'on', // 选中数组按钮
            c_width: '800', // 图片的宽度
            c_height:'360' // 图片的高度
    	},m);
        var $obj = $(this);
        // 追加箭头
        $obj.append('<div class="direction"><div class="arrows_left"></div><div class="arrows_right"></div></div>');
        // 追加原点
        $obj.append('<ol class="num"></ol>');
        var $num_on = $obj.children('ol.num'),
            $arrow_right = $obj.find(".arrows_right"),
            $arrow_left = $obj.find(".arrows_left"),
            $pic_li = $(".picture li"),
            t, // 定时器
            $pic_li_length = $(".picture li").size();
            
        //遍历图片上的文字
        $pic_li.each(function() {
            var index = $(this).index();
            var focus = $(this).find("img"),
                alt = focus.attr("alt"), // 获取图片的alt
                title = focus.attr("title"), // 获取图片的title
                Width = focus.width(), // 获取图片的宽度
                Height = focus.height(); // 获取图片的高
            $(this).append('<p>'+ alt +'</p><strong>'+ title +'</strong>');
            $obj.css({width:m.c_width,height:parseInt(140)+ parseInt(m.c_height)});
        });
      
        for(i =1;i<=$pic_li_length;i++){
            $num_on.append('<li>'+i+'</li>');
        };
        var rr = $obj.children('ol.num');
        var rrLi = rr.children('li');
        //点击数字触发
        rrLi.each(function() {
            var index = $(this).index();
            if(index == 0){
                $(this).addClass('on').siblings('li').removeClass('on');
            }
            $(this).on(m.event,function() {
                stop();
                $(this).addClass('on').siblings('li').removeClass('on');
                speed(index);
            });
        });
       
        //点击向右箭头
        $arrow_right.click(function () {
            changePic('R');
        });
        //点击向左箭头
        $arrow_left.click(function () {
            changePic();
        });
        //点击箭头触发事件
        function changePic(arrow) {
            var n = rr.children('li.on').index(); //3 0 1 2     -1 0 1 2
            var i;
            if(arrow == 'R') {
                i = n + 1; // 1 2 3 4
                if (i == $pic_li_length) {
                    i = 0;
                }
            } else {
                i = n - 1; // 0 1 2 -1
            }
            numOn(i);
            speed(i);
        }
        //图片显示方式
         function speed(n) {
            if(m.show == "fadeIn") {
                $pic_li.eq(n).fadeIn("fast").siblings('li').fadeOut("fast");
            }
        };
        //相对应的数字按钮
        function numOn (n) {
            rrLi.eq(n).addClass(m.current).siblings('li').removeClass(m.current);
        };
        //图片轮播
        roll();
        function roll () {
            t = setInterval(function() {changePic('R')},m.time);
        }
        //鼠标放在图片上时停止轮播
        $obj.hover(function() {
            // 清除定时器
            clearInterval(t);
        });
        //鼠标离开时图片继续轮播
        $obj.mouseleave(function() {
            roll();
        });
    };
})(jQuery);
