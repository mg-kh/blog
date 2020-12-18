<template>
	<section>
		<b-container>
			<b-row class="mb-5">
				<b-col cols="12" md="8" class="offset-md-2 mt-5">
					<b-row class="setting-card-container">
						<b-col cols="6" class="p-0 d-none d-md-block">
							<div class="setting"></div>
						</b-col>
						<b-col cols="12" md="6" class="p-3 p-md-0">
							<b-card class="setting-card">
								<h3>Edit Your Settings</h3>
								<template>
									<div>
										<b-form
											@submit.prevent="
												updateProfile
											"
										>
											<b-form-group
												label="Your Profile:"
											>
												<b-form-input
													v-model="
														user.image
													"
													placeholder="Enter your profile url"
												></b-form-input>
											</b-form-group>

											<b-form-group
												label="Your Name:"
											>
												<b-form-input
													v-model="
														user.username
													"
													placeholder="Enter name"
												></b-form-input>
											</b-form-group>

											<b-form-group
												label="About You:"
											>
												<b-form-textarea
													id="textarea-small"
													size="sm"
													placeholder="Short bio about you"
													v-model="
														user.bio
													"
												></b-form-textarea>
											</b-form-group>

											<b-form-group
												label="Your Email:"
											>
												<b-form-input
													v-model="
														user.email
													"
													placeholder="Change your email"
													type="email"
												></b-form-input>
											</b-form-group>

											<b-form-group
												label="Your Password:"
											>
												<b-form-input
													v-model="
														user.password
													"
													placeholder="Change your password"
												></b-form-input>
											</b-form-group>

											<b-button
												type="submit"
												variant="primary"
												class="mr-3"
												>Update</b-button
											>
										</b-form>
									</div>
								</template>
							</b-card>
						</b-col>
					</b-row>
				</b-col>
			</b-row>
		</b-container>
	</section>
</template>

<script>
import { UPDATE_PROFILE } from "@/store/action.types";
export default {
	data() {
		return {
			user: {
				image: "",
				username: "",
				bio: "",
				email: "",
				password: "",
			},
		};
	},
	computed: {
		currentUser() {
			return this.$store.state.auth.user;
		},
	},
	created() {
		const { username, image, bio, email } = this.currentUser;
		Object.assign(this.user, { username, image, bio, email });
	},
	methods: {
		updateProfile() {
			this.$store.dispatch(UPDATE_PROFILE, this.user).then(() => {
				this.$router.push({
					name: "Home",
				});
			});
		},
	},
};
</script>
