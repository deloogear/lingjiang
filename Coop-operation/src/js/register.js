/**
 * Created by deloo on 2016/8/3.
 */
var login=(function(){
    function init(){
        var wh=$(window).height(),
            dh=$("html body").height(),
            lg_main=$(".login_main");
        if(dh<wh){
            lg_main.height(lg_main.height()+wh-dh);
        }
        sub_form_bind();
    }
    function sub_form_bind(){
        var reg=$(".reg-form"),
            review=$(".reg-review");
        $(".sub_btn").on("click",function(){
            reg.hide();
            review.show();
            setTimeout(function(){
                review.addClass("active");
            },50);

        });
    }
    return init;
})();
$(function(){
    login();
});