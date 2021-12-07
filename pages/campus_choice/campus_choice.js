// pages/campus_choice/campus_choice.js
Page({
  data: {
  },
  onLoad: function () {
      wx.cloud.init({
        env: wx.cloud.DYNAMIC_CURRENT_ENV
      });
      const db = wx.cloud.database();
      db.collection('tcz').doc("2021-12-04").update({
        data: {
          "12:30-13:00":1
      }})
  },
  choice_0: function (){
    wx.navigateTo({
      url: '/pages/index/index?index=0',
    })
  },
  choice_1: function (){
    wx.navigateTo({
      url: '/pages/index/index?index=1',
    })
  },
  choice_2: function (){
    wx.navigateTo({
      url: '/pages/index/index?index=2',
    })
  }
})