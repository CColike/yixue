// pages/information/information.js
Page({
  data: {
    person:'',
    unit:'',
    call:''
  },
  onLoad: function (options) {
    var period = JSON.parse(options.period);
    var date = JSON.parse(options.date);
    var that = this;
    this.setData({
      date: date,
      period: period,
      campus: options.campus
    })
    const db = wx.cloud.database();
    db.collection('user').where({
      type: 'info'
    })
    .get({
      success: function(res) {
        var d = res.data[0];
        var user_info = {};
        user_info["name"] = d["name"];
        user_info["id"] = d["id"];
        user_info["unit"] = d["unit"];
        user_info["phone"] = d["phone"];
        that.setData({
          user_name: d['name'],
          user_phone: d['phone'],
          user_info: user_info
        });
      }
    })
  },
  person:function(e){
    this.setData({
      person:e.detail.value
    })
  },
  unit:function(e){
    this.setData({
      unit:e.detail.value
    })
  },
  call:function(e){
    this.setData({
      call:e.detail.value
    })
  },
  clickBtn: function (e) {
    var campus_index = {'天赐庄校区': 'tcz', '独墅湖校区': 'dsh', '阳澄湖校区': 'ych'};
    var campus_name = campus_index[this.data.campus];
    var date = this.data.date;
    var unit = this.data.unit;
    var period = JSON.stringify(this.data.period);
    const db = wx.cloud.database();
    var user_info = this.data.user_info;
    db.collection('check').add({
        data: {
        campus_name: campus_name,
        date: date,
        period: period,
        user_info: user_info,
        unit:unit,
        status: 0, // 0: 提交待审核 1: 审核通过 2: 审核拒绝
        // time: time // 申请时间日志 
        },
        success: function(res) {
        wx.switchTab({
            url: '/pages/check/check'
        })        
        }
    })
  }
})

