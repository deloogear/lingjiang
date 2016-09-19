/**
 * Created by deloo on 2016/8/29.
 */
$(function(){
    $public.init(0);
    var sections=$(".index-content>section"),
        current,
        lock=false,
        nav=$(".i-anchor a"),
        length=sections.length,
        am=[
            {/*第一屏*/
                in:function(){
                    sections.eq(0).addClass("active");
                    nav.eq(0).addClass("active");
                    $(".h-main-index .links").addClass("active");
                    $(".h-main-index .download").removeClass("active");
                    setTimeout(function(){
                        $(".fr-icon").addClass("active");
                    },500);
                },
                out:function(){
                    sections.eq(0).removeClass("active");
                    nav.eq(0).removeClass("active");
                    $(".h-main-index .links").removeClass("active");
                    $(".h-main-index .download").addClass("active");
                    $(".fr-icon").removeClass("active");

                },
                in_time:400,
                out_time:400
            },
            {/*第二屏*/
                in:function(){
                    sections.eq(1).addClass("active");
                    nav.eq(1).addClass("active");
                },
                out:function(){
                    sections.eq(1).removeClass("active");
                    nav.eq(1).removeClass("active");
                },
                in_time:400,
                out_time:400
            },
            {/*第三屏*/
                in:function(){
                    sections.eq(2).addClass("active");
                    nav.eq(2).addClass("active");
                },
                out:function(){
                    sections.eq(2).removeClass("active");
                    nav.eq(2).removeClass("active");
                },
                in_time:400,
                out_time:400
            },
            {/*第四屏*/
                in:function(){
                    sections.eq(3).addClass("active");
                    nav.eq(3).addClass("active");
                },
                out:function(){
                    sections.eq(3).removeClass("active");
                    nav.eq(3).removeClass("active");
                },
                in_time:400,
                out_time:400
            },
            {/*第五屏*/
                in:function(){
                    sections.eq(4).addClass("active");
                    nav.eq(4).addClass("active");
                    $(".arr-next").hide();
                    am4_timer_flag=false;
                    set_nums($(".ic5-n-users .nums-str"));
                    set_nums($(".ic5-n-uses .nums-str"));
                    set_nums($(".ic5-n-ip .nums-str"));
                },
                out:function(){
                    sections.eq(4).removeClass("active");
                    nav.eq(4).removeClass("active");
                    $(".arr-next").show();
                    am4_timer_flag=true;
                },
                in_time:400,
                out_time:400
            }
        ],
        am4_timer_flag;
    init_scroll();
    function set_section(index){
        if(lock){
            return;
        }
        if(!index){
            index=0;
        }
        if(index==current||index>=length||index<0){
            return;
        }
        lock=true;
        if(typeof(current)!="undefined"){
            am[current].out();
            setTimeout(function(){
                am[index].in();
                current=index;
                setTimeout(function(){
                    lock=false;
                },am[index].in_time);
            },am[current].out_time);
        }else{
            am[index].in();
            current=index;
            setTimeout(function(){
                lock=false;
            },am[index].in_time);
        }
    }
    function init_scroll(){
        var scrol=$(".ic-4-scro"),
            item=scrol.find("li"),
            nav=$(".ic-4-ft a"),
            length=scrol.length;
        set_index(0);
        nav.on("click",function(){
            set_index($(this).index());
        });
        function set_index(i){
            item.removeClass("active").eq(i).addClass("active");
            nav.removeClass("active").eq(i).addClass("active");
        }
    }
    function init_binds() {
        $(document).on("mousewheel",function(e) {
            var ot=$("html body").scrollTop(),
                wh=$(window).height(),
                dh=$("html").height();
            if(e.deltaY>0&&ot<=0)
            {
                set_section(current-1);
            }if(e.deltaY<0&&(ot+wh)>=dh)
            {
                set_section(current +1);
            }
        });
        nav.on("click",function(){
            set_section($(this).index());
        });
    }
    function set_nums(dom){
        var val=parseInt(dom.data("num"));
        if(!val||val<=0){
            return;
        }
        var step=40;
        timer_fun();
        function timer_fun(t,cond){
            if(!cond){
                cond=0;
            }
            if(!t){
                t=0;
            }
           if(t>=val) {
               t=val;
           }
            dom.text(set_str(t));
            if(!am4_timer_flag&&t<val){
                var delay=Math.abs(Math.sin(cond*90))*80;
                setTimeout(function(){timer_fun(t+val/step,cond+1)},delay)
            }
        }
        function set_str(v,t,w){
            if(!t){
                t="";
            }
            if(!w){
                w=1
            }
            if((w-1)%3==0&&w!=1){
                t=","+t;
            }
            t=parseInt((v%Math.pow(10,w))/Math.pow(10,w-1))+t;
            if((parseInt((v/Math.pow(10,w)))>0)&&v>0){
                return set_str(v,t,w+1);
            }else{
                return t;
            }
        }
    }
    var index_flag=$public.cookie.get("index-shown");
    if(index_flag=="true"){
        $(".fr-icon").hide();
        $(".index-text").hide();
        set_section();
        setTimeout(function(){
            $(".fr-icon").show().addClass("shown");
            init_binds();
        },600);
    }else{
        $(".index-text").removeClass("active");
        setTimeout(function(){
            set_section();
            $(".index-text").hide();
        },2800);
        $(".fr-icon").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){
            init_binds();
        });
        $public.cookie.set("index-shown","true",30);
    }
});
