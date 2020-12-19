import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import API_SERVICE from "@/api/index";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueSweetalert2 from "vue-sweetalert2";
import "./assets/style/style.scss";
import "sweetalert2/dist/sweetalert2.min.css";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueSweetalert2);
API_SERVICE.init();

router.beforeEach((to, from, next) => {
	const { user } = store.state.auth;
	document.title = to.meta.title;
	const metaArr = to.meta.metaTags;
	if (metaArr) {
		metaArr.forEach((meta) => {
			const metaTag = document.createElement("meta");
			if (meta.name == "description") {
				metaTag.setAttribute("name", meta.name);
				metaTag.setAttribute("content", meta.content);
			} else {
				metaTag.setAttribute("property", meta.name);
				metaTag.setAttribute("content", meta.content);
			}
			// document.body.appendChild(metaTag);
			document.head.appendChild(metaTag);
		});
	}

	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (!user.username) {
			next({
				name: "Login",
				query: { redirect: to.fullPath },
			});
		} else {
			next();
		}
	} else {
		next();
	}
});

store.dispatch("AUTH_CHECK");

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
