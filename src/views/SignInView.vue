<script setup>
import { ref, computed, inject } from "vue";
import {useRouter} from "vue-router";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import FloatLabel from "primevue/floatlabel";
import store from "../store/store.js";
import ProgressSpinner from "../components/ProgressSpinner.vue";

const router = useRouter();
const API_URL = inject("API_URL");
const username = ref("");
const password = ref("");
const errMsg = ref("");
const isInProgress = ref(false);
const isSignUpButtonDisabled = computed(
	() => !username.value || !password.value,
);

function signIn() {
	isInProgress.value = true;
	console.log(isInProgress.value);

	const json = JSON.stringify({
		name: username.value,
		password: password.value,
	});

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: json,
	};

	fetch(`${API_URL}/sign-in`, options).then((response) => {
		if(!response.ok){
			return response.json().then(data => {
				return Promise.reject(data.msg);
			});
		}

		const token = response.headers.get("Authorization");
		localStorage.setItem("token", token);
		localStorage.setItem("isSignedIn", true);
		store.user.isSignedIn = true;
		store.user.name = username.value;

		return response.json();
	}).then(data => {
		router.push("/");
	}).catch(err => {
		errMsg.value = err;
	});

	isInProgress.value = false;
}
</script>

<template>
	<div class="sign-in-container">
		<div class="navbar">
			<div class="logo">guessMate</div>

			<p>Sign in to guessMate</p>
		</div>

		<div class="sign-in-wrapper card-glass">
			<ProgressSpinner v-if="isInProgress" />

			<div class="input-fields">
				<InputGroup>
					<InputGroupAddon>
						<i class="pi pi-user"></i>
					</InputGroupAddon>

					<FloatLabel>
						<InputText id="username" v-model="username" />
						<label for="username">Username or E-Mail</label>
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

			<Button
				label="Sign in"
				:disabled="isSignUpButtonDisabled"
				@click="signIn"
			/>
		</div>

		<div v-if="errMsg" class="err-msg">{{errMsg}}</div>

		<div class="link-signup-container">
			<span>New to guessMate? </span>
			<Button
				class="signup-link"
				as="router-link"
				to="/sign-up"
				label="Create an account"
				text
				style="text-decoration: none; padding: 0; width: auto"
				@click="signIn"
			/>
		</div>
	</div>
</template>

<style scoped>
.navbar {
	width: 90%;
	min-width: 300px;
	max-width: 600px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
}

.navbar p {
	font-size: 1.6rem;
}

.sign-in-container {
	width: 100%;
	height: 60dvh;
	min-height: 500px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	gap: 2rem;
}

.sign-in-wrapper {
	width: 90%;
	min-width: 300px;
	max-width: 600px;
	height: 55%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	gap: 5rem;
	padding: 2rem;
	border-radius: 8px;
}

.input-fields {
	display: flex;
	flex-direction: column;
	gap: 1.8rem;
}

.link-signup-container {
	display: flex;
	gap: 0.5rem;
}

.p-button {
	width: 100%;
}
</style>
