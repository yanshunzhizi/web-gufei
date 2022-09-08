import { createApp } from "vue";
import { createPinia } from "pinia";
import i18n from "./locales/index";

import App from "./App.vue";
import router from "./router";

// 2. 引入组件样式
import "vant/lib/index.css";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.config.globalProperties.window = window;
app.mount("#app");
