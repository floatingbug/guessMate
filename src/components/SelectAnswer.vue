<script setup>
import {ref, onMounted, inject, watch} from "vue";
import Card from "primevue/card";
import Paginator from "primevue/paginator";
import InputText from "primevue/inputtext";
import ProgressSpinner from "./ProgressSpinner.vue";
const API_URL = inject("API_URL");
const errMsg = ref("");
const answers = ref(null);
const currAnswers = ref([]);
const currViewPort = ref("");
const totalPages = ref(0);
const emit = defineEmits(["startGuess"]);
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
		const response = await fetch(`${API_URL}/get-all-answers`, options);
		const result = await response.json();

		isReceivingData.value = false;
		
		if(!result.success) return errMsg.value = result.msg;

		answers.value = result.data;
	}
	catch(err){
		isReceivingData.value = false;
		return console.log(err);
	}

	setCurrViewPort();
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

	currAnswers.value = [];

	const endIndex = (page+1) * elementCount;

	for(let i = page * elementCount; i < endIndex; i++){
		currAnswers.value.push(answers.value[i]);
		
		if(!answers.value[i+1]) break;
	}

	totalPages.value = answers.value.length / elementCount;
}

function switchPage(p){
	getNextQuizzes(currViewPort.value, p.page);
}

function startGuess(answer){
	emit("startGuess", {answersId: answer.answersId, quizId: answer.quizId});
}

// search engine
watch(searchInput, (newValue) => {
	if(newValue < 1){
		showPaginator.value = true;
		return setCurrViewPort();
	}
	const foundQuizzes = answers.value.filter(q => {
		if(q.creatorName.includes(newValue)) return q;
	});

	if(foundQuizzes.length > 0){
		currAnswers.value = [];
		showPaginator.value = false;
		return currAnswers.value = foundQuizzes;
	}

	setCurrViewPort();
})
</script>


<template>
	<div class="container">

		<ProgressSpinner v-if="isReceivingData" />

		<div class="search-container">
			<label for="search-input">Find answer by quiz taker name: </label>
			<InputText id="search-input" v-model="searchInput" />
		</div>

		<div class="card-container">
			<Card v-for="(answer, index) in currAnswers">
				<template #title>
					<div class="card-title">
						<div class="content-data">
							<span>Quiz Title: </span>
							<span>{{answer.quizTitle}}</span>
						</div>
					</div>
				</template>

				<template #content>
					<div class="card-content">
						<div class="content-data">
							<span>Quiz Taker: </span>
							<span>{{answer.quizTaker}}</span>
						</div>

						<div class="content-data">
							<span>Quiz Creator: </span>
							<span>{{answer.creatorName}}</span>
						</div>

						<div class="content-data">
							<span>Questions: </span>
							<span>{{answer.addAnswers.length}}</span>
						</div>
					</div>
				</template>

				<template #footer>
					<Button label="Start Guess Answers" style="width: 100%; max-width: 300px; margin-top: 10%;" @click="startGuess(answer)" />
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
	padding: 1rem;
}

.card-title {
	display: flex;
	color: var(--p-primary-400);
	font-size: 1.4rem;
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

.content-data :first-child {
	flex: 1;
}

.content-data :last-child {
	flex: 1;
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
