import DbOperations from '../helpers/DbOperations'
import { isCorrespondToFilter } from '../helpers/helpers'
const collectionDB = new DbOperations('drivers')
export default {
	namespaced: true,
	state: () => ({
		driversList: [],
		filterObj: {},
		loading: false,
		error: null,
		errorMessage: null,
	}),
	getters: {
		isLoading: (state) => state.loading,
		hasError: (state) => state.error,

		errorMessage: ({ errorMessage }) => errorMessage,
		getDriversList: (state) => state.driversList,
		getDriverById: (state) => (driverId) => state.driversList.find((item) => item.id == driverId),
		getFilteredDriversList: (state) => {
			const filteredDriversList = state.driversList.filter((driver) => isCorrespondToFilter(driver, state.filterObj))

			if (!filteredDriversList.length) {
				state.errorMessage = "🤔Водії відсутні"
			}
			else state.errorMessage = null

			return filteredDriversList
		},
	},
	mutations: {
		setDriversList(state, driversList) {
			state.driversList = driversList
		},
		deleteDriver(state, driverId) {
			state.driversList = state.driversList.filter((item) => item.id !== driverId);
		},
		setFilter(state, filterDataObj) {
			state.filterObj = filterDataObj
		},
		setLoading(state, value) {
			state.loading = value
		},
		setError(state, error) {
			state.error = error
		},
	},
	actions: {
		loadDriversList({ commit }) {
			commit('setError', null)
			commit('setLoading', true)

			collectionDB
				.loadItemsList()
				.then((list) => {
					commit('setDriversList', list)
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},
		addDriver({ commit, dispatch }, item) {
			commit('setError', null)
			commit('setLoading', true)
			collectionDB
				.addItem(item)
				.then(() => {
					dispatch('loadDriversList')
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},
		deleteDriver({ commit, dispatch }, itemId) {
			commit('setError', null)
			commit('setLoading', true)

			collectionDB
				.deleteItem(itemId)
				.then(() => {
					dispatch('loadDriversList').then(() => {
						commit('deleteDriver', itemId);
					});
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},
		updateDriver({ commit, dispatch }, { itemId, data }) {
			commit('setError', null)
			commit('setLoading', true)

			collectionDB
				.updateItem(itemId, data)
				.then(() => {
					dispatch('loadDriversList')
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},
		loadFilteredDriversData({ commit }, { fieldTitle, compareOperator, valueToCompare }) {
			commit('setError', null)
			commit('setLoading', true)
			collectionDB
				.loadFilteredData(fieldTitle, compareOperator, valueToCompare)
				.then((list) => {
					commit('setDriversList', list)
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},
		updateFilter({ commit }, filterDataObj) {
			commit("setFilter", filterDataObj)
		},
	},
}
