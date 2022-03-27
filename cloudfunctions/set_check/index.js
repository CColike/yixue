// 只有管理员会调用，设置check的status审批同意与否

const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var id = event.id;
  console.log(id);
  if(event.status == 'agree'){
    await db.collection('check').where({
      _id: id
    })
    .update({
      data: {
        status: 1
      }
    })
  }
  else{
    await db.collection('check').where({
      _id: id
    })
    .update({
      data: {
        status: 2
      }
    })
  }

  return event;
}
