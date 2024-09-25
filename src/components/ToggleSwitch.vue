<script setup>
import { ref, watch, onMounted } from "vue";
import ToggleSwitch from "primevue/toggleswitch";
const isDarkMode = ref(false);

onMounted(() => {
	const storeIsDarkMode = localStorage.getItem("isDarkMode");
	const html = document.querySelector("html");

	if (storeIsDarkMode === true || storeIsDarkMode === "true") {
		html.classList.toggle("dark");
		isDarkMode.value = true;
	}
});

watch(isDarkMode, (newValue) => {
	const html = document.querySelector("html");

	if (isDarkMode) {
		html.classList.toggle("dark");
		localStorage.setItem("isDarkMode", isDarkMode.value);
	}
});
</script>

<template>
	<div class="toggle-switch-container">
		<ToggleSwitch v-model="isDarkMode" />
	</div>

	<div class="testi"></div>
</template>

<style scoped>
.toggle-switch-container {
	position: absolute;
	right: 1rem;
	top: 1rem;
}
</style>
