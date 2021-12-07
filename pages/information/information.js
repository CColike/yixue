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
    this.setData({
      date: date,
      period: period,
      campus: options.campus
    })
    console.log(this.data.date);
    console.log(this.data.period);
    console.log(this.data.campus);
    this.updateData();
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
  },
 
  updateData: function () {
    wx.cloud.init({
      env: wx.cloud.DYNAMIC_CURRENT_ENV
    });
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

