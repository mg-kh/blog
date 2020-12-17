import {
	CREATE_POST,
	FAVOURITE_POST,
	UNFAVOURITE_POST,
	FETCH_POST,
	SET_AUTHOR_POST,
	DELETE_POST,
	UPDATE_POST,
	ADD_COMMENT,
	FETCH_COMMENT,
	DELETE_COMMENT,
} from "@/store/action.types";
import {
	SET_POST,
	UPDATE_LIST_ARTICLE,
	END_LOAD_POST,
	UPDATE_COMMENT,
} from "@/store/mutation.actions";
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
		comments: {
			isLoading: false,
			data: [],
		},
	},
	getters: {},
	mutations: {
		[SET_POST](state, article) {
			state.article.data = article;
		},
		[END_LOAD_POST](state, article) {
			state.article = {
				data: article,
			};
		},
		[UPDATE_COMMENT](state, comments) {
			state.comments = comments;
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
		[FETCH_POST]({ commit }, slug) {
			Post.get(slug).then(({ data }) => {
				commit(END_LOAD_POST, data.article);
			});
		},
		[SET_AUTHOR_POST]({ commit, state }, author) {
			const article = Object.assign({}, state.article.data, {
				author,
			});
			commit(SET_POST, article);
		},
		[UPDATE_POST]({ commit }, payload) {
			const { slug, article } = payload;
			return Post.updatePost(slug, article);
		},
		[DELETE_POST]({ commit }, slug) {
			Post.deletePost(slug);
		},
		[ADD_COMMENT]({ commit, state }, payload) {
			const { slug, comment } = payload;
			Post.addComment(slug, comment).then(({ data }) => {
				state.comments.data.unshift(data.comment);
				commit(UPDATE_COMMENT, {
					data: state.comments.data,
					isLoading: false,
				});
			});
		},
		[FETCH_COMMENT]({ commit }, slug) {
			commit(UPDATE_COMMENT, { data: [], isLoading: true });
			Post.getComment(slug).then(({ data }) => {
				commit(UPDATE_COMMENT, {
					data: data.comments,
					isLoading: false,
				});
			});
		},
		[DELETE_COMMENT]({ commit, state }, payload) {
			const { slug, id } = payload;
			Post.deleteComment(slug, id).then(({ data }) => {
				const comments = state.comments.data.filter(
					(comment) => comment.id !== id
				);
				commit(UPDATE_COMMENT, {
					data: comments,
					isLoading: false,
				});
			});
		},
	},
};
