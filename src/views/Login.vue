<template>
	<section>
		<b-container>
			<b-row>
				<b-col cols="12" md="6" class="offset-md-3">
					<b-card class="mt-5 loginForm">
						<img
							src="../assets/images/login.svg"
							alt="login"
						/>
						<h3 class="text-center">Login Here!</h3>
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
									<b-col class="">
										<b-button
											type="submit"
											class="mb-2 btn-block"
											>Login</b-button
										>
										<router-link
											class="text-right"
											:to="{
												name: 'Register',
											}"
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
			email: "",
			password: "",
		};
	},
	methods: {
		login() {
			const { email, password } = this;
			this.$store
				.dispatch(LOGIN, { user: { email, password } })
				.then(() => {
					this.$swal({
						timer: 3000,
						icon: "success",
						toast: true,
						position: "top-end",
						showConfirmButton: false,
						timerProgressBar: true,
						title: "Log in successfully",
					});

					const { redirect } = this.$route.query;
					if (redirect) this.$router.push({ path: redirect });
					else this.$router.push({ name: "Home" });
				});
		},
	},
};
</script>
