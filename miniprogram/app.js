// app.js
App({
  onLaunch() {
    wx.cloud.init({
      env: wx.cloud.DYNAMIC_CURRENT_ENV
    });
    const db = wx.cloud.database();
    db.collection('user').where({
      type: 'info'
    })
    .get({
      success: function(res) {
        if(res.data.length != 0){
          wx.switchTab({
            url: '/pages/campus_choice/campus_choice'
          })
        }
      }
    })   
  },
  globalData: {
  }
})
