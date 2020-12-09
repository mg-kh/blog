<template>
  <section>
    <b-container>
      <b-row>
        <b-col cols="6" class="offset-3">
          <b-card class="mt-5" title="Login To Your Account">
            <b-card-text>
              <b-form @submit.prevent="login">
                <b-form-group label="Email">
                  <b-form-input
                    type="email"
                    required
                    v-model="email"
                    required
                    placeholder="email"
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Your Password">
                  <b-form-input
                    type="password"
                    required
                    v-model="password"
                    placeholder="Password"
                  ></b-form-input>
                </b-form-group>

                <b-row>
                  <b-col class="d-flex justify-content-between align-items-center">
                    <div>
                      <b-button type="submit" class="mr-2" variant="primary"
                        >Login</b-button
                      >
                      <b-button type="button" variant="danger" :to="{ name: 'Home' }"
                        >Cancle</b-button
                      >
                    </div>
                    <router-link class="text-right" :to="{ name: 'Register' }"
                      >Register?</router-link
                    >
                  </b-col>
                </b-row>
              </b-form>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { LOGIN } from "@/store/action.types";
export default {
  data() {
    return {
      email: "blog.test3@gmail.com",
      password: "12345678",
    };
  },
  methods: {
    login() {
      const { email, password } = this;
      this.$store.dispatch(LOGIN, { user: { email, password } }).then(() => {
        this.$router.push({ name: "Home" });
      });
    },
  },
};
</script>
