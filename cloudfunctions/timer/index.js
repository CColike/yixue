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
  // 三个校区 每周五0点更新数据，删除数据库所有记录，增加未来一周的空记录
  process.env.TZ="Asia/Shanghai";
  var database = ['tcz','dsh','ych'];
  // var dateList = [];
  // 让世界时表示的是GMT+8，后面就要用getUTCDate
  var mydate = convertUTCDateToLocalDate(new Date());
  console.log(mydate);
  // console.log(mydate.getDate());
  console.log(mydate.getUTCDate());

  // console.log(process.env);
  // 删除数据
  console.log('--------before remove data----------');
  var lastday = convertUTCDateToLocalDate(new Date());
  lastday.setDate(lastday.getDate()-1);
  var lastdate = lastday.getFullYear()+'-'+String(lastday.getMonth()+1)+'-'+(lastday.getUTCDate()<10 ? '0'+lastday.getUTCDate() : lastday.getUTCDate());
  console.log(lastday);
  // console.log(lastdate);
  // console.log(lastday.getDate());
  console.log(lastday.getUTCDate());
  for(var k=0;k<database.length;++k){
    // await db.collection(database[k]).where({
    //   all: null
    // }).remove();
    await db.collection(database[k]).doc(lastdate).remove();
  }
  console.log('--------after remove data----------');
  // 更新数据
  var next7day = convertUTCDateToLocalDate(new Date());
  console.log(next7day);
  console.log(next7day.getUTCDate());
  next7day.setDate(next7day.getDate()+7);
  console.log(next7day);
  console.log(next7day.getUTCDate());

  var next7date = next7day.getFullYear()+'-'+String(next7day.getMonth()+1)+'-'+(next7day.getUTCDate()<10 ? '0'+next7day.getUTCDate() : next7day.getUTCDate());
  // for(var i=0;i<7;++i){
  //   if(i>0) mydate.setDate(mydate.getDate()+1);
  //   var date = mydate.getFullYear()+'-'+String(mydate.getMonth()+1)+'-'+(mydate.getUTCDate()<10 ? '0'+mydate.getUTCDate() : mydate.getUTCDate());
  //   dateList.push(date);
  // }
  var period = [];
  for(var i=12;i<=20;++i){
    if(i>12) period.push(String(i)+':00-'+String(i)+':30');
    if(i<20) period.push(String(i)+':30-'+String(i+1)+':00');
  }
  var data = {};
  for(var j=0;j<period.length;++j){
    data[period[j]] = 0;
  }
  console.log('--------before update data----------');
  // console.log(next7day);
  // console.log(next7date);
  // console.log(next7day.getDate());
  // console.log(lastday.getUTCDate());
  // console.log(data);
  console.log('--------before update data----------');
  for(var k=0;k<database.length;++k){
    data['_id'] = next7date;
    db.collection(database[k]).add({
      data: data
    })
  }
  console.log('--------after update data----------');
  console.log(event);
  return event;
};