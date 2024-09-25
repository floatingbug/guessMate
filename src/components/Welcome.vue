<script setup>
import Divider from "primevue/divider";
</script>

<template>
	<div class="welcome-container">
		<div class="welcome-wrapper">
			<div class="left">
				<h1>Welcome to guessMate</h1>
				<p>
					In guessMate, you can take quizzes, and others can guess which answers
					you gave in the quiz. Additionally, you can create new quizzes.
				</p>
			</div>

			<Divider class="divider" layout="vertical" style="height: 100%" />

			<div class="right">
				<div class="logo">guessMate</div>

				<div class="sign-container">
					<Button
						class="button-sign"
						as="router-link"
						to="/sign-in"
						label="Sign in"
						severity="secondary"
						text
					/>
					<Button
						class="button-sign"
						as="router-link"
						to="/sign-up"
						label="Sign up"
						text
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.welcome-container {
	width: 100%;
	min-height: 80dvh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.welcome-wrapper {
	width: 80%;
	height: 300px;
	max-height: 800px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-grow: 0.3;
}

.left,
.right {
	width: 100px;
	min-width: 372px;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	font-size: 1.6rem;
	padding: 1rem;
}

.right {
	min-width: 200px;
}

.left h1 {
	font-size: 4rem;
}

.sign-container {
	display: flex;
	gap: 1rem;
}

.right .button-sign {
	padding: 0;
	margin: 0;
}

@media (max-width: 970px) {
	.divider {
		display: none;
	}

	.welcome-wrapper {
		flex-direction: column;
		text-align: center;
		margin-top: 20dvh;
	}

	.sign-container {
		justify-content: center;
	}
}
</style>
