// pages/login/login.js
Page({
  data: {
    identity_array: ['本科生','研究生','老师'],
    identity_index: 0
  },
  onLoad: function () {
    // const db = wx.cloud.database();
    // // console.log('{openid}')
    // db.collection('user').where({
    //   type: 'info'
    // })
    // .get({
    //   success: function(res) {
    //     if(res.data.length == 0){
    //       console.log("获取数据失败", res)
    //     }
    //     else{
    //       console.log("获取数据成功",res)
    //       wx.redirectTo({
    //         url: '/pages/campus_choice/campus_choice'
    //       })
    //     }
    //   }
    // })    
  },
  bindPickerChange: function (e) {
    console.log('picker change',e.detail.value);
    this.setData({
      identity_index: e.detail.value
    })
  },
  getName: function (e) {
    console.log('name input-----');
    this.setData({
      name: e.detail.value
    });
  },
  getId: function (e) {
    console.log('id input-----');
    this.setData({
      id: e.detail.value
    });
  },
  getPhone: function (e) {
    console.log('phone input-----');
    this.setData({
      phone: e.detail.value
    });
  },
  confirmInfo: function (e) {
    const db = wx.cloud.database();
    db.collection('user').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        type: 'info', // 为查询设置的关键词
        user: '普通用户', // 普通用户/管理员
        name: this.data.name, // 姓名
        identity: this.data.identity_array[this.data.identity_index], // 身份: 本科生/研究生/老师
        id: this.data.id, // 学/工号
        phone: this.data.phone // 联系方式
      },
      success: function(res) {
        console.log('添加用户信息成功',res)
        wx.switchTab({
          url: '/pages/campus_choice/campus_choice'
        })        
      }
    })
    // 检验信息
    // 提交注册
    // wx.cloud.database().collection('user').where({
    //   zhanghao: zhanghao
    // }).get({
    //   success(res) {
    //     console.log("获取数据成功", res)
    //     let user = res.data[0]
    //     console.log("user", user)
    //     if (mima == user.mima) {
    //       console.log('登陆成功')
    //       wx.showToast({
    //         title: '登陆成功',
    //       })
    //       // wx.navigateTo({
    //       //   url: '../home/home?name=' + user.name,
    //       // })
    //       wx.navigateTo({
    //         url: '/pages/me/me',
    //       })
    //       //保存用户登陆状态
    //       wx.setStorageSync('user', user)
    //     } else {
    //       console.log('登陆失败')
    //       wx.showToast({
    //         icon: 'none',
    //         title: '账号或密码不正确',
    //       })
    //     }
    //   },
    //   fail(res) {
    //     console.log("获取数据失败", res)
    //   }
    // })

  }
})