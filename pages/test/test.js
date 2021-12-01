Page({
  data:{
    allList: [],
    dayList: []
  },
  onLoad: function () {
    let that=this;
    allList = [];
    that.filterday(mock.listData()["result"]["courseSeries"], that);
  },

  weekDate: function () {
    //获取周数据
    var myDate = new Date();// hehe
    myDate.toLocaleDateString();
    var month = myDate.getMonth() + 1;
    var time = myDate.getFullYear() + '年' + month + '月' + myDate.getDate() + '日';

    var total = 1;// 个数
    var dayList = [];
    dayList.push({
      'day': myDate.getDate(),
      'month': myDate.getMonth() + total,
      'week': toWeekDay(myDate.getDay()),
      'year': myDate.getFullYear()
    });
    for (var i = 0; i < 6; i++) {
      myDate.setDate(myDate.getDate() + total); // number 是最近几天  则会自动计算
      // 需求  月份-日   星期几
      dayList.push({
        'day': myDate.getDate(),
        'month': myDate.getMonth() + total,
        'week': toWeekDay(myDate.getDay()),
        'year': myDate.getFullYear()
      });
    }
    return dayList;
  },

  toWeekDay: function (weekDay) {// 传入数据  讲一周的某一天返回成中文状态下的字符
    switch (weekDay) {
        case 1: return '一'; break;
        case 2: return '二'; break;
        case 3: return '三'; break;
        case 4: return '四'; break;
        case 5: return '五'; break;
        case 6: return '六'; break;
        case 0: return '日'; break;
        default: break;
    }
    return '传入未知参数';
  },

  filterday: (res, options) => {
    let that = options;
    _.forEach(res, function (value) {
      that.coursesData(value, options);
    });
  },

  coursesData: (options, pargam) => {
    let that = pargam;
    if (options.trainings.length > 0) {
      let list = [];
      _.forEach(options.trainings, function (item, key) {
        list.push(item);
      });
      allList.push(list);
    } else {
      var objectData = {};
      allList = _.concat(allList, objectData);
    }
    let NowDay = new Date();
    console.log(that.weekDate());
    that.setData({
      dayList: that.weekDate(),
      dataShow: allList,
      NowDay: NowDay.getDate(),
    });
  },

  switchSwiper: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    });
  },

  changeTab: function (e) {
    console.log(e);
    this.setData({
      currentTab: e.currentTarget.dataset.current
    });
  }
})