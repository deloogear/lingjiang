/**
 * Created by deloo on 2016/8/30.
 */
$(function(){
    $public.init();
    var page_fun={
        /*各模块触发方法*/
        "modules":{
            "info":{
                name:"info",
                selector:"#mt-info",
                on_open:function(name){
                    /*加载效果*/
                   $uc.actions().loading.show();
                    /*控制锁 防止异步打开多个*/
                   $uc.lock(true);
                    /* $.ajax(); 模拟异步*/
                   setTimeout(function(){
                       /*解锁控制*/
                       $uc.lock(false);
                       /*修改页面标志*/
                       window.info_flag=false;
                       /*手动打开页面, 并跳过on_open 方法*/
                       $uc.control().open(name,true);
                       /*关闭加载*/
                       $uc.actions().loading.hide();
                       console.log("info打开");
                   },1000);
                    /*阻止直接打开打开,异步内部进行手动打开*/
                    return false;
                },
                on_close:function(name,to){
                    console.log("info关闭");
                    /*页面保存标志*/
                    if(!window.info_flag){
                        modal({
                            title:"",
                            message:"您的信息尚未保存,是否关闭?",
                            type:"confirm",/*success,power,error,info,confirm*/
                            btn:[
                                {
                                    text:"确定",
                                    class:"",/*danger,success,cancel*/
                                    callback:function(){
                                        window.info_flag=true;
                                        $uc.control().open(to);
                                        return true;/*是否关闭*/
                                    }
                                },
                                {
                                    text:"取消",
                                    class:"",
                                    callback:function(dom){
                                        return true;/*是否关闭*/
                                    }
                                }
                            ]
                        });
                        return false;
                    }
                }
            },
            "recharge":{
                name:"recharge",
                selector:"#mt-recharge",
                on_open:function(){
                    console.log("recharge打开");
                },
                on_close:function(){
                    console.log("recharge关闭");
                }
            },
            "log":{
                name:"log",
                selector:"#mt-log",
                on_open:function(){
                    console.log("log打开");
                },
                on_close:function(){
                    console.log("log关闭");
                }
            },
            "record":{
                name:"record",
                selector:"#mt-record",
                on_open:function(){
                    console.log("record打开");
                },
                on_close:function(){
                    console.log("record关闭");
                }
            }
        },
        "logout":function(){
                /*退出方法*/
                console.log("执行退出");
            return true;
        },
        "init":function(){
            console.log("执行页面初始化")
        }
    };
    /*执行模块初始化*/
    window.$uc=model(page_fun);
    $uc.init();
    center();
});
/*页面事件*/
function center(){
    init();
    /*初始化入口*/
    function init(){
        user();
        info();
        record();
    }
    /*用户信息处理*/
    function user(){}
    /*用户资料页*/
    function info(){
        var password_edit=info_modal(".m-edit-password"),
            email_edit=info_modal(".m-edit-email"),
            phone_edit=info_modal(".m-edit-phone");
        $(document).on("click.info","#info-bind-phone",function(){
            $(".info-phone").hide();
            $(".info-phone-edit").show();
        });
        $(document).on("click.info","#info-bind-email",function(){
            $(".info-email").hide();
            $(".info-email-edit").show();
        });
        $(document).on("click.info",".info-phone-edit>a",function(){
            $uc.actions().success("手机号绑定完成!",function(){
                $(".info-phone").show();
                $(".info-phone-edit").hide();
            });
        });
        $(document).on("click.info",".info-email-edit>a",function(){
            $uc.actions().success("邮箱绑定完成!",function(){
                $(".info-email").show();
                $(".info-email-edit").hide();
            });
        });
        $(".info-name>a").on("click.info",function(){
            password_edit.open();
        });
    }
    /*充值记录*/
    function record(){
        var sel=$(".tab-class-sel"),
            tabs=$(".dt-record"),
            tab_online=$(".recharge-online"),
            tab_card=$(".recharge-card");
        sel.on("click.log",">h4",function(){
            sel.addClass("active");
        });
        sel.on("click",".ts-list>li",function(){
            set_table($(this).data("type"));
            sel.removeClass("active");
        });
        $(document).on("click",function(e){
            var target=e.target;
            if($(target).parents(".tab-class-sel").length<=0){
                sel.removeClass("active");
            }
        });
        function set_table(type){
            type=type?type:"online";
            tabs.hide();
            tabs.filter(".recharge-"+type).show();
            sel.find(">h4>label").text(sel.find(".ts-list>li[data-type='"+type+"']").text());
        }
        set_table();
    }
    /*弹层通用方法*/
    function info_modal(selector){
        var i_modal=$(selector);
        function open(dom){
            dom.show();
            setTimeout(function(){
                dom.addClass("active");
            },50);
        }
        function close(dom){
            dom.removeClass("active");
            setTimeout(function(){
                dom.hide();
            },200);
        }
        i_modal.find(".cancel").on("click",function(){
            close(i_modal);
        });
        return {
            open:function(){open(i_modal)},
            close:function(){close(i_modal)}
        }
    }
}
