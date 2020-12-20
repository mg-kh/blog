import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
const Profile = import(/* webpackChunkName: "profile" */ "@/views/Profile");
const Editor = import(/* webpackChunkName: "editor" */ "@/views/Editor");
const Setting = import(/* webpackChunkName: "setting" */ "@/views/Setting");
const Register = import(/* webpackChunkName: "register" */ "@/views/Register");
const Login = import(/* webpackChunkName: "login" */ "@/views/Login");
const NewFeed = import(/* webpackChunkName: "newfeed" */ "@/views/NewFeed");
const FollowFeed = import(
	/* webpackChunkName: "newfeed" */ "@/views/FollowFeed"
);
const Post = import(/* webpackChunkName: "newfeed" */ "@/views/Post");
const HomeTag = import(/* webpackChunkName: "newfeed" */ "@/views/HomeTag");
const ProfileFavourite = import(
	/* webpackChunkName: "profile-favourite" */ "@/views/ProfileFavourite"
);
const ProfileArticle = import(
	/* webpackChunkName: "profile-article" */ "@/views/ProfileArticle"
);

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		component: Home,
		children: [
			{
				path: "/",
				name: "Home",
				component: () => NewFeed,
				meta: {
					title: "Blog",
					metaTags: [
						{
							name: "description",
							content: "This is simple blog system",
						},
						{
							name: "og:image",
							content: "https://i.imgur.com/jrElvBv.png",
						},
						{
							name: "og:description",
							content: "This is simple blog system",
						},
						{
							name: "og:title",
							content: "Vue Blog",
						},
					],
				},
			},
			{
				path: "feed",
				component: () => FollowFeed,
				meta: { requiresAuth: true },
				meta: {
					title: "Followed",
				},
			},
			{
				path: "tag/:tag",
				meta: {
					title: "Tag",
				},
				component: () => HomeTag,
				props: true,
			},
		],
	},
	{
		path: "/profile/:slug",
		props: true,
		component: () => Profile,
		children: [
			{
				path: "",
				name: "ProfileArticle",
				component: () => ProfileArticle,
				meta: {
					title: "Profile",
				},
			},
			{
				path: "favourite",
				name: "ProfileFavourite",
				component: () => ProfileFavourite,
				meta: {
					title: "Favourite",
				},
			},
		],
	},
	{
		path: "/setting",
		name: "Setting",
		component: () => Setting,
		meta: {
			title: "User Setting",
			requiresAuth: true,
		},
	},
	{
		path: "/editor/:slug?",
		name: "Editor",
		props: true,
		meta: {
			title: "Post Editor",
			requiresAuth: true,
		},
		component: () => Editor,
	},
	{
		path: "/post/:slug",
		name: "Post",
		props: true,
		component: () => Post,
		meta: {
			title: "Post",
		},
	},
	{
		path: "/register",
		name: "Register",
		component: () => Register,
		meta: {
			title: "Register",
		},
	},
	{
		path: "/log-in",
		name: "Login",
		component: () => Login,
		meta: {
			title: "Log In",
		},
	},
	{
		path : "*",
		meta: {
			title: "404",
		},
		component : () => import(/* webpackChunkName: "404" */ '@/views/404.vue')
	}
];

const router = new VueRouter({
	mode: "history",
	linkExactActiveClass: "active",
	base: process.env.BASE_URL,
	routes,
});

export default router;
