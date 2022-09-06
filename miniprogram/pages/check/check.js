// pages/check/check.js
Page({
    data: {
        campus: { 'tcz': '天赐庄校区', 'dsh': '独墅湖校区', 'ych': '阳澄湖校区' },
        isAdministor: false,
        currentSwiper: 0,
        // height:500,
        //rpx相对高度
        // height: (wx.getSystemInfoSync().windowHeight-90)*750 / wx.getSystemInfoSync().windowWidth+'rpx',
        //414px-->970.3125rpx
        // height2:wx.getSystemInfoSync().windowHeight+'px',//504px

        // navBarHeight: ( wx.getMenuButtonBoundingClientRect().top - wx.getSystemInfoSync().statusBarHeight) * 2 + wx.getMenuButtonBoundingClientRect().height,//40px


        // navBarHeight: (( wx.getMenuButtonBoundingClientRect().top - wx.getSystemInfoSync().statusBarHeight) * 2 + wx.getMenuButtonBoundingClientRect().height)*750 / wx.getSystemInfoSync().windowWidth+'rpx',
        // topheight: 130 * wx.getSystemInfoSync().windowHeight / wx.getSystemInfoSync().windowWidth,//204.75   rpx--->px 
        // topheight:130+'rpx',


        // wantheight:wx.getSystemInfoSync().windowHeight,//504

        // wantheight:(wx.getMenuButtonBoundingClientRect().height-(( wx.getMenuButtonBoundingClientRect().top - wx.getSystemInfoSync().statusBarHeight) * 2 + wx.getMenuButtonBoundingClientRect().height))*750 / wx.getSystemInfoSync().windowWidth+'rpx',
        weight: wx.getSystemInfoSync().windowWidth / 2 + 'px',
        wantheight: wx.getSystemInfoSync().windowHeight * 750 / wx.getSystemInfoSync().windowWidth - (((wx.getMenuButtonBoundingClientRect().top - wx.getSystemInfoSync().statusBarHeight) * 2 + wx.getMenuButtonBoundingClientRect().height) * 750 / wx.getSystemInfoSync().windowWidth) - 130 + 'rpx',
        userheight: (wx.getSystemInfoSync().windowHeight - ((wx.getMenuButtonBoundingClientRect().top - wx.getSystemInfoSync().statusBarHeight) * 2 + wx.getMenuButtonBoundingClientRect().height)) * 750 / wx.getSystemInfoSync().windowWidth + 'rpx',
        // wantheight:wx.getSystemInfoSync().windowHeight  //32px
    },
    onShow: function () {
        var that = this;
        const db = wx.cloud.database();
        var mydate = new Date();
        var today = mydate.getFullYear() + '-' + String(mydate.getMonth() + 1) + '-' + (mydate.getDate() < 10 ? '0' + mydate.getDate() : mydate.getDate());
        db.collection('user').where({
            type: 'info'
        }).get({
            success: function (res) {
                var d = res.data[0];
                var openid = d["_openid"];
                db.collection('check').where({
                    _openid: openid
                }).get({
                    success: function (res) {
                        var t = res.data;
                        if (t.length != 0) {
                            for (var i = 0; i < t.length; ++i) {
                                t[i]['period'] = JSON.parse(t[i]['period']);
                            }
                            t.sort(function (a, b) { return b.date.localeCompare(a.date); });
                            var t_ = [];
                            for (var i = 0; i < t.length; ++i) {
                                if (t[i].date.localeCompare(today) >= 0) t_.push(t[i]);
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
                if (d['user'] == '管理员') {
                    that.setData({
                        isAdministor: true
                    });
                    wx.cloud.callFunction({
                        name: 'geter',
                        data: {
                            _openid: openid
                        },
                    }).then(res => {
                        var tt = res.result;
                        if (tt.length != 0) {
                            for (var i = 0; i < tt.length; ++i) {
                                tt[i]['period'] = JSON.parse(tt[i]['period']);
                                tt[i]['user_info'] = tt[i]['user_info'];
                            }
                            tt.sort(function (a, b) { return b.date.localeCompare(a.date); });

                            var tt_ = [];
                            for (var i = 0; i < tt.length; ++i) {
                                if (tt[i].date.localeCompare(today) >= 0) tt_.push(tt[i]);
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
    clickBtn_agree: function (e) {
        var that = this;
        var id = this.data.data2[e.target.id]['_id'];
        var sta = 'data2[' + e.target.id + '].status';

        var campus_name = this.data.data2[e.target.id]['campus_name'];
        var date = this.data.data2[e.target.id]['date'];
        var period = this.data.data2[e.target.id]['period'];

        const db = wx.cloud.database();
        var conflict = false; // 是否冲突
        db.collection(campus_name).doc(date).get().then(res => {
            var info = res.data; //  某天的预约信息
            // 判断此时审批通过是否与数据库中的预约情况存在冲突
            for (var i in period) {
                if (period[i] == true && info[i] == 1) {
                    conflict = true; // 同时是预约的时间段，且数据库中该时段已经被审批通过，此时再审批通过就冲突了
                }
            }
            if (conflict) {
                // 冲突，则在前端显示一个提示信息，并终止同意操作(这种情况下不允许修改)
                // @CColike 在此处修改
                wx.showToast({
                    title: '时间冲突', //提示的内容
                    duration: 2000, //持续的时间
                    icon: 'error', //图标有success、error、loading、none四种
                    mask: true //显示透明蒙层 防止触摸穿透
                })
            }
            else {
                // 不冲突，则按照原先的代码进行，首先将check数据库中的信息更改，然后修改前端的数据，最后通过seter修改对应校区数据库的信息
                wx.cloud.callFunction({
                    name: 'set_check',
                    data: {
                        id: id,
                        status: 'agree'
                    },
                }).then(res => {
                    that.setData({
                        [sta]: 1
                    });
                    var period = JSON.stringify(this.data.data2[e.target.id]['period']);
                    wx.cloud.callFunction({
                        name: 'seter',
                        data: {
                            campus: this.data.data2[e.target.id]['campus_name'],
                            date: this.data.data2[e.target.id]['date'],
                            period: period,
                            status: 'agree'
                        },
                    })
                })
            }
        })
    },
    clickBtn_refuse: function (e) {
        var that = this;
        var id = this.data.data2[e.target.id]['_id'];
        var sta = 'data2[' + e.target.id + '].status';
        wx.cloud.callFunction({
            name: 'set_check',
            data: {
                id: id,
                status: 'refuse'
            },
        }).then(res => {
            var sta_before = this.data.data2[e.target.id]['status'];
            that.setData({
                [sta]: 2
            });
            /**
             * 1.已经被占用（其他人）
             *      拒绝不应该擦除记录
             * 2.已经被占用（本人）
             *      拒绝应该擦除记录
             * 3.未被占用
             *      不需要修改
             * 所以只有满足第二种情况的时候才修改预约时间表的数据
            */
            if(sta_before == 1){
                var period = JSON.stringify(this.data.data2[e.target.id]['period']);
                wx.cloud.callFunction({
                    name: 'seter',
                    data: {
                        campus: this.data.data2[e.target.id]['campus_name'],
                        date: this.data.data2[e.target.id]['date'],
                        period: period,
                        status: 'refuse'
                    }
                })
            }
        })
    }
})