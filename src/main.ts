import { createApp } from "vue";
import { createPinia } from "pinia";
import i18n from "./locales/index";

import App from "./App.vue";
import router from "./router";
// const wx = require("wx");

// 2. 引入组件样式
import "vant/lib/index.css";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.config.globalProperties.window = window;
// app.config.globalProperties.wx = wx;
app.mount("#app");

// console.log("wx", wx);

/* wx.config({
  debug: true, // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印。
  appId: "wx88780352aaf495a5", // 必填，公众号的唯一标识
  timestamp: 2312121121212, // 必填，生成签名的时间戳
  nonceStr: "", // 必填，生成签名的随机串
  signature: "", // 必填，签名
  jsApiList: [], // 必填，需要使用的 JS 接口列表
});
 */
