<script setup>
import {ref, reactive, inject, watch} from "vue";
import {useRouter} from "vue-router";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import ProgressSpinner from "primevue/progressspinner";
const router = useRouter();
const credentials = reactive({
	name: "",
	email: "",
	password: "",
});
const errMsg = ref("");
const API_URL = inject("API_URL");
const isConfirmEmailSent = ref(false);
const isLoginInProgress = ref(false);
const isProgressSpinnerActive = ref(false);

async function signUp(){
	isLoginInProgress.value = true;
	isProgressSpinnerActive.value = true;

	const jsonCredentials = JSON.stringify(credentials);

	try{
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: jsonCredentials
		};

		const response = await fetch(`${API_URL}/add-user`, options);
		const result = await response.json()

		if(!result.success){
			isLoginInProgress.value = false;
			isProgressSpinnerActive.value = false;
			return errMsg.value = result.msg;
		}
	}
	catch(err){
		return console.log(err);
	}

	isProgressSpinnerActive.value = false;
	isConfirmEmailSent.value = true;
}

watch(credentials, () => {
	errMsg.value = "";
});
</script>

<template>
	<div class="sign-up-container">
		<h2 style="margin-top: 0px;">Sign up</h2>

		<div class="form-input">
			<label for="name">Name</label>
			<InputText id="name" v-model="credentials.name"></InputText>
		</div>

		<div class="form-input">
			<label for="email">E-mail</label>
			<InputText id="email" v-model="credentials.email"></InputText>
		</div>

		<div class="form-input">
			<label for="password">Password</label>
			<Password id="password" v-model="credentials.password"></Password>
		</div>

		<div class="err-msg" v-if="errMsg">{{errMsg}}</div>

		<Button style="margin-top: 2rem; width: clamp(250px, 80%, 400px)" @click="signUp">Sign up</Button>

	</div>
		<div v-if="isLoginInProgress" class="conf-email-sent">
			<ProgressSpinner v-if="isProgressSpinnerActive" style="margin-top: 30dvh"/>
			<h1 v-if="isConfirmEmailSent">Please confirm your e-mail.</h1>
		</div>
</template>

<style scoped>
.sign-up-container {
	width: clamp(300px, 50%, 600px);
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	padding: 2rem;
	margin-top: 8dvh;
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

.conf-email-sent {
	width: 100%;
	height: 100%;
	position: absolute;
	display: flex;
	justify-content: center;
	background-color: rgb(from var(--p-surface-900) r g b / 40%);
	backdrop-filter: blur(10px);
	z-index: 100;
}

.conf-email-sent>h1 {
	margin-top: 30dvh;
	text-align: center;
}
</style>
