const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  // 检查用户是否为管理员
  var user_info = JSON.parse(event.user_info);
  console.log(user_info);
  var data;
  await db.collection('check').get().then(res => {
    console.log(res.data);
    data = res.data;
  })
  console.log(data);
  return data;
}
