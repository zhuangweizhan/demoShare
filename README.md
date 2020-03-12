项目介绍：

该项目基于vue-cli3.5 + vant，模仿某一线企业线上商城改版，仅供初学者快速学习与实践。

该demo的作用：
其一提供真实应用场景的使用入口，帮忙理解方法;
其二提供真实api的调用，避免新手入坑。

前置说明：
该项目为达到真实服务端交互案例。提供koa模拟数据服务端。需同时启动服务端（koa） + 客户端（vue），才可体验项目。

以下api可通过官网：https://cn.vuejs.org/v2/api查询，下边是简单说明以及具体应用场景案例说明。
vue.api的应用场景以及案例的实践：
Vue.use全局: use的作用，统一全局方法。本项目案例：全局引入vant，全局引入工具类。
Vue.filter过滤器: filter作用其一，文本值的过滤。本项目案例：统一过滤价格显示。
Vue.directive:  directive返回el, 操作dom元素。我们可用来控制元素显示。本项目案例：输入文本框聚焦时，字体统一加粗。
Vue.extend: extend，组件快速构造器。需要通过new Profile().$mount('#') 进行元素的挂载。本项目两个案例
置顶滚动条案例（搭配components）。头部点击案例（mount挂载）
Vue.mixin: 一般用于合并组件或者全局混入。本项目主要简单使用了进入页面路由打印。
Vue.observable: 可理解为min版vuex.
Vue.once: 只会执行一次。本项目案例，记录首次进入页面时间。
Vue.render: 可以定制化组件/函数式组件。本项目提供render + solt案例。 
Vue.nextTick：待dom执行变化后调用。本项目已提供案例。
Vue.component: 组件化。本项目分别提供了，同步组件案例，异步组件案例。
vm.$emit: 子父通信模式。本项目已提供案例。
v-solt: 抽取公用部分为组件，插入“不确定”的部分，插入的即为“插槽";本项目案例：头部购物车的特殊删除按钮，物流地址控件封装。
v-ref: 可直接获取dom元素。本文已提供案例。
keep-alive: keep-alive缓存组件的使用。本项目配合路由实现页面缓存，对应生命周期activated的处理。
transition：主要是处理过渡效果的。本项目切换路由的时候，用transition做页面切换效果。
vuex：配置本地缓存，虚拟服务端的的搭配。本文已提供案例。
provide-inject: 高阶组件;多组件同父级引入。本项目提供统一提示语传递案例。

其他可参考：
1.vue-cli3.0取消了，webpack的原始文件配置，可手动添加默认文件，vue.config.js，进行相关配置。
本案例vue.config.js：
	1）常用打包的配置
	2）配置本地代理。

2.全局钩子函数：router.beforeEach：登录判断验证,title设置等。
3.全局的配置：
Vue.config.errorHandler = function (err, vm, info) {
  // handle error
}
