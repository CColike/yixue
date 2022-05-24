// 只有管理员会调用，获得所有审批项

const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var data;
  await db.collection('check').get().then(res => {
    console.log(res.data);
    data = res.data;
  })
  console.log(data);
  return data;
}
