//支付成功
modal({
    title:"",
    message:"恭喜您支付成功<br>2s后返回个人中心",
    type:"success",/*success,power,error,info,confirm*/
    btn:[
        {
            text:"确定",
            class:"",/*danger,success,cancel*/
            callback:function(dom){
                return true;/*是否关闭*/
            }
        }
    ],
    /*        callback:function(){
     setTimeout(function(){
     /!*返回用户中心*!/
     window.location.href="ucenter.html";
     },2000)
     }*/
});


//支付失败
modal({
    title:"",
    message:"很抱歉, 您的支付未成功!",
    type:"failed",
    btn:[
        {
            text:"继续支付",
            class:"",
            callback:function(dom){
                /*继续支付方法*/
                return true;
            }
        },
        {
            text:"返回个人中心",
            class:"cancel",
            callback:function(dom){
                /*返回个人中心*/
                window.location.href="ucenter.html";
                return true;
            }
        }]
});

//届时删除
</noscript>