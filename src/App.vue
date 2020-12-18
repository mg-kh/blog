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
