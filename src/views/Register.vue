<template>
  <section>
    <b-container>
      <b-row>
        <b-col cols="6" class="offset-3">
          <b-card class="mt-5" title="Login To Your Account">
            <b-card-text>
              <b-form @submit.prevent="register">
                <b-form-group label="User Name">
                  <b-form-input
                    type="text"
                    v-model="username"
                    placeholder="user user"
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Email">
                  <b-form-input
                    type="email"
                    v-model="email"
                    placeholder="email"
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Your Password">
                  <b-form-input
                    type="password"
                    v-model="password"
                    placeholder="Password"
                  ></b-form-input>
                </b-form-group>

                <b-row>
                  <b-col class="d-flex justify-content-between align-items-center">
                    <div>
                      <b-button type="submit" class="mr-2" variant="primary"
                        >Register</b-button
                      >
                      <b-button type="button" variant="danger" :to="{ name: 'Home' }"
                        >Cancle</b-button
                      >
                    </div>
                    <router-link class="text-right" :to="{ name: 'Login' }"
                      >Login?</router-link
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
import { REGISTER } from "@/store/action.types";
export default {
  data() {
    return {
      username: "blog.test2",
      email: "blog.test2@gmail.com",
      password: "12345678",
    };
  },
  methods: {
    register() {
      const { username, email, password } = this;
      this.$store.dispatch(REGISTER, { user: { username, email, password } }).then(() => {
        this.$router.push({
          name: "Home",
        });
      });
    },
  },
};
</script>
