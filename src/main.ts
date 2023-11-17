import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import mitt from "mitt";

const app = createApp(App);
const pinia = createPinia();
const emitter = mitt();

app.use(pinia);
app.config.globalProperties.emitter = emitter;
app.use(router);
app.mount("#app");
