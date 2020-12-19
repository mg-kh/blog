import {
	FETCH_ALL_POST,
	FETCH_TAGS,
	FETCH_FOLLOW_POST,
} from "@/store/action.types";
import { HomePost, TagsService } from "@/api/index";
import {
	SET_POSTS,
	UPDATE_LIST_ARTICLE,
	SET_TAGS,
} from "@/store/mutation.actions";

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
		[SET_TAGS](state, tags) {
			state.tags = {
				data: tags,
				error: "",
			};
		},
	},
	actions: {
		async [FETCH_ALL_POST]({ commit }, params) {
			const { data } = await HomePost.get(params);
			const { articles, articlesCount } = data;
			commit(SET_POSTS, { articles, articlesCount });
		},
		async [FETCH_FOLLOW_POST]({ commit }, params) {
			const { data } = await HomePost.getFeed(params);
			const { articles, articlesCount } = data;
			commit(SET_POSTS, { articles, articlesCount });
		},
		async [FETCH_TAGS]({ commit }) {
			const { data } = await TagsService.get();
			commit(SET_TAGS, data.tags);
		},
	},
};
