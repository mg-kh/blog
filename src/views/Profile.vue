<template>
  <section>
    <b-jumbotron header="Kaung Htet" lead="Welcome" class="text-center">
      <b-button :to="{ name: 'Setting' }" class="mr-2">Setting</b-button>
      <b-button :to="{ name: 'Setting' }" class="mr-2">Setting</b-button>
      <b-button :to="{ name: 'Editor' }">Write Post</b-button>
    </b-jumbotron>
    <router-view></router-view>
  </section>
</template>
