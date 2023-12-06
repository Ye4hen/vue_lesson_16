import { createStore } from "vuex";
import drivers from './modules/drivers'
import buses from "./modules/buses";
import assignments from "./modules/assignments";

export default createStore({
	state: {
		errorMessage: null,
	},
	getters: {
		errorMessage: ({ errorMessage }) => errorMessage,
	},
	mutations: {
		setErrorMessage(state, message) {
			state.errorMessage = message
		},
	},
	actions: {
		setErrorMessage({ commit }, message) {
			commit("setErrorMessage", message)
		},
	},
	modules: {
		drivers,
		buses,
		assignments,
	},
});
