<script setup>
import {userStore} from "../store/store.js";
import Statistics from "../components/Statistics.vue";
</script>

<template>
	<Statistics v-if="userStore.isSignedIn" />
</template>

<style scoped>
</style>
