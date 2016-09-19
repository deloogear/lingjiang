/**
 * Created by deloo on 2016/8/29.
 */
$public=(function(){
    var nav;
    /*初始化*/
    function init(i) {
        nav=$(".menu");
        menu(i);
        control();
    }
    /*菜单*/
    function menu(i){
        nav.find("a").removeClass("active");
        if(parseInt(i)>=0){
            nav.find("a").eq(i).addClass("active");
        }
    }
    /*input */
    function control(){
        var cancel=$(".pay_li>.cancel_input");
        cancel.on("click",function(){
            $(this).prev().val("");
        });
    }
    /*cookie*/
    function cookie() {
        //写cookies
        function setCookie(name,value,day){
            var Days = parseInt(day)>=0?day:1,
                exp = new Date();
            exp.setTime(exp.getTime() + Days*24*60*60*1000);
            document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
        }
        //读取cookies
        function getCookie(name){
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        }
        //删除cookies
        function delCookie(name){
            var exp = new Date(),
                cval=getCookie(name);
            exp.setTime(exp.getTime() - 1);
            if(cval!=null)
                document.cookie= name + "="+cval+";expires="+exp.toGMTString();
        }
        return{
            get:getCookie,
            set:setCookie,
            delete:delCookie
        }
    }
    return {
        init:init,
        cookie:cookie()
    };
})();