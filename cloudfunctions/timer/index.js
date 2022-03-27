// 自动更新三个campus数据库的日期数据

const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

function convertUTCDateToLocalDate(date) {
  var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();
  newDate.setHours(hours - offset);
  return newDate;
}

exports.main = async (event, context) => {
  // 三个校区 每年更新数据，不删除过去的数据，增加未来一年的空记录
  process.env.TZ="Asia/Shanghai";
  var database = ['tcz','dsh','ych'];
  var mydate = convertUTCDateToLocalDate(new Date());
  console.log(mydate);
  console.log(mydate.getUTCDate());
  // 更新数据
  var next7day = convertUTCDateToLocalDate(new Date());
  console.log(next7day);
  console.log(next7day.getUTCDate());
  next7day.setDate(next7day.getDate()+7);
  console.log(next7day);
  console.log(next7day.getUTCDate());

  var next7date = next7day.getFullYear()+'-'+String(next7day.getMonth()+1)+'-'+(next7day.getUTCDate()<10 ? '0'+next7day.getUTCDate() : next7day.getUTCDate());
  var period = [];
  for(var i=12;i<=20;++i){
    if(i>12) period.push(String(i)+':00-'+String(i)+':30');
    if(i<20) period.push(String(i)+':30-'+String(i+1)+':00');
  }
  var data = {};
  for(var j=0;j<period.length;++j){
    data[period[j]] = 0;
  }
  for(var k=0;k<database.length;++k){
    data['_id'] = next7date;
    db.collection(database[k]).add({
      data: data
    })
  }
  return event;
};