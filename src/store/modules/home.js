import { FETCH_ALL_POST } from "@/store/action.types";
import { HomePost } from "@/api/index";
import { SET_POST } from "@/store/mutation.actions";

export const homePosts = {
	state: {
		articles: {
			data: {
				author: {},
				body: "",
				createdAt: "",
				description: "",
				favorited: false,
				favoritesCount: 0,
				slug: "",
				tagList: [],
				title: "",
				updatedAt: "",
			},
			articlesCount: 0,
			error: "",
		},
		tags: {
			data: [],
			error: "",
		},
	},
	getters: {},
	mutations: {
		[SET_POST](state, payload) {
			const { articles, articlesCount } = payload;
			state.articles = {
				data: articles,
				articlesCount,
				error: "",
			};
		},
	},
	actions: {
		async [FETCH_ALL_POST]({ commit }, params) {
			const { data } = await HomePost.get(params);
			const { articles, articlesCount } = data;
			commit(SET_POST, { articles, articlesCount });
		},
	},
};
