import { createApp } from "vue";

import App from "./App.vue";
import { router } from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import "./style.css";

const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
