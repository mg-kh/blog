import {
	CREATE_POST,
	FAVOURITE_POST,
	UNFAVOURITE_POST,
} from "@/store/action.types";
import { SET_POST, UPDATE_LIST_ARTICLE } from "@/store/mutation.actions";
import { Post } from "@/api/index";
export const post = {
	state: {
		article: {
			isLoading: false,
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
		},
	},
	getters: {},
	mutations: {
		[SET_POST](state, article) {
			state.article.data = article;
		},
	},
	actions: {
		[CREATE_POST]({ commit }, post) {
			return Post.createPost(post);
		},

		[FAVOURITE_POST]({ commit }, slug) {
			Post.favourite(slug).then(({ data }) => {
				commit(UPDATE_LIST_ARTICLE, data.article);
				commit(SET_POST, data.article);
			});
		},
		[UNFAVOURITE_POST]({ commit }, slug) {
			Post.unfavourite(slug).then(({ data }) => {
				commit(UPDATE_LIST_ARTICLE, data.article);
				commit(SET_POST, data.article);
			});
		},
	},
};
