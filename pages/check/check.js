// pages/check/check.js
Page({
  data: {
    campus: {'tcz': '天赐庄校区', 'dsh': '独墅湖校区', 'ych': '阳澄湖校区'},
    isAdministor: false,
    currentSwiper: 0,
  },
  onLoad: function (options) {
    // var that = this;
    // const db = wx.cloud.database();
    // db.collection('user').where({
    //   type: 'info'
    // })
    // .get({
    //   success: function(res) {
    //     var d = res.data[0];
    //     var user_info = JSON.stringify(d);
    //     db.collection('check').where({
    //       user_info: user_info
    //     })
    //     .get({
    //       success: function(res) {
    //         console.log(res.data)
    //         var t = res.data;
    //         for(var i=0;i<t.length;++i){
    //           t[i]['period'] = JSON.parse(t[i]['period']);
    //         }
    //         console.log(t)
    //         that.setData({
    //           data: t
    //         });
    //       }
    //     })
    //   }
    // })


    // db.collection('check').where({
    //   user_info: user_info
    // })
    // .get({
    //   success: function(res) {
    //     console.log(res.data)
    //     that.setData({
    //       data: res.data
    //     });
    //   }
    // })
  },
  onShow: function() {
    var that = this;
    const db = wx.cloud.database();
    db.collection('user').where({
      type: 'info'
    })
    .get({
      success: function(res) {
        var d = res.data[0];
        var user_info = JSON.stringify(d);
        db.collection('check').where({
          user_info: user_info
        })
        .get({
          success: function(res) {
            console.log(res.data)
            var t = res.data;
            for(var i=0;i<t.length;++i){
              t[i]['period'] = JSON.parse(t[i]['period']);
              t[i]['user_info'] = JSON.parse(t[i]['user_info']);
            }
            //console.log(t)
            t.sort(function(a,b){return a.date.localeCompare(b.date);});
            //console.log(t)
            that.setData({
              data: t
            });
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
              user_info: user_info
            },
          })
          .then(res => {
            console.log('call func')
            console.log(res.result)
            var tt = res.result;
            for(var i=0;i<tt.length;++i){
              tt[i]['period'] = JSON.parse(tt[i]['period']);
              tt[i]['user_info'] = JSON.parse(tt[i]['user_info']);
            }
            console.log(tt);
            tt.sort(function(a,b){return a.date.localeCompare(b.date);});
            console.log(tt);
            that.setData({
              data2: tt
            });
            console.log('call func')
          })
          .catch(console.error)
        }
      }
    })
  },
  changeTab: function (e) {
    // console.log(e);
    this.setData({
      currentSwiper: e.currentTarget.id
    });
  },
  switchSwiper: function (e) {
    // console.log(e);
    this.setData({
      currentSwiper: e.detail.current
    });    
  },
  clickBtn_agree: function(e) {
    var that = this;
    var id = this.data.data2[e.target.id]['_id'];
    var sta = 'data2[' + e.target.id + '].status';
    console.log(id);
    console.log('agree',e);
    wx.cloud.callFunction({
      name: 'set_check',
      data: {
        id: id,
        status: 'agree'
      },
    })
    .then(res => {
      console.log(res.result)
      that.setData({
        [sta]: 1
      });
      // console.log(that.data.data2)
      var period = JSON.stringify(this.data.data2[e.target.id]['period']);
      wx.cloud.callFunction({
        name: 'seter',
        data: {
          campus: this.data.data2[e.target.id]['campus_name'],
          date: this.data.data2[e.target.id]['date'],
          period: period
        },
      })
      .then(res => {
        console.log(res.result)
      })
      .catch(console.error)

    })
    .catch(console.error)
  },
  clickBtn_refuse: function(e) {
    var that = this;
    var id = this.data.data2[e.target.id]['_id'];
    var sta = 'data2[' + e.target.id + '].status';
    console.log(id);
    console.log('refuse',e);
    wx.cloud.callFunction({
      name: 'set_check',
      data: {
        id: id,
        status: 'refuse'
      },
    })
    .then(res => {
      console.log(res.result)
      that.setData({
        [sta]: 2
      });
      // console.log(that.data.data2)
    })
    .catch(console.error)
  }
})