<script setup>
import {onMounted, provide} from "vue";
import { RouterLink, RouterView } from 'vue-router'
import {userStore} from "./store/store.js";
import Navigation from "./components/Navigation.vue";

//provide("API_URL", "http://194.195.241.51:3002");
provide("API_URL", "http://localhost:3000");

onMounted(() => {
	const isSignedIn = localStorage.getItem("isSignedIn");

	userStore.isSignedIn = isSignedIn === "true" || isSignedIn === true;
});
</script>

<template>
	<Navigation />

	<RouterView />
</template>

<style scoped>
</style>
