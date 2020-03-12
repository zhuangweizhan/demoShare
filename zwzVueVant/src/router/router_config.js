
import Main from '../views/Main.vue'

const routesConfig = [
  {
    path: '/',
    name: 'Main',
    redirect: '/mainFirst',
    component: Main,
    children: [
      {
        path: '/mainFirst',
        name: 'MainFirst',
        component: (resolve) => require(['../views/MainFirst'], resolve),/*首页*/
        meta: {
          title: '首页',
        }
      },
      {
        path: '/mainCart',
        name: 'MainCart',
        component: (resolve) => require(['../views/MainCart'], resolve),/*购物车*/
        meta: { 
          checkLogin: true,
          title: '购物车' 
         },
      },
      {
        path: '/mainPersonal',
        name: 'MainPersonal',
        component: (resolve) => require(['../views/MainPersonal'], resolve),/*个人中心*/
        meta: { checkLogin: true, title: '个人中心' }
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: '登录页面',
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      title: '注册页面',
    }
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import('../views/Forget.vue'),
    meta: {
      title: '找回密码页面',
    }
  },
  {
    path: '/productDetail',
    name: 'ProductDetailf',
    component: () => import('../views/ProductDetail.vue'),
    meta:{
      keepAlive: true,
      title: '商品详情',
    }
  },
  {
    path: '/addressList',
    name: 'AddressList',
    component: () => import('../views/AddressList.vue'),
    meta:{
      keepAlive: true,
      title: '物流列表',
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test.vue'),
    meta:{
      title: '测试',
    }
  },
]

export default routesConfig;