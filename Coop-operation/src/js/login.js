/**
 * Created by deloo on 2016/8/3.
 */
var reg=(function(){
    function init(){
        var wh=$(window).height(),
            dh=$("html body").height(),
            lg_main=$(".login_main");
        if(dh<wh){
            lg_main.height(lg_main.height()+wh-dh);
        }
    }

    return init;
})();
$(function(){
    reg();
});