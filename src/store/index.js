import Vue from "vue";
import Vuex from "vuex";
import { auth } from "@/store/modules/auth";
import { post } from "@/store/modules/posts";
import { homePosts } from "@/store/modules/home";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	modules: {
		auth,
		post,
		homePosts,
	},
	strict: true,
});
