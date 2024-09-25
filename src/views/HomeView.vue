<script setup>
import {ref, onMounted} from "vue";
import store from "../store/store.js";
import Welcome from "../components/Welcome.vue";
import UserSettings from "../components/UserSettings.vue";

</script>


<template>
	<Welcome v-if="!store.user.isSignedIn" />
	<UserSettings v-if="store.user.isSignedIn" />
</template>


<style scoped>
</style>
