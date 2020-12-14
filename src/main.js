import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import API_SERVICE from "@/api/index";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "./assets/style/style.scss";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
API_SERVICE.init();

// router.beforeEach((to, from, next) => {
// 	const { user } = store.state.auth;
// 	console.log(user);
// 	next();
// });
store.dispatch("AUTH_CHECK");

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
