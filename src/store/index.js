import Vue from "vue";
import Vuex from "vuex";
import { auth } from "@/store/modules/auth";
import { post } from "@/store/modules/posts";
import { homePosts } from "@/store/modules/home";
import { profile } from "@/store/modules/profile";

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
		profile,
	},
	strict: true,
});
