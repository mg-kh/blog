import { Auth } from "@/api/index";
import { setLocalStorageToken } from "@/api/localStorage.js";
import API_SERVICE from "@/api/index";
import { LOGIN, REGISTER } from "@/store/action.types";
import { SET_ACCOUNT } from "@/store/mutation.actions";

export const auth = {
	state: {
		user: {
			bio: null,
			createdAt: "",
			email: "",
			id: null,
			image: null,
			token: "",
			updatedAt: "",
			username: "",
		},
		isLogin: false,
	},
	getters: {},
	mutations: {
		[SET_ACCOUNT](state, user) {
			state.user = user;
			state.isLogin = true;
		},
	},
	actions: {
		[REGISTER]({ commit }, user) {
			return new Promise((res, rej) => {
				Auth.register(user)
					.then((resp) => {
						commit(SET_ACCOUNT, resp.user);
						setLocalStorageToken(resp.user.token);
						API_SERVICE.setHeader();
						res();
					})
					.catch((err) => {
						console.log(err);
					});
			});
		},
		[LOGIN]({ commit }, user) {
			return new Promise((res, rej) => {
				Auth.login(user).then(({ data }) => {
					console.log(data);
					commit(SET_ACCOUNT, data.user);
					setLocalStorageToken(data.user.token);
					API_SERVICE.setHeader();
					res();
				});
			});
		},
	},
};
