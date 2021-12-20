// pages/check/check.js
Page({
  data: {
    campus: {'tcz': '天赐庄校区', 'dsh': '独墅湖校区', 'ych': '阳澄湖校区'}
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
            }
            console.log(t)
            that.setData({
              data: t
            });
          }
        })
      }
    })
  }
})