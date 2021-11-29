Page({
  data: {
    campus: ['天赐庄校区', '独墅湖校区', '阳澄湖校区'],
    campus_index: 0, // 校区选择的索引
    timetable: {
      "天赐庄校区": [
        ['时段','日','一','二','三','四','五','六'],
        ['08:00','occupied','free','free','free','free','free','free'],
        ['09:00','free','free','free','free','free','free','free'],
        ['10:00','free','free','free','free','free','free','free'],
        ['11:00','free','free','free','free','free','free','free'],
        ['12:00','free','occupied','free','free','free','free','free'],
        ['13:00','free','free','free','free','free','free','free'],
        ['14:00','free','free','free','free','free','free','free'],
        ['15:00','free','free','free','free','free','free','free'],
        ['16:00','free','free','free','free','free','free','free'],
        ['17:00','free','free','free','free','free','free','free'],
        ['18:00','free','free','free','free','free','free','free'],
        ['19:00','free','free','free','free','free','free','free'],
        ['20:00','free','free','free','free','free','free','free'],
        ['21:00','free','free','free','free','free','free','free']
      ],
      "独墅湖校区": [
        ['时段','日','一','二','三','四','五','六'],
        ['08:00','free','free','free','free','free','free','free'],
        ['09:00','free','free','free','free','free','free','free'],
        ['10:00','free','free','free','free','free','free','free'],
        ['11:00','free','free','free','free','free','free','free'],
        ['12:00','free','free','free','free','free','free','free'],
        ['13:00','free','occupied','free','free','free','free','free'],
        ['14:00','free','free','free','free','free','free','free'],
        ['15:00','free','free','free','free','free','free','free'],
        ['16:00','free','free','free','free','free','free','free'],
        ['17:00','free','free','free','occupied','free','free','free'],
        ['18:00','free','free','free','occupied','free','free','free'],
        ['19:00','free','free','free','free','free','free','free'],
        ['20:00','free','free','free','free','free','free','free'],
        ['21:00','free','free','free','free','free','free','free']
      ],
      "阳澄湖校区": [
        ['时段','日','一','二','三','四','五','六'],
        ['08:00','free','free','free','free','occupied','free','free'],
        ['09:00','free','free','free','free','occupied','free','free'],
        ['10:00','free','free','free','free','free','free','free'],
        ['11:00','free','free','free','free','free','free','free'],
        ['12:00','free','free','free','free','free','free','free'],
        ['13:00','free','free','free','free','free','free','free'],
        ['14:00','free','free','free','free','free','free','free'],
        ['15:00','free','free','free','free','free','free','free'],
        ['16:00','free','free','free','free','free','free','free'],
        ['17:00','free','free','free','free','free','free','free'],
        ['18:00','free','free','free','free','free','free','free'],
        ['19:00','free','free','free','free','free','free','free'],
        ['20:00','free','free','free','free','free','free','free'],
        ['21:00','free','free','free','free','free','free','free']
      ]
    }
  },
  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      campus_index: e.detail.value
    })
  }
})