export function trim(str){
    return str.trim()
}
/***
 * @param func 输入完成的回调函数
 * @param delay 延迟时间
 */
export function debounce(func, delay) {
    let timer
    return (...args) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}
export function formatDate(now) { 
    let str = new Date(now)
    var year=str.getFullYear();  //取得4位数的年份
    var month=str.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
    var date=str.getDate();      //返回日期月份中的天数（1到31）
    var hour=str.getHours();     //返回日期中的小时数（0到23）
    var minute=str.getMinutes(); //返回日期中的分钟数（0到59）
    var second=str.getSeconds(); //返回日期中的秒数（0到59）
    return year+"-"+month+"-"+date
}


