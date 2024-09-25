<script setup>
import store from "../store/store.js";
</script>


<template>
	<header>
		<h1>guessMate</h1>
	</header>

	<main>
		<div class="menu-container">
			<div class="menu card-glass">
				<div class="card-header">
					<h1>Make create or guess a quiz</h1>
				</div>

				<div class="card-main">
					<Button as="router-link" to="/make-quiz" label="Make quiz" text />
					<Button as="router-link" to="/guess-quizz" label="guess a quiz" text />
					<Button as="router-link" to="/make-quiz" label="Create own quiz" text />
				</div>
			</div>
		</div>
	</main>

	<footer>
		<div class="left">
			<span>
				Creator: Thomas Hof
			</span>
			<span>
				Kontakt: <a href="mailto:thomas@example.com">thomas@example.com</a>
			</span>
		</div>
		
		<div class="mid">
    		<span>
    			&copy; 2024 Thomas Hof. All rights reserved.
    		</span>
    		<span>
    			Version 1.0.0
    		</span>
		</div>
		
		<div class="right">
    		<span>
    			<a href="/impressum">Impressum</a> | <a href="/privacy">Datenschutzerklärung</a>
    		</span>
		</div>
	</footer>
</template>


<style scoped>
header {
	min-height: 20dvh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--header-color);
}

main {
	min-height: 60dvh;
}

footer {
	width: 100%;
	height: 20dvh;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	gap: 2rem;
	flex-wrap: wrap;
	background-color: var(--footer-color);
	margin-top: 10dvh;
}

.menu-container {
	display: flex;
	justify-content: center;
}

.menu {
	width: 95%;
	max-width: 800px;
	min-height: 220px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	margin-top: 10dvh;
}

.menu .card-header {
	text-align: center;
}

header h1 {
	font-size: 4rem;
}

footer>div {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

@media(max-width: 430px) {
	.menu .card-main {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.menu .card-header {
		text-align: start;
	}
	
	.menu {
		max-width: 300px;
		gap: 2rem;
		align-items: flex-start;
	}

	header h1 {
		font-size: 3rem;
	}
}
</style>
