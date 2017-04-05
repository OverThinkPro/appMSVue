/**
 * 获取当前时间
 * @return 返回yyyy-MM-dd HH:mm:ss格式的时间
 */
export function currentTime() {
  var date = new Date();
  var seperator1 = "-",
      seperator2 = ":";
  var month = date.getMonth() + 1,
      strDate = date.getDate(),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();

    if (month >= 1 && month <= 9) {month = "0" + month;}
    if (strDate >= 0 && strDate <= 9) {strDate = "0" + strDate;}

    var currentTime = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentTime;
};

/**
 * 获取当前日期
 * @return 返回yyyy-MM-dd格式的日期
 */
export function currentDate() {
  var date = new Date();
  var seperator1 = "-",
      seperator2 = ":";
  var month = date.getMonth() + 1,
      strDate = date.getDate();

  if (month >= 1 && month <= 9) {month = "0" + month;}
  if (strDate >= 0 && strDate <= 9) {strDate = "0" + strDate;}

  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
  return currentdate;
};
