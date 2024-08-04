<script setup>
import {ref, inject} from "vue";
import {useRouter} from "vue-router";
import Card from "primevue/card";
import SelectQuiz from "../components/SelectQuiz.vue";
import ProgressSpinner from "../components/ProgressSpinner.vue";
const router = useRouter();
const isQuizSelecting = ref(true);
const quiz = ref(null);
const API_URL = inject("API_URL");
const isDataReceived = ref(false);
const isSendingData = ref(false);
const errMsg = ref("");
let currSlide = 0;
let slideCount = 1;
let cardContentStyle = "";
let answers = [];

async function startQuiz(id){
	isQuizSelecting.value = false;
	
	quiz.value = await getQuiz(id)

	isDataReceived.value = true;
}

async function getQuiz(id){
	const data = {quizIds: [id]};
	const token = localStorage.getItem("token");
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

		return result.data[0];
	}
	catch(err){
		return console.log(err);
	}
}

function makeAnswer(index){
	answers.push(index);

	if(slideCount >= quiz.value.quiz.length) sendAnswers(answers);

	currSlide++;

	const pos = -100 * currSlide;
	cardContentStyle = `transform: translateX(${pos}%)`;

	slideCount++;
}

async function sendAnswers(answers){
	isSendingData.value = true;

	const data = {
		quizId: quiz.value.quizId,
		answers: answers
	};
	const token = localStorage.getItem("token");
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": token
		},
		body: JSON.stringify(data)
	}

	try{
		const response = await fetch(`${API_URL}/add-answers`, options);
		const result = await response.json();

		isSendingData.value = false;

		if(!result.success) return errMsg.value = result.msg;
	}
	catch(err){
		isSendingData.value = false;
		console.log(err)
	}

	router.push("/");
}
</script>


<template>
	<SelectQuiz v-if="isQuizSelecting" @startQuiz="startQuiz" />

	<div v-if="errMsg" class="err-msg">{{errMsg}}</div>

	<div v-if="!isQuizSelecting && isDataReceived" class="container">

		<ProgressSpinner v-if="isSendingData" /> 

		<div class="slide-container">
			<Card v-for="(question, index) in quiz.quiz" :style="cardContentStyle">
				<template #title>
					<div class="card-title">
						<span>Question {{index+1}}: </span>
						<p>
							{{question.question}}
						</p>
					</div>
				</template>

				<template #content>
					<div class="card-content">
						<a href="#" v-for="(answer, index) in question.answers" @click="makeAnswer(index)">
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

.slide-container {
	width: 80%;
	min-width: 300px;
	max-width: 800px;
	display: flex;
	margin-top: 1rem;
	overflow: hidden;
}

.p-card {
	min-width: 100%;
}

.card-title {
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 1rem 0;
}

.card-title :first-child {
	color: var(--p-primary-400);
}

.card-title :last-child {
	font-size: 1.2rem;
}

.card-content {
	width: 100%;
	min-height: 500px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 1rem;
}

a {
	min-width: 280px;
	max-width: 400px;
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
