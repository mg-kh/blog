import { FETCH_ALL_POST } from "@/store/action.types";
import { HomePost } from "@/api/index";
import { SET_POSTS, UPDATE_LIST_ARTICLE } from "@/store/mutation.actions";

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
		[SET_POSTS](state, payload) {
			const { articles, articlesCount } = payload;
			state.articles = {
				data: articles,
				articlesCount,
				error: "",
			};
		},
		[UPDATE_LIST_ARTICLE](state, article) {
			state.articles.data = state.articles.data.map((oldArticle) => {
				if (oldArticle.slug !== article.slug) return oldArticle;
				const { favorited, favoritesCount } = article;
				return Object.assign({}, oldArticle, {
					favorited,
					favoritesCount,
				});
			});
		},
	},
	actions: {
		async [FETCH_ALL_POST]({ commit }, params) {
			const { data } = await HomePost.get(params);
			const { articles, articlesCount } = data;
			commit(SET_POSTS, { articles, articlesCount });
		},
	},
};
