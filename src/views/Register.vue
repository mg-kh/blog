<template>
  <section>
    <b-container>
      <b-row>
        <b-col cols="6" class="offset-3">
          <b-card class="mt-5" title="Login With Gmail">
            <b-button variant="primary" @click="login"
              >Login With Google</b-button
            >
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { auth, provider } from "@/plugins/firebase";
import { setLocalStorageToken } from "@/api/localStorage";
import { LOGIN } from "@/store/action.types";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      auth.signInWithPopup(provider).then((result) => {
        const token = result.credential.accessToken;
        const userName = result.user.displayName;
        const id = result.user.uid;
        setLocalStorageToken(token);
        this.$store.dispatch(LOGIN, "test data");
      });
    },
  },
};
</script>
