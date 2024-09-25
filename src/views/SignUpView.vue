<script setup>
import { ref, computed, inject, watch } from "vue";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import FloatLabel from "primevue/floatlabel";
import sendApiRequest from "../api/sendApiRequest.js";
import ProgressSpinner from "../components/ProgressSpinner.vue";

const username = ref("");
const email = ref("");
const password = ref("");
const isSignUpButtonDisabled = computed(
	() => !username.value || !email.value || !password.value,
);
const API_URL = inject("API_URL");
const errMsg = ref("");
const isConfirmEmail = ref(false);
const isProcessing = ref(false);

function signUp() {
	const json = JSON.stringify({
		name: username.value,
		email: email.value,
		password: password.value,
	});

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: json,
	};

	isProcessing.value = true;

	fetch(`${API_URL}/sign-up`, options)
		.then((response) => {
			if (!response.ok) {
				return response.json().then((data) => {
					return Promise.reject(data.msg);
				});
			}

			return response.json();
		})
		.then((data) => {
			isProcessing.value = false;
			isConfirmEmail.value = true;
		})
		.catch((err) => {
			errMsg.value = err;
			isProcessing.value = false;
		});
}

watch(
	() => username.value + email.value + password.value,
	(newValue) => {
		errMsg.value = "";
	},
);
</script>

<template>
	<div class="sign-up-container">
		<div class="navbar">
			<div class="logo">guessMate</div>

			<div class="right">
				<span style="color: grey"> Already have an account? </span>
				<Button
					class="button-signin"
					as="router-link"
					to="/sign-in"
					label="Sign in"
					icon="pi pi-arrow-right"
					iconPos="right"
					link
				/>
			</div>
		</div>

		<div class="sign-up-wrapper card-glass">
			<ProgressSpinner v-if="isProcessing" />

			<div class="input-fields">
				<InputGroup>
					<InputGroupAddon>
						<i class="pi pi-user"></i>
					</InputGroupAddon>

					<FloatLabel>
						<InputText id="username" v-model="username" />
						<label for="username">Username</label>
					</FloatLabel>
				</InputGroup>

				<InputGroup>
					<InputGroupAddon>
						<i class="pi pi-at"></i>
					</InputGroupAddon>

					<FloatLabel>
						<InputText id="email" v-model="email" />
						<label for="email">E-Mail</label>
					</FloatLabel>
				</InputGroup>

				<InputGroup>
					<InputGroupAddon>
						<i class="pi pi-lock"></i>
					</InputGroupAddon>
					<FloatLabel>
						<InputText type="password" id="password" v-model="password" />
						<label for="password">Password</label>
					</FloatLabel>
				</InputGroup>
			</div>

			<div v-if="errMsg" class="err-msg">{{ errMsg }}</div>

			<Button
				label="Sign up"
				:disabled="isSignUpButtonDisabled"
				@click="signUp"
			/>
		</div>
	</div>
</template>

<style scoped>
.navbar {
	width: 100%;
	max-width: 1300px;
	height: 30%;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	gap: 1rem;
}

.navbar .logo {
	width: 20%;
	max-width: 400px;
	display: flex;
	justify-content: flex-end;
}

.navbar .right {
	width: 30%;
	min-width: 280px;
	display: flex;
	align-items: flex-end;
	gap: 0.5rem;
	padding-right: 1rem;
}

.navbar .right span {
	min-width: 182px;
}

.navbar .right .button-signin {
	width: auto;
	min-width: 75px;
	margin: 0;
	padding: 0;
}

.sign-up-container {
	width: 100%;
	height: 60dvh;
	min-height: 500px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.sign-up-wrapper {
	width: 90%;
	min-width: 300px;
	max-width: 600px;
	height: 55%;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	padding: 2rem;
	margin-top: auto;
}

.input-fields {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.p-button {
	width: 100%;
}

a {
	text-decoration: none;
}

.err-msg {
	color: var(--p-red-500);
}

@media (max-width: 600px) {
	.navbar {
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-start;
		padding-left: 1rem;
	}

	.navbar .logo {
		justify-content: flex-start;
	}
}
</style>
