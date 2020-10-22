//计时主函数
clock=function(){
    //time_now表示当前时间的字符串
    let time_now =log_Time_Now();

    //用于获取用户选择的日期数，将其转为Date对象的形式，便于计算时间差
    let time_selectresult=time_select();
    let str=time_selectresult[0]+'/'+time_selectresult[1]+'/'+time_selectresult[2]+' '+time_selectresult[3]+':'
    +time_selectresult[4]+':'+time_selectresult[5];6
    let begintime_obj=new Date(str);

    //diff_time用于保存当前时间和已选时间的时间差
    let diff_time=dateBetween(begintime_obj);

    //更新年份月份对应的每月日期数,如2月-28/29，1月-31。
    date_style(time_selectresult[0],time_selectresult[1]-1);

    //计算已选的时间跟当前时间的时间差
    let result="已选时间距目前"+diff_time[0]+"年"+diff_time[1]+"月"+diff_time[2]+"天"+diff_time[3]+"时"+diff_time[4]+"分"+diff_time[5]+"秒";

    //打印时间以及时间差
    document.getElementById("now").innerHTML = time_now;
    document.getElementById("result-wrapper").innerHTML = result;
}
//返回当前日期的字符串格式，便于将其打印在界面上
log_Time_Now=function(){
        //实例化一个日期对象
        let date=new Date();
        //获取当前的年日月以及周几等信息
        let dd =date.getDate(),mm =date.getMonth()+1,yy=date.getFullYear(),weekday=date.getDay();
        //获取当前的时分秒信息
        let hour=date.getHours(),minu=date.getMinutes();sec=date.getSeconds();
        //打印当前时间
        let arr=['一','二','三','四','五','六','日']
        let time="当前是"+yy+'年'+mm+'月'+dd+'日'+hour+'时'+minu+'分'+sec+'秒'+' 周'+arr[weekday-1];
        return time;
}

//获取界面所选的数据的函数
time_select=function(){
    //定义相应的对象来存储获取的option对象，定义*_index来获取选中的index索引
    let year_obj,month_obj,day_obj,hour_obj,minu_obj,sec_obj,year_index,month_index,day_index,hour_index,minu_index,sec_index;
    //定义相应的变量来存取选中的 年月日 时分秒
    let year,month,day,hour,minu,sec;
    //获取option对象
    year_obj=document.getElementById("year-select");
    month_obj=document.getElementById("month-select");
    day_obj=document.getElementById("day-select");
    hour_obj=document.getElementById("hour-select");
    minu_obj=document.getElementById("minute-select");
    sec_obj=document.getElementById("second-select");
    //获取相应的index值
    year_index=year_obj.selectedIndex,month_index=month_obj.selectedIndex,day_index=day_obj.selectedIndex;
    hour_index=hour_obj.selectedIndex,minu_index=minu_obj.selectedIndex,sec_index=sec_obj.selectedIndex;
    //获得相应的数据信息
    year=year_obj.options[year_index].value,month=month_obj.options[month_index].value,day=day_obj.options[day_index].value; 
    hour=hour_obj.options[hour_index].value,minu=minu_obj.options[minu_index].value,sec=sec_obj.options[sec_index].value; 
    //为了返回多个数据，将其存入数组中进行返回
    let difftime=[year,month,day,hour,minu,sec];
    return difftime;
}

//计算两个日期之间的差
dateBetween=function(date1){
    //获取当前时间
    var dateEnd = new Date();
    //时间差的毫秒数
    var dateDiff = dateEnd.getTime() - date1.getTime();
    //计算出相差天数
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
    //计算出相差年数
    var yearDiff =Math.floor(dayDiff/365);
    dayDiff%=365;
    //计算出相差的月数
    var monthDiff=Math.floor(dayDiff/30);
    dayDiff%=30;
    //计算天数后剩余的毫秒数
    var leave1=dateDiff%(24*3600*1000);
    //计算出小时数
    var hours=Math.floor(leave1/(3600*1000));
    //计算小时数后剩余的毫秒数
    var leave2=leave1%(3600*1000);
    //计算相差分钟数 
    var minutes=Math.floor(leave2/(60*1000));
    //计算分钟数后剩余的毫秒数
    var leave3=leave2%(60*1000); 
    //计算相差秒数
    var seconds=Math.round(leave3/1000);
    return [yearDiff,monthDiff,dayDiff,hours,minutes,seconds];
}

//设置不同年份、月份的日历日期选择,28/29，30/31.
date_style=function(year,month){
    let days=getMonthCount(year,month);
    let day_obj=document.getElementById("day-select");
    for(let i=28;i<31;i++){
        day_obj.options[value=i].style='visibility:visible;';
    }
    for(let i=days;i<31;i++){
        day_obj.options[value=i].style='visibility:hidden;';
    }
}

//判断是否闰年
//为了获得每个月的日期有多少，我们需要判断 平年闰年[四年一闰，百年不闰，四百年再闰]
const isLeapYear = (year) => {
    return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
  };

//判断每个月具体有几天
//获得每个月的日期有多少，注意 month - [0-11]
const getMonthCount = (year, month) => {
    let arr = [
      31, null, 31, 30, 
      31, 30, 31, 31,
      30, 31, 30, 31
    ];
    let count = arr[month] || (isLeapYear(year) ? 29 : 28);
    return count;
};

setInterval(clock,1000);

