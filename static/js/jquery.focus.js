(function($) {
    $.fn.myPlugin = function(m) {
    	m = $.extend({
            event: 'mouseover', // 触发事件
            show: 'fadeIn', // 显示方式
            time: '2000', //图片轮换间隔时间
            current: 'on' // 选中数组按钮
    	},m);
        var $obj = $(this);
        // 追加左右箭头
        $obj.append('<div class="direction"><div class="arrows_left"></div><div class="arrows_right"></div></div>');
        // 追加数字按钮
        $obj.append('<ol class="num"></ol>');
        var $num_on = $obj.children('.num'),
            $arrow_right = $obj.find(".arrows_right"),
            $arrow_left = $obj.find(".arrows_left"),
            $pic_li = $(".picture li"),
            $pic_li_a = $pic_li.find('a'),
            t, // 定时器
            $pic_li_length = $(".picture li").size();

        // 图片轮播
        roll(); 

        // 浏览器尺寸变化
        $(window).resize(function(){
           resizePic();
        });   

        //遍历图片上的文字
        $pic_li.each(function() {
            var index = $(this).index();
            var focus = $(this).find("img"),
                src = focus.attr("src"), // 获取背景图片路径
                alt = focus.attr("alt"), // 获取图片的alt
                title = focus.attr("title"); // 获取图片的title
            $(this).css("background-image","url(" + src + ")"); //动态添加背景图片
            $(this).append('<p>'+ alt +'</p><strong>'+ title +'</strong>');  //给每个图片添加不同的标题
            var color = ["red","blue","yellow","green","pink"];  //设置一个数组随机改变图片标题颜色（根据自己需求，可不写）
            $(this).find('p').css({ // 随机改变图片标题颜色
                color: color[Math.floor(Math.random()*$pic_li_length)],
                left:"0"
            });
            //尺寸发生变化
            resizePic();
        });
        // 根据图片数量动态添加数字按钮
        for(i =1;i<=$pic_li_length;i++){
            $num_on.append('<li>'+i+'</li>');
        };

        var rr = $obj.find('.num');
        var rrLi = rr.children('li');
        //点击数字触发
        rrLi.each(function() {
            var index = $(this).index();
            if(index == 0){
                $(this).addClass(m.current).siblings('li').removeClass(m.current);
            }
            $(this).on(m.event,function() {
                numOn(index);
                speed(index);
            });
        });

        // 浏览器尺寸发生变化
        function resizePic () {
            var  Width = $pic_li_a.children('img').width(); // 获取图片的实际宽度
            if ($(window).width() < Width) { //$(window).width():设置浏览器宽度
                $pic_li_a.children('img').css("display","block");
            } else {
                $pic_li_a.children('img').css("display","none");
            };
        }

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
            var n = $num_on.children('li.'+ m.current).index(); 
            var i;
            if(arrow == 'R') {
                i = n + 1;
                if (i == $pic_li_length) {
                    i = 0;
                }
            } else {
                i = n - 1; 
            }
            numOn(i);
            speed(i);
        };

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
        function roll () {
            t = setInterval(function() {changePic('R')},m.time);
        };

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
