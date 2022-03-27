// 设置三个campus数据库中对应日期，时段的状态
// 直接把对应日期的data全部更新了

const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var campus = event.campus;
  var date = event.date;
  var period = JSON.parse(event.period);
  var data = {};
  for(var i in period){
    if(period[i]==true){
      data[i] = 1;
    }
  }
  console.log(event);
  console.log(campus);
  console.log(date);
  console.log(JSON.stringify(data));
  console.log('before change database');
  await db.collection(campus).doc(date).update({
    data: data,
    success: function(res) {
      console.log(res.data)
    }
  })
  console.log('after change database');
  return event;
}
