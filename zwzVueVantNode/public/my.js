var app = getApp();
var utils = require(app.config.basePath + 'utils/util');
var common = require(app.config.basePath + 'utils/common.js');
var initUtils = require(app.config.basePath + 'utils/init.js');

Component({
  properties: {

  },
  data: {
    avatarUrl: '../../../images/index_my_photos.png',
    nickname: '',
    showPhone: "",
    isLogin: '0',
    isMemberShop: false,//是否会员店  
    pointScanSwitch: 0,//积分开关
    operateType: null,
    fileUrl: "",
    mineRechargeSwitch: 0,  // 我的页面充值开关
    groupCenterSwitch: "",//团购开关
    couponNum: 0,
    couponCenterNum: 0,
    myticketListNum:0,//团购数量
    rightsStatus: 2,//付费会员标识 1-是 2-否
    loseStatus: 2,//1-提示过期 2-不提示
    vipSavePrice: 0,//权益卡总优惠券价格
    vipstopTime: "",//权益卡过期时间
    dredgeStatus: "",//是否开通该权益卡
    memberPoint:0,//会员分数
    pointName:"星星",//积分名称
    mineIconList:[],//个人中心icon
    showConvert:false,//口令兑换展示
    showCallPhone:false,//拨打电话展示
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //初始化方法
    initShow: function(){
      console.log("initShow___my ");
      
      this.doLogin();
      // this.getvipbanner();
      this.getShopInfoById();//查询信息
      this.setData({
        fileUrl: app.globalData.fileUrl,
        pointName: app.globalData.pointName
      });
      // this.getCouponNum();
      // this.loadTicketData();
      // this.getRightsStatus();
      // this.getMemberDetail();//会员信息
      this.getqueryIcons();//我的服务-icon
      this.reloadFun();
    },
    reloadFun:function(){
      this.getCouponNum();
      this.loadTicketData();
      this.getMemberDetail();//会员信息
      this.getRightsStatus();
    },
    // 查询信息
    getShopInfoById: function () {
      var that = this;
      utils.uGet(app.url.getShopInfoById, { "shopId": app.globalData.myStoreId }, function (msg) {
        if (msg.data.code == 10000) {
          common.cSetAddress(msg.data.data, utils.uGetLocal("myLongitude"), utils.uGetLocal("myLatitude"));
          console.log(`my.getShopInfoById==${JSON.stringify(msg)}`)
          that.setData({
            groupCenterSwitch: utils.uGetLocal("groupCenterSwitch"),//团购开关
            payMemberSwitch: utils.uGetLocal("payMemberSwitch"),//付费会员开关 1-正常 2-冻结
            payMemberCode: utils.uGetLocal("payMemberCode"),//付款会员内链码R8-1-90-12 utils.uGetLocal("payMemberCode")
            myPayCodeSwitch: utils.uGetLocal("myPayCodeSwitch"),//	我的-付款码开关 1-正常 2-冻结
            pointScanSwitch: utils.uGetLocal("pointScanSwitch"),//积分使用开关
            rechargeMySwitch: utils.uGetLocal("rechargeMySwitch"),//充值开关
          })
          if (!utils.uIsNull(that.data.payMemberCode)){
            that.getVipCardDetail();
          }
          
        }
      });
    },
    //查询用户信息--付费会员
    getRightsStatus(){
      var that = this;
      var data = { "appUserId": app.globalData.userId, "shopId": app.globalData.myStoreId };
      console.log("getAppUserById.data=" + JSON.stringify(data));
      utils.uPost(app.url.getAppUserById, data, function (res) {
        console.log("getAppUserById.res=" + JSON.stringify(res));
        if (res.data.code == 10000) {
          that.setData({
            rightsStatus: res.data.data.rightsStatus,//付费会员标识 1-是 2-否
          })
        }
      })
    },
    getCouponNum(){
      var that = this;
      var data = { ifLost: 1, appUserId: app.globalData.userId, shopId: app.globalData.myStoreId, terminalId: 1 };
      utils.uGet(app.url.getMyCoupon, data, function (res) {
        console.log( "getCouponNum.res====" + JSON.stringify(res)  );
        var num = res.data.data.length;
        that.setData({
          couponNum: num
        })
      });
      // var data = { terminalId: 1, appUserId: app.globalData.userId, shopId: app.globalData.myStoreId };//
      // utils.uGet(app.url.getAllCoupon, data, function (res) {
      //   console.log("getCouponCenterNum.res====" + JSON.stringify(res));
      //   var num = res.data.data.total;
      //   that.setData({
      //     couponCenterNum: num
      //   })
      // });
    },
    // 获取我的团购数量
    loadTicketData: function () {
      var that = this;
      var data = { "appUserId": app.globalData.userId, "shopId": app.globalData.myStoreId };
      console.log("loadTicketData.data=" + JSON.stringify(data));
      utils.uPost(app.url.getTicketCodeCount, data, function (res) {
        console.log("loadTicketData.res=" + JSON.stringify(res));
        if (res.data.code == 10000) {
          var data = res.data.data;
          that.setData({
            myticketListNum: data.couponCount,
            loseStatus: data.loseStatus,//1-提示过期 2-不提示
          })
        }
      })
    },
    //更新微信头像
    btnGetUserInfo: function (e) {
      console.log("E===" + JSON.stringify(e));
      var that = this;
      if (e.detail.userInfo == null) {
        utils.uAlert("请授权用户信息");
      } else {
        var nickName = e.detail.userInfo.nickName;
        var avatarUrl = e.detail.userInfo.avatarUrl;
        var data = { "wxOpenid": app.globalData.openId, "wxNickname": nickName, "imgUrl": avatarUrl };
        console.log("btnGetUserInfo.wxOpenid==" + JSON.stringify(app.globalData.openId))
        console.log("btnGetUserInfo.userId==" + JSON.stringify(app.globalData.userId))
        if (app.globalData.openId != "" && app.globalData.openId != undefined && app.globalData.userId != "" && app.globalData.userId != undefined) {
          console.log("app.globalData.userId==" + JSON.stringify(app.globalData.userId) + "+" + JSON.stringify(app.globalData.openId))
          utils.uPost(app.url.updateAppUserWXByOpenId, data, function (res) {
            console.log("btnGetUserInfo.res==" + JSON.stringify(res))
            if (res.data.code == 10000) {
              console.log("更新头像数据成功");
              that.setData({
                nickname: nickName,
                avatarUrl: avatarUrl
              });
              app.globalData.nickname = nickName;
              app.globalData.avatarUrl = avatarUrl;
            }
          });
        } else {
          common.cCheckLogin()
        }
      }
    },
    //根据登录判断跳转
    goNextPageIsLogin: function (e) {
      if (this.data.isLogin != '1') {
        return;
      }
      var url = e.currentTarget.dataset.url;
      if (url.search("myOrder") != -1) {//相关订单中心
        utils.uWxCount("wx_my_page_click", { my_page_click: "1" })
      }
      if (url == "../point/point?rType=2") {
        utils.uWxCount("wx_home_page_member_click", { member_type: "2" })
      }
      if (url == "../point/point") {
        utils.uWxCount("wx_my_page_click", { my_page_click: "2" })
      } else if (url.indexOf("../myCollect/myCollect") != -1) {
        utils.uWxCount("wx_my_page_click", { my_page_click: "3" })
      } else if (url == "myAddress") {
        utils.uWxCount("wx_my_page_click", { my_page_click: "6" })
      } else if (url.indexOf("../myTicketList/myTicketList") != -1) {
        utils.uWxCount("wx_my_page_click", { my_page_click: "7" })
      } else if (url == "../minePresent/minePresent") {
        utils.uWxCount("wx_my_page_click", { my_page_click: "8" })
      } 
      utils.uGoPage(url);
    },
    // icon跳转
    goPageByIcon:function(e){
      var index = e.currentTarget.dataset.index;
      var obj = this.data.mineIconList[Number(index)]; 
      console.log("index=======" + index + "&obj=" + JSON.stringify(obj) );
      common.cQueryIconGopage(obj);
    },
    //联系客服
    callPhone: function () {
      utils.uWxCount("wx_my_page_click", { my_page_click: "5" })
      var phone = utils.uGetLocal("shopTel")
      common.cCallPhone(phone);
    },
    doLogin: function () {
      var that = this;
      if (app.globalData.isLogin == '1') {
        that.setData({
          isLogin: "1",
          avatarUrl: app.globalData.avatarUrl,
          nickname: app.globalData.nickname,
          showPhone: utils.uEncryPhone(app.globalData.phone),
        });
        utils.uCloseLoading();
      }
    },
    //页面跳转
    goCouponPage: function (e) {
      var that = this;
      var storeId = app.globalData.myStoreId;
      common.cCheckLogin(function (res) {
        if (!utils.uIsNull(storeId)) {
          utils.uGoPage("myCardList");
        } else {
          common.cCheckLocation(function (res) {
            utils.uGoPage("myCardList");
          }, function () {
            utils.uConfirm("你当前未打开定位，是否打开定位设置", function () {

            }, "", that.closeSettingPage);
          });
        }
      });
    },
    //获取会员权益banner
    getvipbanner: function () {
      var that = this;
      var shopId = app.globalData.myStoreId;
      var appUserId = app.globalData.userId;
      var data = { shopId: shopId, terminalTypeId: 1, bannerModuleId: 32, appUserId: appUserId }
      utils.uGet(app.url.getBannerV3, data, function (msg) {

        if (msg.data.code == 10000) {
          that.setData({
            vipbannerUrl: msg.data.data,
          })

          console.log("getvipbanner==" + JSON.stringify(that.data.vipbannerUrl))
        }
      })
    },
    //跳转会员首页
    gostarMem: function (e) {
      var linktype = e.currentTarget.dataset.linktype;
      var linkurl = e.currentTarget.dataset.linkurl;
      var linktitle = e.currentTarget.dataset.title;
      var type = e.currentTarget.dataset.type;
      common.cBanner(1, linkurl, "main", '', '');
    },
    //暂未开放
    statusError: function () {
      utils.uAlert("业务调整中，敬请期待")
    },
    // 查询权益卡信息
    getVipCardDetail:function(){
      var that = this;
      var vipCardId = "";
      var vipSavePrice = 0;//优惠券总价格
      var vipstopTime ="";//过期时间
      var payMemberCode = that.data.payMemberCode;
      console.log("getVipCardDetail.payMemberCode===" + JSON.stringify(payMemberCode))
      var strList = payMemberCode.split("-");
      vipCardId = strList[3];//会员权益卡id
      console.log("vipCardId===" + vipCardId)
      var appUserId = app.globalData.userId;
      var data = { rightsCardById: vipCardId, appUserId: appUserId }
      console.log("getVipCardDetail.data===" + JSON.stringify(data))
      utils.uGet(app.url.getMermberRightsCard, data, function (res) {
        console.log("getVipCardDetail.res===" + JSON.stringify(res))
        utils.hidePageToast();
        if (res.data.code == 10000) {
          var data = res.data.data;
          var dredgeStatus;//开通状态
          var vipTicketList = "";
          if (utils.uIsNull(data.appUserRights)) {//是否开通了该卡会员
            dredgeStatus = false;
            if (!utils.uIsNull(data.couponTicketList)) {
              vipTicketList = data.couponTicketList;
              for (var i = 0; i < vipTicketList.length; i++) {//轻收银折扣券不统计钱数
                if (!(vipTicketList[i].couponType == 3 && vipTicketList[i].subCouponType == 2)) {
                  vipSavePrice += vipTicketList[i].discountMoney
                }
              }
            }
          } else {
            if (data.appUserRights.status == 7) {//会员卡已过期
              dredgeStatus = false;
              if (!utils.uIsNull(data.couponTicketList)) {
                vipTicketList = data.couponTicketList;
                for (var i = 0; i < vipTicketList.length; i++) {
                  vipSavePrice += vipTicketList[i].discountMoney
                }
              }
            }else{
              dredgeStatus = true;
              vipstopTime = utils.uGetDate(data.appUserRights.stopTime)
            }
            
          }
          console.log("vipSavePrice==" + JSON.stringify(vipSavePrice))
          that.setData({
            vipSavePrice: vipSavePrice,
            vipstopTime: vipstopTime,
            dredgeStatus: dredgeStatus
          })
        }
      })
    },
    //获取会员信息
    getMemberDetail: function () {
      var that = this;
      utils.uGet(app.url.getMember, { appUserId: app.globalData.userId, "shopId": app.globalData.myStoreId }, function (res) {
        console.log("getMemberDetail.res==="+JSON.stringify(res))
        if (res.data.code == 10000) {
          var memberPoint = res.data.data.memberPoint;
          that.setData({
            memberPoint: memberPoint,
          });
          app.globalData.memberPoint = memberPoint
          utils.hidePageToast();
        }
      })
    },
    // 获取我的服务图标
    getqueryIcons:function(){
      var param = { shopId: app.globalData.myStoreId, iconTypeIds: 6 }
      var that = this
      utils.uPost(app.url.getMerchantIconByParam, param, (res) => {
        console.log("getqueryIcons==="+JSON.stringify(res))
        if (res.data.code != 10000) {
          return
        }
        var list = res.data.data
        for (var i = 0; i < list.length; i++) {
          list[i].imgUrl = app.globalData.fileUrl + list[i].imgUrl
        }
        that.setData({
          mineIconList: list
        })
      })
    },
    // 显示口令兑换弹窗
    showCouponCon:function(){
      this.setData({
        showConvert:true
      })
    },
    // 显示拨打客服弹窗
    showCallPhone: function () {
      var phone = utils.uGetLocal("shopTel")
      this.setData({
        showCallPhone: true,
        phone: phone
      })
    },
    
  }
})
