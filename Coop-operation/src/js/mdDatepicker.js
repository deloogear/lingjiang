/**
 * Created by deloo on 2016/8/6.
 */
var $md_datepicker=
    (function(){
    var datepicker,
        dp_top,
        dp_sel,
        dp_date,
        dp_line,
        dp_bot,
        dp_day,
        dp_temp,
        dp_sel_class="sel",
        dp_act_class="active",
        months_text=["01月","02月","03月","04月","05月","06月","07月","08月","09月","10月","11月","12月"],
        the_days=[],
        is_range_sel=false,
        min_date=new Date("1900/01/01"),
        max_date=new Date(),
        current_year=max_date.getFullYear(),
        current_month=max_date.getMonth(),
        year_prev,year_next,month_prev,month_next,
        year_has_prev=true,
        year_has_next,
        month_has_prev=true,
        month_has_next,
        sel_day,
        sel_month,
        sel_year,
        ot_day,ot_month,ot_year,
        success_callback,
        submit_callback;

    /*初始化datepicker*/
    function init(obj){
        /*简单初始化*/
        if(obj&&obj.date){
            var date=new Date(obj.date);
            current_month=date.getMonth();
            current_year=date.getFullYear();
            sel_day=date.getDate();
            sel_month=date.getMonth();
            sel_year=date.getFullYear();
        }
        /*是否进行范围取值*/
        if(obj&&obj.is_range){
            is_range_sel=true;
        }

        /*初始化HTML*/
        datepicker=$('<div class="md-datepicker"><div class="md-dp-main"></div></div>');
            dp_top=$('<h4 class="md-dp-top"><span>选择日期</span></h4>');
            dp_sel=$('<div class="md-dp-sel"><div class="md-dps-year">' +
                '<span class="prev "></span><label></label>' +
                '<span class="next"></span></div>' +
                '<div class="md-dps-month"><span class="prev"></span><label></label>' +
                '<span class="next"></span></div></div>');
            dp_date=$('<div class="md-dp-days"></div>');
            dp_line=$('<div class="md-dp-dline"></div>');
            dp_bot=$('<div class="md-dp-bot"><a class="md-dp-ensure">确定</a></div>');
            dp_day=$('<a></a>');
            dp_temp=$('<span></span>');
        /*初始化绑定控件*/
            year_prev=dp_sel.find(".md-dps-year .prev");
            year_next=dp_sel.find(".md-dps-year .next");
            month_prev=dp_sel.find(".md-dps-month .prev");
            month_next=dp_sel.find(".md-dps-month .next");
        /*初次设置html*/
        get_days();
        var dpm=datepicker.find(".md-dp-main");
        dpm.append(dp_top);
        dp_sel.find(".md-dps-year label").text(current_year);
        dp_sel.find(".md-dps-month label").text(current_month);
        dpm.append(dp_sel);
        dpm.append(dp_date);
        dpm.append(dp_bot);
        $("body").append(datepicker);
        fresh_html();
        /*设置绑定事件*/
        set_date_change();
        set_btn_funs();
        /*设置关闭事件*/
        datepicker.on("click",function(e){
            var target = e.relatedTarget || e.toElement||e.target;
            var dom=$(target);
            if(dom.parents(".md-dp-dline").length<=0&&dom.parents(".md-dp-main").length<=0){
                close();
            }
        });
    }
    /*重新更换日期*/
    function get_days(){
        the_days=[];
        var date_l=new Date(current_year,current_month+1,0),
            length=date_l.getDate(),
            start_week=new Date(current_year,current_month+1,1).getDay();
            for(var s=1;s<start_week;s++){
                the_days.push(dp_temp.clone().text(" "));
            }
            for(var i=1;i<=length;i++)
            {
                var the_day=dp_day.clone(),
                 ap_class=" ";
                if(i==1){
                    ap_class+=".fir-day";
                }
                if(is_range_sel){

                    var sd=new Date(sel_year,sel_month+1,sel_day).getTime(),
                        ed=new Date(ot_year,ot_month+1,ot_day).getTime(),
                        cd=new Date(current_year,current_month+1,i).getTime();
                    if(cd==sd||cd==ed){
                        ap_class+=" "+dp_act_class;
                    }else{
                        if(sd<cd&&ed>cd){
                            ap_class+=" "+dp_sel_class;
                        }
                    }
                }
                if(sel_year==current_year&&sel_month==current_month&&sel_day==i){
                    ap_class+=" "+dp_act_class;
                }
                the_day.addClass(ap_class);
                the_days.push(the_day.text(i));
            }

    }
    /*刷新HTML*/
    function fresh_html(){
        set_p_n();
        get_days();
        dp_sel.find(".md-dps-year label").text(current_year);
        dp_sel.find(".md-dps-month label").text(months_text[current_month]);
        dp_date.html("");
        var  st_length=the_days.length;
        for(var i=0;i<st_length;i=i+7){
            if(i%7==0)
            {
                var line=dp_line.clone();
                for(var n=0;n<7;n++){
                    line.append(the_days[i+n]);
                }
                dp_date.append(line);
            }
        }
    }
    /*设置前后翻页参数*/
    function set_p_n() {
        year_has_next=current_year<max_date.getFullYear();
        year_has_prev=current_year>min_date.getFullYear();
        month_has_next=current_year<max_date.getFullYear()?true:(current_year==max_date.getFullYear())&&current_month<max_date.getMonth();
        month_has_prev=current_year>min_date.getFullYear()?true:(current_year==min_date.getFullYear())&&current_month>min_date.getMonth();
        year_has_next?year_next.removeClass("disable"):year_next.addClass("disable");
        year_has_prev?year_prev.removeClass("disable"):year_prev.addClass("disable");
        month_has_next?month_next.removeClass("disable"):month_next.addClass("disable");
        month_has_prev?month_prev.removeClass("disable"):month_prev.addClass("disable");
    }
    /*设置打开弹层*/
    function open(success,submit){
        success_callback="";
        submit_callback="";
        /*点击日期事件*/
        if(success&&typeof(success)=="function"){
            success_callback=success;
        }
        /*点击提交事件*/
        if(submit&&typeof(submit)=="function"){
            submit_callback=submit;
        }
        datepicker.show();
        setTimeout(function(){
            datepicker.addClass("active");
        });
    }
    /*设置关闭弹层*/
    function close(){
        $(".md-datepicker").removeClass("active").hide();
    }
    /*设置年月翻页*/
    function set_date_change(){
        year_prev.on("click",function(){
            if(year_has_prev){
                current_year--;
            }
            fresh_html();
        });
        year_next.on("click",function(){
            if(year_has_next){
                current_year++;
            }
            fresh_html();
        });
        month_prev.on("click",function(){
            if(month_has_prev){
                current_month--;
            }
            if(current_month<0){
                current_year--;
                current_month=11;
            }
            fresh_html();
        });
        month_next.on("click",function(){
            if(month_has_next){
                current_month++;
            }
            if(current_month>=12){
                current_year++;
                current_month=0;
            }
            fresh_html();
        });
    }
    /*设置点击事件*/
    function  set_btn_funs() {
        dp_bot.find(".md-dp-ensure").on("click",function(){
            if(!is_range_sel){
                if(typeof(submit_callback)=="function"){
                    submit_callback(new Date(sel_year,sel_month,sel_day));
                }
            }
            else{
                if(typeof(submit_callback)=="function") {
                    submit_callback(new Date(sel_year, sel_month, sel_day), new Date(ot_year, ot_month, ot_day));
                }
            }

        });
        dp_date.on("click",".md-dp-dline a",function(){
            var val=parseInt($(this).text());
            if(is_range_sel){
                if(sel_day){
                    if(current_year==sel_year&&current_month==sel_month&&sel_day==val){
                        sel_day=NaN;
                    }
                    else{
                        if(ot_day&&current_year==ot_year&&current_month==ot_month&&ot_day==val){
                            ot_day=NaN;
                        }else{
                            var st1=new Date(sel_year,sel_month+1,sel_day).getTime(),
                                st2=new Date(current_year,current_month+1,val).getTime();
                            if(st1<st2){
                                ot_year=current_year;
                                ot_month=current_month;
                                ot_day=val;
                            }else{
                                if(ot_day){
                                    sel_year=current_year;
                                    sel_month=current_month;
                                    sel_day=val;
                                }else{
                                    ot_year=sel_year;
                                    ot_month=sel_month;
                                    ot_day=sel_day;
                                    sel_year=current_year;
                                    sel_month=current_month;
                                    sel_day=val;
                                }
                            }
                        }
                    }
                }else{
                    sel_year=current_year;
                    sel_month=current_month;
                    sel_day=val;
                }
            }else{
                sel_year=current_year;
                sel_month=current_month;
                sel_day=val;
            }
            fresh_html();
            if(!is_range_sel){
                if(typeof(success_callback)=="function"){
                    success_callback(new Date(sel_year,sel_month,sel_day));
                }
            }
            else{
                if(typeof(success_callback)=="function") {
                    success_callback(new Date(sel_year, sel_month, sel_day), new Date(ot_year, ot_month, ot_day));
                }
            }
        });
    }
    /*显示参数*/
    function help(){
        console.log("init:初始化方法,配置对象{date,is_range}");
        console.log(">date: Date , 设置默认选中时间");
        console.log(">is_range: bool , 设置是否为范围选择");
        console.log("open:打开方法,带参数 success,submit,默认清除回调");
        console.log(">success: 点击选择时间回调");
        console.log(">submit:点击确定按钮回调");
        console.log("close:关闭事件");
    }
    return {
        help:help,
        init:init,
        open:open,
        close:close
    }
})();



