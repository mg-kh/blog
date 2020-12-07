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
          <b-nav class="border-bottom">
            <b-nav-item active>New Feed</b-nav-item>
            <b-nav-item>Followed Feed</b-nav-item>
          </b-nav>
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
