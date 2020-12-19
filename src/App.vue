<template>
	<section id="app">
		<nav-bar></nav-bar>
		<router-view />
		<the-footer></the-footer>
	</section>
</template>

<script>
import NavBar from "@/components/NavBar";
import TheFooter from "@/components/TheFooter";
export default {
	components: { TheFooter, NavBar },
	watch: {
		$route: {
			immediate: true,
			handler(to, from) {
				if (to.meta.title) {
					document.title = to.meta.title;
					const metaArr = to.meta.metaTags;
					if (metaArr) {
						metaArr.forEach((meta) => {
							const metaTag = document.createElement(
								"meta"
							);
							if (meta.name == "description") {
								metaTag.setAttribute("name", meta.name);
								metaTag.setAttribute(
									"content",
									meta.content
								);
							} else {
								metaTag.setAttribute(
									"property",
									meta.name
								);
								metaTag.setAttribute(
									"content",
									meta.content
								);
							}
							document.head.appendChild(metaTag);
							console.log(document.head);
						});
					}
				}
			},
		},
	},
};
</script>

<style lang="scss">
#app {
	// font-family: "Ubuntu Mono", monospace;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
</style>
