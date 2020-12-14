import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { API_URL } from "@/api/config";
import { getLocalStorageToken } from "@/api/localStorage";

const API_SERVICE = {
	init() {
		Vue.use(VueAxios, axios);
		Vue.axios.defaults.baseURL = API_URL;
	},

	setHeader() {
		const token = getLocalStorageToken();
		if (token) {
			Vue.axios.defaults.headers.common[
				"Authorization"
			] = `Token ${token}`;
		} else {
			delete Vue.axios.defaults.headers.common["Authorization"];
		}
	},

	query(resource, params) {
		return Vue.axios.get(resource, { params }).catch((err) => {
			throw new Error(`[RWV] ApiService ${error}`);
		});
	},

	get(resource, slug = "") {
		return Vue.axios.get(`${resource}/${slug}`).catch((err) => {
			throw new Error(`[RWV] ApiService ${err}`);
		});
	},

	post(resource, params) {
		return Vue.axios.post(`${resource}`, params);
	},

	put(resource, params) {
		return Vue.axios.put(`${resource}`, params);
	},

	delete(resource) {
		return Vue.axios.delete(resource).catch((error) => {
			throw new Error(`[RWV] ApiService ${error}`);
		});
	},
};

export default API_SERVICE;

export const Auth = {
	register(user) {
		return API_SERVICE.post("users", user);
	},
	login(user) {
		return API_SERVICE.post("users/login", user);
	},
	get() {
		return API_SERVICE.get("user");
	},
	updateProfile(user) {
		return API_SERVICE.put("user", { user });
	},
};

export const HomePost = {
	get(params) {
		return API_SERVICE.query("articles", params);
	},
};

export const Post = {
	createPost(article) {
		return API_SERVICE.post("articles", { article });
	},
	favourite(slug) {
		return API_SERVICE.post(`articles/${slug}/favorite`);
	},
	unfavourite(slug) {
		return API_SERVICE.delete(`articles/${slug}/favorite`);
	},
};
