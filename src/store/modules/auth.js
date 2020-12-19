import { Auth } from "@/api/index";
import {
	setLocalStorageToken,
	getLocalStorageToken,
	removeLocalStorageToken,
} from "@/api/localStorage.js";
import API_SERVICE from "@/api/index";
import {
	LOGIN,
	REGISTER,
	UPDATE_PROFILE,
	AUTH_CHECK,
	LOGOUT,
} from "@/store/action.types";
import { SET_ACCOUNT, REMOVE_ACCOUNT } from "@/store/mutation.actions";

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
		[REMOVE_ACCOUNT](state) {
			state.user = {};
			state.isLogin = false;
			state.errors = {};
		},
	},
	actions: {
		[REGISTER]({ commit }, user) {
			return Auth.register(user).then(({ data }) => {
				commit(SET_ACCOUNT, data.user);
				setLocalStorageToken(data.user.token);
				API_SERVICE.setHeader();
			});
		},
		[LOGIN]({ commit }, user) {
			return Auth.login(user).then(({ data }) => {
				commit(SET_ACCOUNT, data.user);
				setLocalStorageToken(data.user.token);
				API_SERVICE.setHeader();
			});
		},
		[LOGOUT]({ commit }) {
			removeLocalStorageToken();
			API_SERVICE.setHeader();
			commit(REMOVE_ACCOUNT);
		},
		[AUTH_CHECK]({ commit }) {
			if (getLocalStorageToken()) {
				API_SERVICE.setHeader();
				Auth.get().then(({ data }) => {
					commit(SET_ACCOUNT, data.user);
				});
			}
		},
		[UPDATE_PROFILE]({ commit, state }, user) {
			let { email, username, password, image, bio } = user;
			if (!password) password = state.user.password;
			console.log(user);
			return Auth.updateProfile({
				email,
				username,
				password,
				image,
				bio,
			}).then(({ data }) => {
				commit(SET_ACCOUNT, data.user);
			});
		},
	},
};
