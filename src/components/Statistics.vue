<script setup>
import {ref, onMounted, inject} from "vue";
import Card from "primevue/card";
import Paginator from 'primevue/paginator';
import ProgressSpinner from "./ProgressSpinner.vue";
import {deleteFromApi} from "../services/deleteFromApi.js";
const API_URL = inject("API_URL");
const userData = ref();
const errMsg = ref("");
const isResponseFromServer = ref(false);
const isLoading = ref(false);
const cardStyleQuizzes = ref("");
const cardStyleAnswers = ref("");
const cardStyleGuesses = ref("");
let token = null;

onMounted(async () => {
	isLoading.value = true;

	token = localStorage.getItem("token");

	await getUserData();

	isResponseFromServer.value = true;
	isLoading.value = false;
});

function changeSlideQuizzes(e){
	const transValue = e.page * -100;
	cardStyleQuizzes.value = `transform: translateX(${transValue}%)`;
};
function changeSlideAnswers(e){
	const transValue = e.page * -100;
	cardStyleAnswers.value = `transform: translateX(${transValue}%)`;
};
function changeSlideGuesses(e){
	const transValue = e.page * -100;
	cardStyleGuesses.value = `transform: translateX(${transValue}%)`;
};

async function getUserData(){
	const options = {
		method: "GET",
		headers: {
			"Authorization": token
		}
	}

	try{
		const response = await fetch(`${API_URL}/get-user-data`, options);
		const result = await response.json();

		if(!result.success){
			return errMsg.value = result.msg;
		}

		userData.value = result.data;
	}
	catch(err){
		return console.log(err);
	}

	//eval guesses results
	if(userData.value.guesses.length > 0) evalGuesses();
}

function evalGuesses(){
	userData.value.guesses.forEach(g => {
		g.rightAnswers = 0;

		for(let i = 0; i < g.guesses.length; i++){
			if(g.guesses[i] === g.addAnswers[i]){
				g.rightAnswers++;
			}
		}

		g.rightPercent = (100/g.guesses.length) * g.rightAnswers;
	});
}
</script>


<template>
	<ProgressSpinner v-if="isLoading" /> 

	<div v-if="errMsg" class="err-msg">{{errMsg}}</div>

	<div v-if="!errMsg && isResponseFromServer" class="statistics-container">

		<div class="quizzes">
			<h1>Created Quizzes</h1>
			
			<h3 v-if="userData.quizzes.length === 0">No quizzes have been created yet</h3>
			
			<div v-if="userData.quizzes.length > 0" class="card-container">
				<Card v-for="(quiz, index) in userData.quizzes" :style="cardStyleQuizzes">
					<template #title><p>Quiz Title: {{quiz.quizTitle}}</p></template>
					<template #content>
						<p>Question count: {{quiz.quiz.length}}</p>
						<Button label="delete" @click="deleteFromApi({quizId: quiz.quizId}, `${API_URL}/delete-quiz`, errMsg, getUserData)" />
					</template>
				</Card>
			</div>

			<Paginator :rows="1" :totalRecords="userData.quizzes.length" @page="changeSlideQuizzes"></Paginator>
		</div>
		
		<div class="answers">
			<h1>Answered Quizzes</h1>
		
			<h3 v-if="userData.answers.length === 0">No quizzes have been taken yet</h3>
		
			<div v-if="userData.answers.length > 0" class="card-container">
				<Card v-for="(answers, index) in userData.answers" :style="cardStyleAnswers">
					<template #title><p>Quiz Title: {{answers.quizTitle}}</p></template>
					<template #content>
						<p>Question count: {{answers.addAnswers.length}}</p>
						<p>Quiz Creator: {{answers.creatorName}}</p>
						<Button label="delete" @click="deleteFromApi({answersId: answers.answersId}, `${API_URL}/delete-answers`, errMsg, getUserData)" />
					</template>
				</Card>
			</div>

			<Paginator :rows="1" :totalRecords="userData.answers.length" @page="changeSlideAnswers"></Paginator>
		</div>
		
		<div class="guesses">
			<h1>Guessed Answeres</h1>
		
			<h3 v-if="userData.guesses.length === 0">No guesses have been made yet</h3>
		
			<div v-if="userData.guesses.length > 0" class="card-container">
				<Card v-for="(guess, index) in userData.guesses" :style="cardStyleGuesses">
					<template #title>
						<p>Quiz Title: {{guess.quizTitle}}</p>
						<p>You guessed {{guess.quizTaker}}'s answers.</p>
						<p>Total Answers: {{guess.guesses.length}}.</p>
						<p>Right guessed Answers: {{guess.rightAnswers}} ({{guess.rightPercent}}%).</p>
						<Button label="delete" @click="deleteFromApi({guessId: guess.guessId}, `${API_URL}/delete-guesses`, errMsg, getUserData)" />
					</template>
				</Card>
			</div>

			<Paginator :rows="1" :totalRecords="userData.guesses.length" @page="changeSlideGuesses"></Paginator>
		</div>

	</div>
</template>


<style scoped>
.statistics-container {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.quizzes, .answers, .guesses {
	width: 80%;
	min-width: 300px;
	max-width: 400px;
	display: flex;
	flex-direction: column;
	align-items: center;
	user-select: none;
	margin-top: 100px;
}

.card-container {
	width: 100%;
	min-width: 300px;
	display: flex;
	overflow: hidden;
	border: 1px solid var(--p-primary-900);
	border-radius: 8px;
}

.p-card {
	min-width: 100%;
	align-items: center;
	transition: transform 500ms;
}

:deep(.p-paginator) {
	margin-top: 20px;
}

h1 {
	text-align: center;
	color: var(--p-primary-500);
}

h3 {
	text-align: center;
}
</style>
