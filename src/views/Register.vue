<template>
	<section>
		<b-container>
			<b-row>
				<b-col cols="12" md="6" class="offset-md-3">
					<b-card class="my-5 regForm">
						<img
							src="../assets/images/reg.svg"
							alt="register"
						/>
						<h3 class="text-center">Register Here!</h3>
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
									<b-col>
										<b-button
											type="submit"
											class="mb-2 btn-block"
											variant="primary"
											>Register</b-button
										>
										<router-link
											class="text-right"
											:to="{ name: 'Login' }"
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
		<the-error :errors="errors"></the-error>
	</section>
</template>

<script>
import { REGISTER, LOGOUT } from "@/store/action.types";
import TheError from "@/components/TheError";
import { mapActions } from "vuex";
export default {
	data() {
		return {
			username: "",
			email: "",
			password: "",
			errors: {},
		};
	},
	components: {
		TheError,
	},
	methods: {
		...mapActions({
			registerAccount: REGISTER,
		}),
		async register() {
			try {
				const { username, email, password } = this;
				await this.registerAccount({
					user: { username, email, password },
				});
				this.$router.push({ name: "Home" });
			} catch ({ response }) {
				this.errors = response.data.errors;
			}
		},
		logout() {
			this.$store.dispatch(LOGOUT);
		},
	},
	created() {
		this.logout();
	},
};
</script>
