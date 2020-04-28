//index.js
//获取应用实例
const app = getApp()

Page({
	data: {
		motto: 'Hello World',
		userInfo: {
			avatarUrl: '',
			nickName: '',
      link: ''
		},
		lists: [
			'',
			'',
		],
		showSkeleton: true
	},
  onReady: function () {
		const that = this;
		setTimeout(() => {
			that.setData({
				showSkeleton: false,
				motto: 'Hello World',
				userInfo: {
          avatarUrl: 'http://file.feikewlkj.com/28/28_25119_1583683638033.png',
					nickName: '飞课科技',
          link: 'https://www.feikewlkj.com'
				},
				lists: [
					'欢迎您的关注！',
					'期待您的加入！',
				],
			})
		}, 2000 )
	}
})
