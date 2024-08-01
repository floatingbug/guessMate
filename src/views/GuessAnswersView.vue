<script setup>
import {ref, onMounted, inject} from "vue";
import {useRouter} from "vue-router";
import SelectAnswer from "../components/SelectAnswer.vue";
import Card from "primevue/card";
const router = useRouter();
const isGuessStarted = ref(false);
const isDataLoadedFromServer = ref(false);
const quiz = ref([]);
const errMsg = ref("");
const API_URL = inject("API_URL");
let quizId = null;
let answersId = null;
let token = null;
let guesses = [];
let slideCount = 1;
let currSlide = 0;
let cardStyle = ref("");

onMounted(() => {
	token = localStorage.getItem("token");
});

async function startGuess(params){
	quizId = params.quizId;
	answersId = params.answersId
	const data = {quizIds: [quizId]};
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": token
		},
		body: JSON.stringify(data)
	};
	
	try{
		const response = await fetch(`${API_URL}/get-quizzes`, options);
		const result = await response.json();

		if(!result.success) return errMsg.value = result.msg;

		quiz.value = result.data[0].quiz;
	}
	catch(err){
		return console.log(err);
	}
	
	isGuessStarted.value = true;
	isDataLoadedFromServer.value = true;
}

function makeGuess(index, answers){
	guesses.push(index);

	if(slideCount >= quiz.value.length) sendGuesses(guesses, answersId);

	currSlide++;

	const pos = -100 * currSlide;
	cardStyle= `transform: translateX(${pos}%)`;

	slideCount++;
}

async function sendGuesses(guesses, answersId){
	const data = {
		answersId: answersId,
		guesses: guesses
	};
	console.log(data);
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": token
		},
		body: JSON.stringify(data)
	};

	try{
		const response = await fetch(`${API_URL}/add-guess`, options);
		const result = await response.json();

		if(!result.success) return errMsg.value = result.msg;
	}
	catch(err){
		return console.log(err);
	}

	router.push("/");
}
</script>


<template>
	<div v-if="errMsg" class="err-msg">{{errMsg}}</div>

	<SelectAnswer v-if="!isGuessStarted" @startGuess="startGuess" />

	<div v-if="isGuessStarted && isDataLoadedFromServer" class="container">
		<div class="slider-container">
			<Card v-for="(question, index) in quiz" :style="cardStyle">
				<template #title>
					<div class="card-title">
						<span>Question {{index+1}}: </span>
						<span>{{question.question}}</span>
					</div>
				</template>

				<template #content>
					<div class="card-content">
						<a href="#" class="answer" v-for="(answer, index) in question.answers" @click="makeGuess(index);">
							{{answer}}
						</a>
					</div>
				</template>
			</Card>
		</div>
	</div>
</template>


<style scoped>
.container {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.slider-container {
	width: 100%;
	min-width: 300px;
	max-width: 800px;
	display: flex;
	margin-top: 1rem;
	overflow: hidden;
}

.p-card {
	min-width: 100%;
}

:deep(.p-card-body) {
	padding: 0;
}

.card-title {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	padding: 1rem;
}

.card-title :first-child {
	flex: 1;
	flex-basis: 150px;
}

.card-title :last-child {
	flex: 2;
}

.card-content {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	padding: 1rem;
}

a {
	min-width: 280px;
	min-height: 300px;
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid var(--p-primary-900);
	border-radius: 8px;
	text-decoration: none;
	color: var(--p-text-color);
	background-color: var(--p-content-background);
}

a:visited {
	color: var(--p-text-color);
}

a:hover {
	color: var(--p-text-hover-color);
	background-color: var(--p-content-hover-background);
}
</style>
