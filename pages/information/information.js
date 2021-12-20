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
    console.log(this.data.date);
    console.log(this.data.period);
    console.log(this.data.campus);
    const db = wx.cloud.database();

    db.collection('user').where({
      type: 'info'
    })
    .get({
      success: function(res) {
        var d = res.data[0];
        // console.log(res.data[0]);
        that.setData({
          user_name: d['name'],
          user_phone: d['phone']
        });
        // console.log(res.data)
      }
    })
  },

  person:function(e)
  {
    this.setData({
      person:e.detail.value
    })
  },
  unit:function(e)
  {
    this.setData({
      unit:e.detail.value
    })
  },
  call:function(e)
  {
    this.setData({
      call:e.detail.value
    })
  },

  clickBtn: function (e) {
    // console.log(this.data.person);
    // this.updateData();
    // 提交审核
    var campus_index = {'天赐庄校区': 'tcz', '独墅湖校区': 'dsh', '阳澄湖校区': 'ych'};
    var campus_name = campus_index[this.data.campus];
    var date = this.data.date;
    var period = JSON.stringify(this.data.period);
    var that = this;
    const db = wx.cloud.database();
    // db.collection('user')
    console.log('before db query in info');
    db.collection('user').where({
      type: 'info'
    })
    .get({
      success: function(res) {
        var d = res.data[0];
        var user_info = JSON.stringify(d);
        console.log(user_info);
        // var time = new Date();
        // console.log(time.now());
        console.log('before check query');
        db.collection('check').add({
          data: {
            campus_name: campus_name,
            date: date,
            period: period,
            user_info: user_info,
            status: 0, // 0: 提交待审核 1: 审核通过 2: 审核拒绝
            // time: time // 申请时间日志 
          },
          success: function(res) {
            console.log('提交申请信息成功',res)
            wx.switchTab({
              url: '/pages/check/check'
            })        
          }
        })
      }
    })

  },
 
  updateData: function () {
    // wx.cloud.init({
    //   env: wx.cloud.DYNAMIC_CURRENT_ENV
    // });
    var campus_index = {'天赐庄校区': 'tcz', '独墅湖校区': 'dsh', '阳澄湖校区': 'ych'};

    // wx.cloud.callFunction({
    //   name: 'seter',
    //   data: {
    //     campus: this.data.campus,
    //     date: this.data.date,
    //     period: this.data.period
    //   }
    // })
    // var date = JSON.stringify(this.data.date);
    var period = JSON.stringify(this.data.period);
    var campus_name = campus_index[this.data.campus];
    console.log('before call');
    console.log(this.data.date);
    console.log(period);
    console.log(campus_name);
    console.log('before call');
    wx.cloud.callFunction({
      name: 'seter',
      data: {
        campus: campus_name,
        date: this.data.date,
        period: period
      },
    })
    .then(res => {
      console.log(res.result)
    })
    .catch(console.error)
    console.log('after call');
  }
})

