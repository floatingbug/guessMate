import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignInView from "../views/SignInView.vue";
import SignUpView from "../views/SignUpView.vue";
import TestView from "../views/TestView.vue";
import CreateQuizView from "../views/CreateQuizView.vue";
import GuessAnswersView from "../views/GuessAnswersView.vue";
import TakeQuizView from "../views/TakeQuizView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: "/sign-in",
			name: "signIn",
			component: SignInView
		},
		{
			path: "/sign-up",
			name: "signUp",
			component: SignUpView
		},
	  	{
			path: "/test",
			name: "test",
			component: TestView
		},
	  {
		  path: "/create-quiz",
		  name: "createQuiz",
		  component: CreateQuizView
	  },
	  {
		  path: "/guess-answers",
		  name: "guessAnswers",
		  component: GuessAnswersView
	  },
	  {
		  path: "/take-quiz",
		  name: "takeQuiz",
		  component: TakeQuizView
	  }

	]
})

export default router
