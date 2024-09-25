import {ref, reactive} from "vue";

const store = {
	user: {
		isSignedIn: false,
		name: "",
	}
};

export default store;
