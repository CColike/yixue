Page({
  data: {
    currentSwiper: 0, // 当前页的index
    circular: false, // 衔接滑动
    timeTable: {},
    campus: ['天赐庄校区', '独墅湖校区', '阳澄湖校区'],
    campus_name: ['tcz','dsh','ych'],
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
      checked: checked,
      campus_index: options.index
    });    
    
    this.inquireData();
  },
  inquireData: function () {
    const db = wx.cloud.database();
    for(var i=0;i<this.data.dateList.length;++i){
      var date = this.data.dateList[i].date;
      db.collection(this.data.campus_name[this.data.campus_index]).doc(date).get().then(res => {
        var s = 'timeTable.'+res.data._id;
        this.setData({
          [s]: res.data
        });
      })
    }
  },
  changeTab: function (e) {
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
    var date = JSON.stringify(this.data.dateList[this.data.currentSwiper]['date']); // 要预约的日期
    var checked = JSON.stringify(this.data.checked); // 当前日期的复选框选中情况
    var campus_choosen = this.data.campus[this.data.campus_index];
    wx.navigateTo({
      url:'/pages/information/information?date='+date+'&period='+checked+'&campus='+campus_choosen
    });
  },
  checkboxChange: function (e) {
    var obj = this.data.checked;
    for(var i in obj){
      obj[i] = false;
    }
    for(var i=0;i<e.detail.value.length;++i){
      obj[e.detail.value[i]] = true;
    }
    this.setData({
      checked: obj
    });
  }
})