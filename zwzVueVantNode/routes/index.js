const router = require('koa-router')()
// const fileUrl = 'http://172.30.12.14:3000/';

const fileUrl = 'http://localhost:3000/';

router.get('/toLogin', async (ctx, next) => {
  const userName = ctx.query.userName;
  const password = ctx.query.password;
  let json = {};
  if (userName === '体验账号' || password === 'a123456') {
    json = { code: 10000, userDetail: { name: "体验者账号", area: "广东广州" } }
  } else {
    json = { code: 10001, msg: '操作失败' };
  }
  ctx.body = json;
})

router.get('/getCateList', async (ctx, next) => {
  let list = [];
  list.push({ name: '全部', url: 'cate_all.jpg' })
  list.push({ name: 'web', url: 'cate_0.jpg' })
  list.push({ name: 'java', url: 'cate_1.png' })
  for (var k = 0; k < 11; k++) {
    list.push({ name: '其他' + k, url: 'cate_2.jpg' })
  }
  list.forEach((item, index) => {
    item.id = index;
    item.url = fileUrl + item.url;
  })
  let json = {
    code: 10000,
    list: list,
  }
  ctx.body = json;
})

router.get('/getProdList', async (ctx, next) => {
  let list = getProductList();
  let result = {};
  console.log("ctx.query.id===" + ctx.query.id);
  if (!ctx.query.id) {
    let cateId = ctx.query.cateId;//根据分类过滤
    list = list.filter(function (item) {
      return cateId ? (item.cateId == cateId || cateId == 0 ? true : false) : true;
    })

    let priceTag = ctx.query.priceTag;//根据标签过滤
    list = list.filter(function (item) {
      return priceTag ? (item.price >= priceTag * 5000 ? true : false) : true;
    })

    let special = ctx.query.special;//根据特殊
    list = list.filter(function (item) {
      return !special ? true : ( special == item.special ? true : false );
    })

    let totalCount = list.length;
    let start = ctx.query.start;//
    let limit = ctx.query.limit;//
    if (start) {//分页过滤
      list = list.slice(start, start + limit);
    } else {
      list = list.slice(0, 6);//无分页返回10条数据
    }
    result = {
      code: 10000,
      list: list,
      totalCount: totalCount
    }
  } else {
    let detail = list.filter(item => {
      return item.id == ctx.query.id ? true : false;
    })
    result = {
      code: 10000,
      detail: detail[0],
    }
  }
  ctx.body = result;
})

router.get('/getMoneyFilterList', async (ctx, next) => {
  let list = [];
  for (var k = 0; k < 3; k++) {
    list.push({ name: k * 50 + "以上", value: k })
  }
  let json = {
    code: 10000,
    list: list,
  }
  ctx.body = json;
})

router.get('/getCartList', async (ctx, next) => {
  let list = getProductList().slice(0, 3);
  list.forEach((item, index) => {
    item.productNum = (index + 1);
    item.inventory = 50;
  })
  list[0].inventory = 0;
  let json = {
    code: 10000,
    list: list,
  }
  ctx.body = json;
})

router.get('/getStoreList', async (ctx, next) => {
  let plist = getProductList();
  let javaList = plist.filter(item => {
    return (item.cateId == 2);
  }).slice(0, 3);
  let webList = plist.filter(item => {
    return (item.cateId == 1);
  }).slice(0, 3);
  let storeJava = {
    "orgName": "java书店",
    "phone": "1888888888",
    "remark": "想成为java大神吗，加入我们！",
    "address": "广东省广州市",
    "image": fileUrl + "shop_0.png",
    "productList": javaList,
  };
  let webJava = {
    "orgName": "web书店",
    "phone": "1888888888",
    "remark": "想成为web大神吗，加入我们！",
    "address": "广东省深圳市",
    "image": fileUrl + "shop_1.png",
    "productList": webList,
  };
  ctx.body = [ storeJava, webJava ];
});



function getProductList() {
  let list = [];
  list.push({ name: 'web前端开发书籍网页设计教程书', url: 'javasrcipt.jpg', cateId: 1, price: 6990, desc: 'javasrcipt' })
  list.push({ name: '前端开发 快速入门与专业应用Vue.js指南', url: 'vue.js.jpg', cateId: 1, price: 3980, desc: 'vue', special: 'hot' })
  list.push({ name: '深入理解TypeScript TypeScript编程', url: 'typesrcipt.jpg', cateId: 1, price: 2270, desc: 'typesrcipt' , special: 'new'})
  list.push({ name: 'Webpack配置实战优化原理应用教程书籍 前端构建工具', url: 'webpack.jpg', cateId: 1, price: 2950, desc: 'webpack' })
  list.push({ name: 'java实战', url: 'java.jpg', cateId: 2, price: 3150, desc: 'java' })
  for (var k = 0; k < 25; k++) {
    list.push({ name: '商品案例' + k, url: 'product_2.jpg', cateId: 3, price: (25 - k) * 174 })
  }
  list.forEach((item, index) => {
    item.id = index;
    item.url = fileUrl + item.url;
    item.desc = "好东西，齐分享1";
    item.originalPrice = item.price * 1.2
    item.productParameters = [
      {
        paramName: "颜色",
        valueList: [{ value: '红' }, { value: '黄' }]
      },
      {
        paramName: "重量",
        valueList: [{ value: '500g' }, { value: '300g' }]
      },
    ]
  })



  return list;
}


module.exports = router
