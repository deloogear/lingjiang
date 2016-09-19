/**
 * Created by deloo on 2016/8/5.
 */
var present_record=(function(){
    function init(){
        set_apply_modal();
    }
    function set_apply_modal(){
        $(".pres-apply").on("click",function(){
            $("#apply_modal").show();
            setTimeout(function(){
                $("#apply_modal").addClass("active");
            },50);
        });
        $(".modal .cancel_btn").on("click",function(){
            $("#apply_modal").removeClass("active").hide();
        });
    }
    return init;
})();

$(function(){
    present_record();
});