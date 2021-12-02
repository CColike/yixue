const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

exports.main = async (event, context) => {
  // 三个校区 每周五0点更新数据，删除数据库所有记录，增加未来一周的空记录
  var database = ['tcz','dsh','ych'];
  // 删除数据
  console.log('--------before remove data----------');
  for(var k=0;k<database.length;++k){
    await db.collection(database[k]).where({
      all: null
    }).remove();
  }
  console.log('--------after remove data----------');
  // 更新数据
  var dateList = [];
  var mydate = new Date();
  for(var i=0;i<7;++i){
    if(i>0) mydate.setDate(mydate.getDate()+1);
    var date = mydate.getFullYear()+'-'+String(mydate.getMonth()+1)+'-'+(mydate.getDate()<10 ? '0'+mydate.getDate() : mydate.getDate());
    dateList.push(date);
  }
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
  console.log(dateList);
  console.log(period);
  console.log(data);
  console.log('--------before update data----------');
  for(var k=0;k<database.length;++k){
    for(var i=0;i<dateList.length;++i){
      data['_id'] = dateList[i];
      db.collection(database[k]).add({
        data: data
      })
    }
  }
  console.log('--------after update data----------');
  console.log(event);
  return event;
};