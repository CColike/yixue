// pages/table/table.js
Page({
  data: {
    currentSwiper: 0, // 当前页的index
    circular: false, // 衔接滑动
    timeTable: {}
  },
  onLoad: function (options) {
    // head部分 星期&日期信息
    var dateList = [];
    var mydate = new Date();
    var s = '日一二三四五六';
    for(var i=0;i<7;++i){
      var day = {};
      if(i>0) mydate.setDate(mydate.getDate()+1);
      day['day'] = mydate.getDate();
      day['week'] = s.charAt(mydate.getDay());
      day['date'] = mydate.getFullYear()+'-'+String(mydate.getMonth()+1)+'-'+(mydate.getDate()<10 ? '0'+mydate.getDate() : mydate.getDate());
      dateList.push(day);
    }

    // 保存各个时间段
    var period = [];
    var checked = {};
    for(var i=12;i<=20;++i){
      if(i>12) period.push(String(i)+':00-'+String(i)+':30');
      if(i<20) period.push(String(i)+':30-'+String(i+1)+':00');
    }
    for(var i=0;i<period.length;++i){
      checked[period[i]] = false;
    }
    this.setData({
      dateList: dateList,
      period: period,
      checked: checked
    });    
    console.log(checked);
    
    // 获取数据库"timeTable"未来7天各时段的预约情况
    wx.cloud.init({
      env: wx.cloud.DYNAMIC_CURRENT_ENV
    });
    const db = wx.cloud.database();
    var timeTable = [];
    for(var i=0;i<dateList.length;++i){
      var date = dateList[i].date;
      db.collection('timeTable').doc(date).get().then(res => {
        // console.log('timeTable.'+String(date))
        var s = 'timeTable.'+res.data._id;
        this.setData({
          [s]: res.data
        });
      })
    }
  },
  changeTab: function (e) {
    // console.log(e);
    this.setData({
      currentSwiper: e.currentTarget.dataset.current
    });
  },
  switchSwiper: function (e) {
    var obj = {};
    for(var i in this.data.checked){
      obj[i] = false;
    }
    this.setData({
      currentSwiper: e.detail.current,
      checked: obj
    });
  },
  clickBtn: function (e) {
    // this.data.dateList[this.data.currentSwiper]['date']: 要预约的日期 
    // checked: 当前日期的复选框选中情况
    console.log(this.data.dateList[this.data.currentSwiper]['date']);
    console.log(this.data.checked);
    // console.log(e);
  },
  checkboxChange: function (e) {
    var obj = this.data.checked;
    // console.log(e.detail.value);
    for(var i=0;i<e.detail.value.length;++i){
      obj[e.detail.value[i]] = true;
    }
    this.setData({
      checked: obj
    });
  }
})