// pages/userinfo/userinfo.js
Page({
  data: {
  },
  onShow: function() {
    var that = this;
    const db = wx.cloud.database();
    db.collection('user').where({
      type: 'info'
    })
    .get({
      success: function(res) {
        var d = res.data[0];
        that.setData({
          user: d['user'],
          name: d['name'],
          identify: d['identity'],
          id: d['id'],
          phone: d['phone']
        });
      }
    })
  }
})
