<script setup>
import {ref, inject} from "vue";
import Card from "primevue/card";
import SelectQuiz from "../components/SelectQuiz.vue";
const isQuizSelecting = ref(true);
const quiz = ref(null);
const API_URL = inject("API_URL");
const errMsg = ref("");
const isDataReceived = ref(false);

async function startQuiz(id){
	isQuizSelecting.value = false;
	
	quiz.value = await getQuiz(id)

	isDataReceived.value = true;
	console.log(quiz.value);
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
</script>


<template>
	<SelectQuiz v-if="isQuizSelecting" @startQuiz="startQuiz" />

	<div v-if="errMsg" class="err-msg">{{errMsg}}</div>

	<div v-if="!isQuizSelecting && isDataReceived" class="container">
		<div class="slide-container">
			<Card v-for="(question, index) in quiz.quiz">
				<template #title>
					<div class="card-title">
						{{question.question}}
					</div>
				</template>
			</Card>
		</div>
	</div>
</template>


<style scoped>
</style>
