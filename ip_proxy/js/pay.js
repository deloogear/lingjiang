$(function () {

        $public.init(1);
       // pay_day.html
       $(document).on("click",".coupons_ok",function () {
           $(".coupons_ok").toggleClass("coupons_ok_act");
       });

        $(document).on("click",".pay_weks",function () {
                var a  = $(this).index(".pay_weks");
                $(".pay_weks").eq(a).addClass("pay_weks_act").siblings(".pay_weks").removeClass("pay_weks_act");
        });

        $(document).on("click",".payment1",function () {
            $(".payment1").addClass("payment_act1").siblings(".payment").removeClass("payment_act2 payment_act3");
        });

        $(document).on("click",".payment2",function () {
            $(".payment2").addClass("payment_act2").siblings(".payment").removeClass("payment_act1 payment_act3");
        });

        $(document).on("click",".payment3",function () {
            $(".payment3").addClass("payment_act3").siblings(".payment").removeClass("payment_act1 payment_act2");
        });

        $(document).on("click",".port_sp",function () {
            var a  = $(this).index(".port_sp");
            $(".port_sp").eq(a).addClass("port_sp_act").siblings(".port_sp").removeClass("port_sp_act");
            $(".record").eq(a).addClass("record_act").siblings(".record").removeClass("record_act");
        });
    $(".coupons").on("click",function(){
        $(this).hide();
        $(".coupons_block").show();
    });
    $(".coupons_cancel").on("click",function(){
        $(".coupons").show();
        $(".coupons_block").hide();
    });

});