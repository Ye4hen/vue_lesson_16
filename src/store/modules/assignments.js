import DbOperations from '../helpers/DbOperations'
const collectionDB = new DbOperations('assignments')
export default {
	namespaced: true,
	state: () => ({
		assignmentsList: [],

		loading: false,
		error: null,
	}),
	getters: {
		isLoading: (state) => state.loading,
		hasError: (state) => state.error,

		getAssignmentsList: (state) => state.assignmentsList,
		getAssignmentById: (state) => (assignmentId) => state.assignmentsList.find((item) => item.id == assignmentId),
		getFilledAssignmentsList: (state, getters, rootState, rootGetters) => {
			const filteredAssignments = state.assignmentsList.filter((assignment) => {
				const bus = rootGetters['buses/getBusById'](assignment.busId);
				const driver = rootGetters['drivers/getDriverById'](assignment.driverId);

				const busNumber = bus ? bus.number : null;
				const driverName = driver ? driver.name : null;

				return busNumber && driverName;
			});

			return filteredAssignments.map((assignment) => {
				const bus = rootGetters['buses/getBusById'](assignment.busId);
				const driver = rootGetters['drivers/getDriverById'](assignment.driverId);

				const busNumber = bus ? bus.number : 'Unknown';
				const driverName = driver ? driver.name : 'Unknown';

				return {
					id: assignment.id,
					busNumber: busNumber,
					driverName: driverName,
				};
			});
		},

	},
	mutations: {
		setAssignmentsList(state, assignmentsList) {
			state.assignmentsList = assignmentsList
		},
		deleteAssignment(state, assignmentId) {
			state.assignmentsList = state.assignmentsList.filter((item) => item.id !== assignmentId)
		},

		setLoading(state, value) {
			state.loading = value
		},
		setError(state, error) {
			state.error = error
		},
	},
	actions: {
		loadAssignmentsList({ commit }) {
			commit('setError', null)
			commit('setLoading', true)

			collectionDB
				.loadItemsList()
				.then((list) => {
					commit('setAssignmentsList', list)
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},
		addAssignment({ commit, dispatch }, item) {
			commit('setError', null)
			commit('setLoading', true)
			collectionDB
				.addItem(item)
				.then(() => {
					dispatch('loadAssignmentsList')
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},
		deleteAssignment({ commit }, itemId) {
			commit('setError', null)
			commit('setLoading', true)

			collectionDB
				.deleteItem(itemId)
				.then(() => {
					commit('deleteAssignment', itemId)
					// dispatch('loadAssignmentsList')
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},
		updateAssignment({ commit, dispatch }, { itemId, data }) {
			commit('setError', null)
			commit('setLoading', true)

			collectionDB
				.updateItem(itemId, data)
				.then(() => {
					dispatch('loadAssignmentsList')
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},
	},
}
