import DbOperations from '../helpers/DbOperations'
const collectionDB = new DbOperations('buses')
export default {
	namespaced: true,
	state: () => ({
		busesList: [],

		loading: false,
		error: null,
	}),
	getters: {
		isLoading: (state) => state.loading,
		hasError: (state) => state.error,

		getBusesList: (state) => state.busesList,
		getBusById: (state) => (busId) => state.busesList.find((item) => item.id == busId),
	},
	mutations: {
		setBusesList(state, busesList) {
			state.busesList = busesList
		},
		deleteBus(state, busId) {
			state.busesList = state.busesList.filter((item) => item.id !== busId)
		},

		setLoading(state, value) {
			state.loading = value
		},
		setError(state, error) {
			state.error = error
		},
	},
	actions: {
		loadBusesList({ commit }) {
			commit('setError', null)
			commit('setLoading', true)

			collectionDB
				.loadItemsList()
				.then((list) => {
					commit('setBusesList', list)
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},
		addBus({ commit, dispatch }, item) {
			commit('setError', null)
			commit('setLoading', true)
			collectionDB
				.addItem(item)
				.then(() => {
					dispatch('loadBusesList')
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},
		deleteBus({ commit, dispatch }, itemId) {
			commit('setError', null)
			commit('setLoading', true)

			collectionDB
				.deleteItem(itemId)
				.then(() => {
					dispatch('loadBusesList').then(() => {
						commit('deleteBus', itemId);
					});
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},
		updateBus({ commit, dispatch }, { itemId, data }) {
			commit('setError', null)
			commit('setLoading', true)

			collectionDB
				.updateItem(itemId, data)
				.then(() => {
					dispatch('loadBusesList')
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
