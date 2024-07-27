<script setup>
import {ref, onMounted} from "vue";
import {userStore} from "../store/store.js";
import Menu from "primevue/menu";
const breakpoint = ref(960);
const isNavMdClose = ref(true);
const isMobileMode = ref(window.innerWidth < breakpoint.value +1);
const menu = ref();
const userMenuItems = ref([
	{
		label: "logout",
		command: logoutUser
	},
]);

onMounted(() => {
	window.addEventListener("resize", updateIsMobileMode);
});

function updateIsMobileMode(){
	isMobileMode.value = window.innerWidth < breakpoint.value +1;
}

function toggle(e){
	e.stopPropagation();
	menu.value.toggle(e);
}

function logoutUser(){
	localStorage.removeItem("token");
	localStorage.setItem("isSignedIn", false);
	userStore.isSignedIn = false;
}
</script>


<template>
	<div class="nav-container-ld" v-if="!isMobileMode">
		<RouterLink class="brand" to="/">guessMate</RouterLink>
		
		<div class="sign-container-ld" v-if="!userStore.isSignedIn">
			<RouterLink class="link link-hover link-visited" to="/sign-in">Sign in</RouterLink>
			<RouterLink class="link link-hover link-visited" to="/sign-up">Sign up</RouterLink>
		</div>

		<div class="nav-buttons-ld" v-if="userStore.isSignedIn">
			<RouterLink class="link link-hover link-visited" to="/create-quiz">Create Quiz</RouterLink>
			<RouterLink class="link link-hover link-visited" to="/take-quiz">Take Quiz</RouterLink>
			<RouterLink class="link link-hover link-visited" to="/guess-answers">Guess Answers</RouterLink>
		</div>

		<div class="user-menu-ld" style="margin-right: 20px;">
			<Button icon="pi pi-user" severity="info" outlined @click="toggle" />
			<Menu ref="menu" :model="userMenuItems" :popup="true" />
		</div>
	</div>

	<div class="nav-container-md" :class="{'close-nav-md': isNavMdClose}" v-if="isMobileMode">
		<RouterLink class="brand-md" to="/" @click="isNavMdClose = true">guessMate</RouterLink>

		<div class="sign-container-md" v-if="!userStore.isSignedIn">
			<RouterLink class="link link-hover link-visited" to="/sign-in" @click="isNavMdClose = true">Sign in</RouterLink>
			<RouterLink class="link link-hover link-visited" to="/sign-up" @click="isNavMdClose = true">Sign up</RouterLink>
		</div>

		<div class="nav-buttons-md" v-if="userStore.isSignedIn" @click="isNavMdClose = true">
			<RouterLink class="link link-hover link-visited" to="/create-quiz">Create Quiz</RouterLink>
			<RouterLink  class="link link-hover link-visited" to="/take-quiz">Take Quiz</RouterLink>
			<RouterLink class="link link-hover link-visited" to="/guess-answers">Guess Answers</RouterLink>
			
		</div>
			
		<div class="close-nav-button-md">
			<Button class="close-nav-button" icon="pi pi-arrow-up" rounded outlined @click="isNavMdClose = true"></Button>
		</div>

		<Button v-if="isNavMdClose" class="nav-toggle-button" icon="pi pi-bars" size="large" text @click="isNavMdClose = false"></Button>
	</div>

	<div v-if="isMobileMode" class="user-menu-ld" style="align-self: flex-end; margin: 10px 10px 0 0">
		<Button icon="pi pi-user" severity="info" outlined @click="toggle" />
		<Menu ref="menu" :model="userMenuItems" :popup="true" />
	</div>
			
</template>


<style scoped>
/* global styles */
.link {
	user-select: none;
	text-decoration: none;
	font-size: 1rem;
	transition: font-size 200ms;
}

.link-visited:visited {
	color: var(--p-primary-100);
}

.link-hover:hover {
	color: var(--p-primary-300);
	font-size: 1.2rem;
}

/* large device */
.nav-container-ld {
	width: 100%;
	height: 60px;
	display: flex;
	align-items: center;
	background-color: var(--p-surface-800);
	border-bottom: 1px solid var(--p-primary-900);
	box-sizing: border-box;
}

.brand {
	font-size: 2rem;
	text-decoration: none;
	padding: 1rem;
	color: var(--p-primary-500);
	user-select: none;
}

.nav-buttons-ld {
	height: 100%;
	display: flex;
	align-items: center;
	gap: 1rem;
	padding: 1rem;
	margin-left: auto;
}

.sign-container-ld {
	display: flex;
	gap: 1rem;
	margin-left: auto;
	margin-right: 20px;
}

/* mobile device */
.nav-container-md {
	width: clamp(300px, 80%, 600px);
	height: clamp(500px, 80dvh, 600px);
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: rgb(from var(--p-surface-800) r g b / 50%);
	backdrop-filter: blur(10px);
	border: 1px solid var(--p-primary-900);
	border-radius: 8px;
	transform: translateY(10dvh);
	transition: transform 500ms;
	z-index: 999;
}

.nav-buttons-md {
	width: 100%;
	min-height: 0;
	position: absolute;
	bottom: 150px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
}

.nav-buttons-md>a {
	width: clamp(180px, 90%, 600px);
	text-decoration: none;
	padding: 1rem;
	border: 1px solid var(--p-primary-900);
	border-radius: 8px;
	text-align: center;
}

.sign-container-md {
	width: clamp(180px, 90%, 400px);
	height: 60%;
	position: absolute;
	bottom: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
}

.sign-container-md>a {
	width: 80%;
	min-width: 280px;
	border: 1px solid var(--p-primary-400);
	border-radius: 8px;
	padding: 1rem;
	text-align: center;
}

.nav-container-md.close-nav-md {
	transform: translateY(-100dvh);
}

.nav-toggle-button {
	user-select: none;
	transform: translateY(100dvh);
}

.close-nav-button-md {
	position: absolute;
	bottom: 50px;
}

.brand-md {
	position: absolute;
	font-size: 1.8rem;
	color: var(--p-primary-500);
	text-decoration: none;
	margin-top: 20px;
}


</style>
