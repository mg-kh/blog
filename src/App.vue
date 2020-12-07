<template>
  <section id="app">
    <nav-bar></nav-bar>
    <router-view />
  </section>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  components: { NavBar },
};
</script>

<style lang="scss">
#app {
  font-family: "Ubuntu Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
