import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Primevue from "primevue/config";
import Aura from "@primevue/themes/aura";
import Button from "primevue/button";
import Card from "primevue/card";

const app = createApp(App);

app.use(router);
app.use(Primevue, {
	theme: {
		preset: Aura,
		options: {
			darkModeSelector: ".dark",
		},
	},
});

app.component("Button", Button);
app.component("Card", Card);

app.provide("API_URL", "http://localhost:3000");

app.mount("#app");
