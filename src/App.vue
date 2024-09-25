<script setup>
import { onMounted } from "vue";
import ToggleSwitch from "./components/ToggleSwitch.vue";
import "primeicons/primeicons.css";
import store from "./store/store.js";
import {jwtDecode} from "jwt-decode";

onMounted(() => {
	const isDarkMode = localStorage.getItem("isDarkMode");
	const html = document.querySelector("html");

	if (isDarkMode === true || isDarkMode === "true")
		html.classList.toggle("dark");

	if(localStorage.getItem("isSignedIn") === true ||
		localStorage.getItem("isSignedIn") === "true")
	{
		const token = localStorage.getItem("token");
		const user = jwtDecode(token);
		store.user.isSignedIn = true;
		store.user.name = user.name;
		store.user.madeQuizzes = user.madeQuizzes;
		store.user.guesses = user.guesses;
		store.user.createdQuizzes = user.createdQuizzes;
		store.user.quizParticipants = user.quizParticipants;
		store.user.guessesParticipants = user.guessesParticipants;
		console.log(store.user)
	}
});
</script>

<template>
	<ToggleSwitch />

	<RouterView />
</template>

<style scoped></style>
