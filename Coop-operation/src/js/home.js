/**
 * Created by deloo on 2016/8/4.
 */
var home=(function(){
    function init(){
        set_main_height();
        set_cus_select();
        $(window).on("resize",function(){
            set_main_height();
        });
        set_date_picker();
        function set_main_height(){
            var wh=$(window).height(),
                dh=$("html body").height(),
                main=$(".main");
            if(main.height()<=800){
                main.height(800);
            }
            if(wh>dh){
                main.height(wh);
            }
            $(".m-content").mCustomScrollbar({
                scrollButtons:{enable:true},
                theme:"minimal-dark",
                scrollbarPosition:"outside"
            });
            $(document).on("click",".md-dp-ensure",function(){
                $md_datepicker.close();
            });
        }

    }
    /*自定义下拉*/
    function set_cus_select(){
        var cue_sel=$(".cus_select");
        cue_sel.each(function(i){
            $(this).css("z-index",100-i);
        });
        cue_sel.on("click",function(e){

            var target=e.toElement||e.target||e.currentTarget;
            cue_sel.find(".cus_ops").hide();
            var dom=$(this);
            var ops=dom.find(".cus_ops");
            if($(target).parents(".cus_ops").length<=0){
                ops.show();
            }
        });
        $(".cus_ops li").on("click",function(){
            var text=$(this).text(),
                val=$(this).data("value");
            var sel=$(this).parents(".cus_select");
            if(sel.length>0){
                sel.find(">span").text(text);
                sel.find("input").val(val);
                sel.find(".cus_ops").hide();
            }
        });
    }
    /*设置date picker*/
    function set_date_picker(){
        if(!$md_datepicker){
            return ;
        }
        $md_datepicker.init({'is_range':true});
        $(document).on("click",".md-date",function(){
            $md_datepicker.open();
        });
    }
    return init;
})();
$(function(){
    home();
});