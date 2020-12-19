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
			},
			{
				path: "feed",
				component: () => FollowFeed,
				meta: { requiresAuth: true },
			},
			{ path: "tag/:tag", component: () => HomeTag, props: true },
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
			},
			{
				path: "favourite",
				name: "ProfileFavourite",
				component: () => ProfileFavourite,
			},
		],
	},
	{
		path: "/setting",
		name: "Setting",
		component: () => Setting,
		meta: { requiresAuth: true },
	},
	{
		path: "/editor/:slug?",
		name: "Editor",
		props: true,
		meta: { requiresAuth: true },
		component: () => Editor,
	},
	{
		path: "/post/:slug",
		name: "Post",
		props: true,
		component: () => Post,
	},
	{
		path: "/register",
		name: "Register",
		component: () => Register,
	},
	{
		path: "/log-in",
		name: "Login",
		component: () => Login,
	},
];

const router = new VueRouter({
	mode: "history",
	linkExactActiveClass: "active",
	base: process.env.BASE_URL,
	routes,
});

export default router;
