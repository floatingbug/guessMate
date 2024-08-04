<script setup>
import {ref, reactive, inject} from "vue";
import {useRouter} from "vue-router";
import {userStore} from "../store/store.js";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import ProgressSpinner from "../components/ProgressSpinner.vue";
const router = useRouter();
const credentials = reactive({
	name: "",
	password: ""
});
const errMsg = ref("");
const API_URL = inject("API_URL");
const isLoading = ref(false);

async function signIn(){
	const jsonCredentials = JSON.stringify(credentials);
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: jsonCredentials
	};

	try{
		isLoading.value = true;
		
		const response = await fetch(`${API_URL}/sign-in`, options);
		const result = await response.json();
		
		if(!result.success){
			isLoading.value = false;
			return errMsg.value = result.msg;
		}

		const authorizationHeader = response.headers.get("Authorization");
		const token = authorizationHeader.replace("Bearer", "");
		const trimmedToken = token.trim();
		localStorage.setItem("token", trimmedToken);
		localStorage.setItem("isSignedIn", true);
		userStore.isSignedIn = true;
	}
	catch(err){
		isLoading.value = false;
		return console.log(err);
	}

	isLoading.value = false;
	router.push("/");
}
</script>

<template>
	<div class="sign-up-container">
		<ProgressSpinner v-if="isLoading" />

		<h2 style="margin-top: 0px;">Sign in</h2>

		<div class="form-input">
			<label for="name">Name/E-Mail</label>
			<InputText id="name" v-model="credentials.name"></InputText>
		</div>
		

		<div class="form-input">
			<label for="password">Password</label>
			<Password id="password" :feedback="false" v-model="credentials.password"></Password>
		</div>

		<div class="err-msg" v-if="errMsg">{{errMsg}}</div>

		<Button style="margin-top: 2rem; width: clamp(250px, 80%, 400px)" @click="signIn">Sign in</Button>
	</div>
</template>

<style scoped>
.sign-up-container {
	width: clamp(300px, 50%, 600px);
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	padding: 2rem;
	margin-top: 10dvh;
	background-color: var(--p-surface-900);
	border: 1px solid var(--p-primary-900);
	border-radius: 8px;
}

.form-input {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
}

.form-input>label {
	min-width: 150px;
}

.form-input>* {
	flex: 1;
}

:deep(.p-password-input) {
	flex: 1;
}

.err-msg {
	color: var(--p-red-500);
}
</style>
