<script setup>
import ProgressSpinner from "primevue/progressspinner";
</script>


<template>
	<div class="progress-spinner-container">
		<ProgressSpinner />
	</div>
</template>


<style scoped>
.progress-spinner-container {
	width: 100%;
	height: 100%;
	top: 0;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 8px;
	background-color: rgb(from var(--p-surface-900) r g b / 50%);
	z-index: 999;
}
</style>
