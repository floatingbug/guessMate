<script setup>

</script>


<template>
	<div class="container">
		<div class="card-container">
			<div class="card">
			</div>
			<div class="card">
			</div>
			<div class="card">
			</div>
		</div>
	</div>
</template>


<style scoped>
.container {
	width: 100%;
	height: 100dvh;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid green;
}

.card-container {
	width: 50%;
	height: 50%;
	display:flex;
	border: 1px solid red;
}

.card {
	min-width: 100%;
	min-height: 100%;
	background-color: grey;
	border: 1px solid white;
}
</style>
