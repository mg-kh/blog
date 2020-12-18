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
		Vue.swal({
			timer: 3000,
			icon: "success",
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			timerProgressBar: true,
			title: "Account Register successfully",
		});
		return API_SERVICE.post("users", user);
	},
	login(user) {
		Vue.swal({
			timer: 3000,
			icon: "success",
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			timerProgressBar: true,
			title: "Login successfully",
		});
		return API_SERVICE.post("users/login", user);
	},
	get() {
		return API_SERVICE.get("user");
	},
	updateProfile(user) {
		Vue.swal({
			timer: 3000,
			icon: "success",
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			timerProgressBar: true,
			title: "Profile Update successfully",
		});
		return API_SERVICE.put("user", { user });
	},
};

export const HomePost = {
	get(params) {
		return API_SERVICE.query("articles", params);
	},
};

export const Post = {
	get(slug) {
		return API_SERVICE.get(`/articles/${slug}`);
	},
	createPost(article) {
		Vue.swal({
			timer: 3000,
			icon: "success",
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			timerProgressBar: true,
			title: "Create post successfully",
		});
		return API_SERVICE.post("articles", { article });
	},
	favourite(slug) {
		Vue.swal({
			timer: 3000,
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			timerProgressBar: true,
			title: "Yor Like It!",
		});
		return API_SERVICE.post(`articles/${slug}/favorite`);
	},
	unfavourite(slug) {
		Vue.swal({
			timer: 3000,
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			timerProgressBar: true,
			title: "You don't like it?",
		});
		return API_SERVICE.delete(`articles/${slug}/favorite`);
	},
	updatePost(slug, article) {
		Vue.swal({
			timer: 3000,
			icon: "success",
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			timerProgressBar: true,
			title: "Update post successfully",
		});
		return API_SERVICE.put(`articles/${slug}`, { article });
	},
	deletePost(slug) {
		Vue.swal({
			timer: 3000,
			icon: "success",
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			timerProgressBar: true,
			title: "Delete post successfully",
		});
		return API_SERVICE.delete(`articles/${slug}`);
	},
	getComment(slug) {
		return API_SERVICE.get(`articles/${slug}/comments`);
	},
	addComment(slug, comment) {
		Vue.swal({
			timer: 3000,
			icon: "success",
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			timerProgressBar: true,
			title: "Add Comment successfully",
		});
		return API_SERVICE.post(`articles/${slug}/comments`, {
			comment: { body: comment },
		});
	},
	deleteComment(slug, id) {
		Vue.swal({
			timer: 3000,
			icon: "success",
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			timerProgressBar: true,
			title: "Delete comment successfully",
		});
		return API_SERVICE.delete(`articles/${slug}/comments/${id}`);
	},
};

export const Profile = {
	get(username) {
		return API_SERVICE.get(`profiles/${username}`);
	},
	follow(username) {
		Vue.swal({
			timer: 3000,
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			timerProgressBar: true,
			title: "Start fllowing...",
		});
		return API_SERVICE.post(`profiles/${username}/follow`);
	},
	unFollow(username) {
		Vue.swal({
			timer: 3000,
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			timerProgressBar: true,
			title: "Unfollow user..",
		});
		return API_SERVICE.delete(`profiles/${username}/follow`);
	},
};

export const TagsService = {
	get() {
		return API_SERVICE.get("tags");
	},
};
