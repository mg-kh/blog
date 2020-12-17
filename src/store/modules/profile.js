import { Profile } from "@/api/index";
import {
	FOLLOW_USER,
	UNFOLLOW_USER,
	FETCH_PROFILE,
	COPY_PROFILE,
} from "@/store/action.types";
import { SET_PROFILE } from "@/store/mutation.actions";

export const profile = {
	state: {
		user: {
			bio: null,
			image: null,
			username: "",
			following: false,
		},
		isLoading: false,
	},
	getters: {},
	mutations: {
		[SET_PROFILE](state, payload) {
			const { user, isLoading } = payload;
			state.user = user;
			state.isLoading = isLoading;
		},
	},
	actions: {
		[FOLLOW_USER]({ commit }, username) {
			return Profile.follow(username).then(({ data }) => {
				commit(SET_PROFILE, {
					user: data.profile,
					isLoading: false,
				});
				return data.profile;
			});
		},
		[UNFOLLOW_USER]({ commit }, username) {
			return Profile.unFollow(username).then(({ data }) => {
				commit(SET_PROFILE, {
					user: data.profile,
					isLoading: false,
				});
				return data.profile;
			});
		},
		[FETCH_PROFILE]({ commit }, username) {
			commit(SET_PROFILE, { user: {}, isLoading: true });
			Profile.get(username).then(({ data }) => {
				commit(SET_PROFILE, {
					user: data.profile,
					isLoading: false,
				});
			});
		},
		[COPY_PROFILE]({ commit }, user) {
			commit(SET_PROFILE, { user, isLoading: false });
		},
	},
};
