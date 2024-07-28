<script setup>
import {ref, reactive} from "vue";
import Card from "primevue/card";
import Paginator from "primevue/paginator";
import Textarea from "primevue/textarea";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
const quizData = reactive({
	quizTitle: "",
	questionCount: 4,
	questions: [],
});
const cardStyle = ref("");
const isQuizInitialized = ref(false);

function initializeQuiz(){
	for(let i = 0; i < quizData.questionCount; i++){
		quizData.questions.push({
			question: "",
			answers: [],
		});
	}
}

function changeSlide(page){
	const position = page.page * -100
	cardStyle.value = `transform: translateX(${position}%)`;
}

function startCreatingQuiz(){
	initializeQuiz();
	if(quizData.question && quizData.questionCount) isQuizInitialized.value = true;
}
</script>


<template>
	<div class="container">
		<div class="slide-container">
			<div v-if="!isQuizInitialized" class="initialize-quiz">
				<Card>
					<template #title>
						<div class="title-initialize">
							<label for="quiz-title">Quiz Title: </label>
							<Textarea id="quiz-title" style="width: 80%;" v-model="quizData.question" />
						</div>
					</template>
					
					<template #content>
						<div class="content-initialize">
							<div class="question-count">
								<label for="question-count">Question Count: </label>
								<InputNumber id="question-count" :min="4" :max="24" v-model="quizData.questionCount" />
							</div>
							<Button label="Start Creation" style="width: 50%; margin-top: 30%;" @click="startCreatingQuiz" />
						</div>
					</template>
				</Card>
			</div>

			<Card v-if="isQuizInitialized" v-for="(question, index) in quizData.questions" :style="cardStyle">
				<template #title>
					<div class="question-container">
						<label for="title">Question {{index+1}}: </label>
						<Textarea v-model="question.question" />
					</div>
				</template>

				<template #content>
					<div class="content-container">
						<div class="answer" v-for="(answer, index) of 4">
							<label for="answer-id">Answer {{index+1}}: </label>
							<InputText />
						</div>
					</div>
				</template>
			</Card>
		</div>

		<Paginator :rows="1" :totalRecords="quizData.questionCount" @page="changeSlide" />
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
	width: 90%;
	min-width: 300px;
	max-width: 600px;
	min-height: 400px;
	display: flex;
	margin-top: 50px;
	overflow: hidden;
}

.p-card {
	min-width: 100%;
	min-height: 100%;
	border: 1px solid var(--p-primary-900);
	transition: transform 500ms;
}

.initialize-quiz {
	width: 100%;
}

.title-initialize {
	display: flex;
	align-items: center;
}

.title-initialize>label {
	flex-basis: 125px;
}

.content-initialize {
	display: flex;
	gap: 2rem;
	flex-direction: column;
	align-items: center;
	margin-top: 50px;
}

.question-container {
	display: flex;
	align-items: center;
	gap: 1rem;
	flex-wrap: wrap;
}

.question-container label {
	flex: 1;
	flex-basis: 120px;
}

.question-container .p-textarea {
	flex: 8;
	flex-basis: 300px;
}

.content-container {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-top: 50px;
}

.answer {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}

.answer label {
	flex: 1;
	flex-basis: 100px;
}

.answer .p-inputtext {
	flex: 8;
}

:deep(.p-paginator) {
	margin-top: 50px;
}

.p-textarea {
	resize: none;
}
</style>
