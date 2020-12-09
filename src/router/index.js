import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
const Profile = import(/* webpackChunkName: "profile" */ "@/views/Profile");
const Editor = import(/* webpackChunkName: "editor" */ "@/views/Editor");
const Setting = import(/* webpackChunkName: "setting" */ "@/views/Setting");
const Register = import(/* webpackChunkName: "register" */ "@/views/Register");
const Login = import(/* webpackChunkName: "login" */ "@/views/Login");
const NewFeed = import(/* webpackChunkName: "newfeed" */ "@/views/NewFeed");
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
				path: "setting",
				name: "Setting",
				component: () => Setting,
			},
		],
	},
	{
		path: "/editor/:slug?",
		name: "Editor",
		component: () => Editor,
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
	base: process.env.BASE_URL,
	routes,
});

export default router;
