<script setup>
import {ref, reactive, computed, inject} from "vue";
import {useRouter} from "vue-router";
import Card from "primevue/card";
import Paginator from "primevue/paginator";
import Textarea from "primevue/textarea";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
const API_URL = inject("API_URL");
const router = useRouter();
const quizData = reactive({
	quizTitle: "",
	questionCount: 4,
	questions: [],
});
const errMsg = ref("");
const cardStyle = ref("");
const isQuizInitialized = ref(false);

function initializeQuiz(){
	for(let i = 0; i < quizData.questionCount; i++){
		quizData.questions.push({
			question: "",
			answers: ["", "", "", ""],
		});
	}
}

function changeSlide(page){
	const position = page.page * -100
	cardStyle.value = `transform: translateX(${position}%)`;
}

function startCreatingQuiz(){
	initializeQuiz();
	if(quizData.quizTitle && quizData.questionCount) isQuizInitialized.value = true;
}

const isAllFieldsFilled = computed(() => {
	return quizData.questions.every(q => {
		if(!q.question) return false;
		
		const isNotEmptyString = q.answers.every(a => a !== "");
		if(!isNotEmptyString) return false;

		return true;
	});
});

async function addQuiz(){
	const token = localStorage.getItem("token");
	const data = {
		quizTitle: quizData.quizTitle,
		quiz: quizData.questions
	};
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": token
		},
		body: JSON.stringify(data)
	};

	try{
		const response = await fetch(`${API_URL}/add-quiz`, options);
		const result = await response.json();

		console.log(result);
		if(!result.success) return errMsg.value = result.msg;
	}
	catch(err){
		return console.log(err);
	}

	router.push("/");
}

function cancelQuizCreation(){
	router.push("/");
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
							<Textarea id="quiz-title" style="width: 80%;" v-model="quizData.quizTitle" />
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
						<div class="answer" v-for="(answer, index) of question.answers">
							<label for="answer-id">Answer {{index+1}}: </label>
							<InputText v-model="question.answers[index]" />
						</div>
					</div>
			
				</template>
				
				<template #footer>
					<div v-if="isAllFieldsFilled" class="footer-buttons">
						<Button label="add Quiz" @click="addQuiz" />
						<Button label="cancel" @click="cancelQuizCreation" />
					</div>
				</template>
			</Card>
		</div>

		<Paginator v-if="isQuizInitialized" :rows="1" :totalRecords="quizData.questionCount" @page="changeSlide" />
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
	flex-wrap: wrap;
}

.title-initialize label {
	min-width: 140px;
	flex: 1;
}

.title-initialize textarea {
	min-width: 200px;
	flex: 3;
}

.content-initialize {
	display: flex;
	gap: 2rem;
	flex-direction: column;
	align-items: center;
	flex-wrap: wrap;
	margin-top: 50px;
}

.question-container {
	display: flex;
	align-items: center;
	gap: 1rem;
	flex-wrap: wrap;
}

.question-count {
	width: 100%;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}

.question-count label {
	min-width: 140px;
	flex: 1;
}

.question-count span {
	min-width: 200px;
	flex: 3;
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

:deep(.p-inputnumber-input) {
	min-width: 0;
}

.p-textarea {
	resize: none;
}

.footer-buttons {
	width: 100%;
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
	margin-top: 1rem;
}

.footer-buttons :deep(.p-button) {
	flex-basis: 145px;
}
</style>
