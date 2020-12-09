<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-container>
      <b-navbar-brand :to="{ name: 'Home' }">NavBar</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <template v-if="isLogin">
            <b-nav-item :to="{ name: 'Home' }"> Home </b-nav-item>
            <b-nav-item :to="{ name: 'Editor' }"> New Post </b-nav-item>
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content> {{ user.username }} </template>
              <b-dropdown-item
                :to="{
                  name: 'ProfileArticle',
                  params: {
                    slug: 1,
                  },
                }"
                >Profile</b-dropdown-item
              >
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </template>
          <template v-else>
            <b-nav-item :to="{ name: 'Register' }"> Register </b-nav-item>
            <b-nav-item :to="{ name: 'Login' }"> Login </b-nav-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      isLogin: (state) => state.auth.isLogin,
      user: (state) => state.auth.user,
    }),
  },
};
</script>
