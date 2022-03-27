// pages/campus_choice/campus_choice.js
Page({
  data: {
  },
  onLoad: function () {
  },  
  onShow: function () {
    wx.hideHomeButton()
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