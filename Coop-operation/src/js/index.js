var index_vm=(function(){
   function init(){
       var block1=$(".index-block1");
       $(window).on("scroll",function(){
           var wt=$("html body").scrollTop(),
               wh=$(window).height(),
               bt=block1.offset().top;
           if((wt+wh-bt)>200){
               block1.addClass("active");
           }
       });
   }
    return {
        init:init
    }
})();
$(function(){
    index_vm.init();
});