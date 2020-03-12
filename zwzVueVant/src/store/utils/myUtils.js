import axios from 'axios'
import router from '@/router/index.js'
import { Dialog , Toast } from 'vant';
// import {Message,Loading} from 'element-ui'

/**
 * get请求
 * @param  {String} options.url   api地址
 * @param  {String} options.query query参数
 * @return {Promise}               Promise
 */

const uGet = async ({ url, query }) => {
  console.log("uGet请求的链接：" + url);
  console.log("uGet请求的参数：" + query);
  return await axios.get(url, { params: query }).then( res => res.data );
}

const uPost = async ({ url, query }) => {
  console.log("uGet请求的链接：" + url);
  console.log("uGet请求的参数：" + query);
  return await axios.post(url, { params: query }).then( res => res.data );
}

const uToast  =(content) => {
  Toast(content);
}

const uAlert = (content) => {
  Dialog.alert({
    message: content
  }).then(() => {
  });
}

const uConfirm = (obj) => {
  // message, title
  console.log("uConfirm=" + JSON.stringify(obj) )
  let nObj = { showCancelButton: true};
  obj.title && ( nObj.title = obj.title );
  obj.message && ( nObj.message = obj.message );
  Dialog.confirm(nObj).then(() => {
    obj.fn();
  }).catch(() => {
    // on cancel
  });
}

const uGoRouth = (content, param) => {
  router.push({
    path: content,
    query: param
  })
}

const uIsNull = (data) => {
  var status = false
  if (data === "" || data == null || data === undefined || data === "undefined") {
    status = true
  }
  return status
}

const uParams = (data) => {
  var params = "";
  for (var p in data) {
    // console.log(data[p]);
    params += p + "=" + data[p] + "&"
  }
  return params
}

const uSetLocal = (key, value) => {
  sessionStorage.setItem(key, value);
}

const uGetLocal = (key) => {
  var value = sessionStorage.getItem(key);
  return value;
}

const uClearLocal = (key) => {
  sessionStorage.removeItem(key);
}

const uGetTime = (timestamp, tType) => {
  var d = new Date(Number(timestamp));    //根据时间戳生成的时间对象
  var hour = d.getHours();
  var min = d.getMinutes();
  var sec = d.getSeconds();
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  let date;
  if (tType == "noSecond") {
    date = (d.getFullYear()) + "/" + (d.getMonth() + 1) + "/" + (d.getDate()) + " " + hour + ":" + min;
  } else if (tType == "timePoint") {
    date = hour + ":" + min;
  } else {
    date = (d.getFullYear()) + "/" + (d.getMonth() + 1) + "/" + (d.getDate()) + " " + hour + ":" + min + ":" + sec;
  }
  return date;
}


const uCloseLoading = () => {
}

export default {
  uGet, // get提交
  uPost, //post提交
  uAlert, //普通提示
  uToast,//提示
  uConfirm, //选择框
  uGoRouth,   //路由跳转
  uIsNull,  //判断是否为空
  uParams,  //拿页面上级参数
  uSetLocal,  //保存本地缓存
  uGetLocal,   //获取本地缓存
  uClearLocal,  //清除本地缓存
  uGetTime, //根据时间戳拿时间
  uCloseLoading, //关闭加载图
}
