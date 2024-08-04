<script setup>
import {ref, onMounted, inject, watch} from "vue";
import Card from "primevue/card";
import Paginator from "primevue/paginator";
import ProgressSpinner from "./ProgressSpinner.vue";
import InputText from "primevue/inputtext";
const API_URL = inject("API_URL");
const errMsg = ref("");
const quizzes = ref(null);
const currQuizzes = ref([]);
const currViewPort = ref("");
const totalPages = ref(0);
const emit = defineEmits(["startQuiz"]);
const searchInput = ref("");
const showPaginator = ref(true);
const isReceivingData = ref(false);
let token = null;

onMounted(async () => {
	isReceivingData.value = true;

	window.addEventListener("resize", setCurrViewPort);

	token = localStorage.getItem("token");
	const options = {
		method: "GET",
		headers: {
			"Authorization": token
		}
	};

	try{
		const response = await fetch(`${API_URL}/get-all-quizzes`, options);
		const result = await response.json();

		isReceivingData.value = false;

		if(!result.success) return errMsg.value = result.msg;

		quizzes.value = result.data;
	}
	catch(err){
		isReceivingData.value = false;
		return console.log(err);
	}

	setCurrViewPort();
	console.log(quizzes.value)
})

function setCurrViewPort(){
	if(window.innerWidth < 650) currViewPort.value = "sd";
	else if(window.innerWidth > 650 && window.innerWidth < 960) currViewPort.value = "md";
	else currViewPort.value = "ld";

	getNextQuizzes(currViewPort.value, 0);
}

function getNextQuizzes(viewPort, page){
	let elementCount = 0;

	if(viewPort === "ld") elementCount = 6;
	if(viewPort === "md") elementCount = 4;
	if(viewPort === "sd") elementCount = 2;

	currQuizzes.value = [];

	const endIndex = (page+1) * elementCount;

	for(let i = page * elementCount; i < endIndex; i++){
		currQuizzes.value.push(quizzes.value[i]);
		
		if(!quizzes.value[i+1]) break;
	}

	totalPages.value = quizzes.value.length / elementCount;
}

function switchPage(p){
	getNextQuizzes(currViewPort.value, p.page);
}

function startQuiz(id){
	emit("startQuiz", id);
}

// search engine
watch(searchInput, (newValue) => {
	if(newValue < 1){
		showPaginator.value = true;
		return setCurrViewPort();
	}
	const foundQuizzes = quizzes.value.filter(q => {
		if(q.creatorName.includes(newValue)) return q;
	});

	if(foundQuizzes.length > 0){
		currQuizzes.value = [];
		showPaginator.value = false;
		return currQuizzes.value = foundQuizzes;
	}

	setCurrViewPort();
})
</script>


<template>
	<div class="container">

		<ProgressSpinner v-if="isReceivingData" />

		<div class="search-container">
			<label for="search-input">Find quiz by quiz creator name: </label>
			<InputText id="search-input" v-model="searchInput" />
		</div>

		<div class="card-container">
			<Card v-for="(quiz, index) in currQuizzes">
				<template #title>
					<div class="card-title">
						<div class="quiz-title">
							<span>Quiz Title: </span>
							<span>{{quiz.quizTitle}}</span>
						</div>
					</div>
				</template>

				<template #content>
					<div class="card-content">
						<div class="quiz-creator">
							<span>Quiz Creator: </span>
							<span>{{quiz.creatorName}}</span>
						</div>
						<div class="question-count">
							<span>Questions: </span>
							<span>{{quiz.quiz.length}}</span>
						</div>
					</div>
				</template>

				<template #footer>
					<Button label="Start Quizt" style="width: 100%; max-width: 300px; margin-top: 10%;" @click="startQuiz(quiz.quizId)" />
				</template>
			</Card>
		</div>

		<Paginator v-if="showPaginator" :rows="1" :totalRecords="totalPages" @page="switchPage" /> 
	</div>
</template>


<style scoped>
.container {
	width: 100%;
	min-height: 1000px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 1rem;
}

.search-container {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	flex-wrap: wrap;
	font-size: 1.4rem;
	margin-top: 5dvh;
}

.card-container {
	width: 100%;
	max-width: 1200px;
	display: grid;
	place-items: center;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: auto-fit auto-fit;
	gap: 1rem;
	margin-top: 5dvh;
}

.p-card {
	width: 90%;
	max-width: 600px;
	border: 1px solid var(--p-primary-900);
}

.card-title {
	display: flex;
	color: var(--p-primary-400);
	font-size: 1.4rem;
}

.quiz-title {
	width: 100%;
	display: flex;
}

.quiz-title :first-child {
	flex: 1;
}

.quiz-title :last-child {
	flex: 2;
}

.card-content {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	font-size: 1.2rem;
	margin-top: 10%;
}

.card-content * {
	width: 100%;
	display: flex;
}

.card-content * :first-child {
	flex: 1;
}

.card-content * :last-child {
	flex: 2;
}

:deep(.p-paginator) {
	width: 90%;
	margin-top: 50px;
	border: 1px solid var(--p-primary-900);
}

nav {
	width: 100%;
	max-width: 800px;
	display: flex;
	justify-content: center;
}

:deep(.p-card-footer) {
	display: flex;
	justify-content: center;
}

@media(max-width: 960px) {
	.card-container {
		grid-template-columns: 1fr 1fr;
	}
}

@media(max-width: 650px) {
	.card-container {
		grid-template-columns: 1fr;
	}
}
</style>
