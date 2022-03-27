// pages/login/login.js
Page({
  data: {
    identity_array: ['本科生','研究生','老师'],
    identity_index: 0
  },
  onLoad: function () { 
  },
  bindPickerChange: function (e) {
    this.setData({
      identity_index: e.detail.value
    })
  },
  getName: function (e) {
    this.setData({
      name: e.detail.value
    });
  },
  getId: function (e) {
    this.setData({
      id: e.detail.value
    });
  },
  getPhone: function (e) {
    this.setData({
      phone: e.detail.value
    });
  },
  confirmInfo: function (e) {
    const db = wx.cloud.database();
    db.collection('user').add({
      data: {
        type: 'info', // 为查询设置的关键词
        user: '普通用户', // 普通用户/管理员
        name: this.data.name, // 姓名
        identity: this.data.identity_array[this.data.identity_index], // 身份: 本科生/研究生/老师
        id: this.data.id, // 学/工号
        phone: this.data.phone // 联系方式
      },
      success: function(res) {
        wx.switchTab({
          url: '/pages/campus_choice/campus_choice'
        })        
      }
    })
  }
})