<template>
  <section>
    <b-jumbotron
      header="Place To Share Your Ideas"
      lead="Share Your Ideas!"
      class="text-center"
    >
    </b-jumbotron>

    <b-container>
      <b-row>
        <b-col>
          <b-tabs content-class="mt-3">
            <b-tab title="New Feed"></b-tab>
            <b-tab title="Home Feed"></b-tab>
            <b-tab title="#Nitro"></b-tab>
          </b-tabs>
          <router-view></router-view>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>
