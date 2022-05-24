// pages/check/check.js
Page({
  data: {
    campus: {'tcz': '天赐庄校区', 'dsh': '独墅湖校区', 'ych': '阳澄湖校区'},
    isAdministor: false,
    currentSwiper: 0,
    height:500,
  },
  onLoad: function () {
    this.setData({
      height: wx.getSystemInfoSync().windowHeight-56+'px',
      height2:wx.getSystemInfoSync().windowHeight+'px',
    })
    
 
  },
  onShow: function() {
    var that = this;
    const db = wx.cloud.database();
    var mydate = new Date();
    var today = mydate.getFullYear()+'-'+String(mydate.getMonth()+1)+'-'+(mydate.getDate()<10 ? '0'+mydate.getDate() : mydate.getDate());
    db.collection('user').where({
      type: 'info'
    })
    .get({
      success: function(res) {
        var d = res.data[0];
        var openid = d["_openid"];
        db.collection('check').where({
          _openid: openid
        })
        .get({
          success: function(res) {
            var t = res.data;
            if(t.length != 0){
              for(var i=0;i<t.length;++i){
                t[i]['period'] = JSON.parse(t[i]['period']);
              }
              t.sort(function(a,b){return b.date.localeCompare(a.date);});
              var t_ = [];
              for(var i=0;i<t.length;++i){
                if(t[i].date.localeCompare(today)>=0) t_.push(t[i]);
                else break;
              }
              t_.reverse();
              that.setData({
                data: t_
              });
            }
          }
        })
        // 获取管理员审核页面
        if(d['user']=='管理员'){
          that.setData({
            isAdministor: true
          });
          wx.cloud.callFunction({
            name: 'geter',
            data: {
              _openid: openid
            },
          })
          .then(res => {
            var tt = res.result;
            if(tt.length != 0){
              for(var i=0;i<tt.length;++i){
                tt[i]['period'] = JSON.parse(tt[i]['period']);
                tt[i]['user_info'] = tt[i]['user_info'];
              }
              tt.sort(function(a,b){return b.date.localeCompare(a.date);});

              var tt_ = [];
              for(var i=0;i<tt.length;++i){
                if(tt[i].date.localeCompare(today)>=0) tt_.push(tt[i]);
                else break;
              }
              tt_.reverse();
              that.setData({
                data2: tt_
              });
            }
          })
        }
      }
    })
  },
  changeTab: function (e) {
    this.setData({
      currentSwiper: e.currentTarget.id
    });
  },
  switchSwiper: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    });    
  },
  clickBtn_agree: function(e) {
    var that = this;
    var id = this.data.data2[e.target.id]['_id'];
    var sta = 'data2[' + e.target.id + '].status';
    wx.cloud.callFunction({
      name: 'set_check',
      data: {
        id: id,
        status: 'agree'
      },
    })
    .then(res => {
      that.setData({
        [sta]: 1
      });
      var period = JSON.stringify(this.data.data2[e.target.id]['period']);
      wx.cloud.callFunction({
        name: 'seter',
        data: {
          campus: this.data.data2[e.target.id]['campus_name'],
          date: this.data.data2[e.target.id]['date'],
          period: period
        },
      })
    })
  },
  clickBtn_refuse: function(e) {
    var that = this;
    var id = this.data.data2[e.target.id]['_id'];
    var sta = 'data2[' + e.target.id + '].status';
    wx.cloud.callFunction({
      name: 'set_check',
      data: {
        id: id,
        status: 'refuse'
      },
    })
    .then(res => {
      that.setData({
        [sta]: 2
      });
    })
  }
})