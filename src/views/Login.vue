<template>
  <section>
    <b-container>
      <b-row>
        <b-col cols="6" class="offset-3">
          <b-card class="mt-5" title="Login To Your Account">
            <b-card-text>
              <b-form>
                <b-form-group label="Phone Number">
                  <b-form-input
                    type="text"
                    required
                    placeholder="Phone Number"
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Your Password">
                  <b-form-input
                    type="password"
                    required
                    placeholder="Password"
                  ></b-form-input>
                </b-form-group>

                <b-row>
                  <b-col
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <b-button type="submit" class="mr-2" variant="primary"
                        >Login</b-button
                      >
                      <b-button
                        type="button"
                        variant="danger"
                        :to="{ name: 'Home' }"
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
export default {
  //
};
</script>
