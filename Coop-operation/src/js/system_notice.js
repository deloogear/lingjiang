/**
 * Created by deloo on 2016/8/5.
 */
var system_notice=(function(){
    function init(){
        set_notice_slide();
    }
    function set_notice_slide(){
        var items=$(".sn-items"),
            default_h=60,
            default_bh=20;
        items.on("click",function(){
            if($(this).hasClass("active")){
                $(this).removeClass("active");
            }else{
                items.removeClass("active");
                $(this).addClass("active");
            }
            fresh_block();
        });
        function fresh_block(){
            items.each(function(){
                var bh=$(this).find(".snt-detail").height();
                console.log(bh);
                $(this).find(".sn-block").height(default_h+bh-default_bh);
            });
        }
    }
    return init;
})();

$(function(){
    system_notice();
});