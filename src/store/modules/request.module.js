import axios from "@/axios/request.js"
import store from '../index'

export default {
    namespaced: true,
    state() {
        return {
            requests: []
        }
    },
    getters: {
        requests(state) {
            return state.requests
        }
    },
    mutations: {
        setRequests(state, requests) {
            state.requests = requests
        },
        addRequest(state, request) {
            state.requests.push(request)
        },
        removeRequest(state, id) {
            state.requests.filter((request) => request.id != id)
        }
    },
    actions: {
        async create({ commit, dispatch }, payload) {
            try {
                const token = store.getters['auth/token']
                const { data } = await axios.post(`/requests.json?auth=${token}`, payload)
                commit('addRequest', { ...payload, id: data.name })
                dispatch('setMessage', {
                    value: 'Заявка успешно создана',
                    type: 'primary'
                }, { root: true })
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, { root: true })
            }
        },
        async load({ commit, dispatch }) {
            try {
                const token = store.getters['auth/token']
                const { data } = await axios.get(`/requests.json?auth=${token}`)
                if (data == null) {
                    const requests = []
                    commit('setRequests', requests)
                } else {
                    const requests = Object.keys(data).map((key) => {
                        return { id: key, ...data[key] }
                    })
                    commit('setRequests', requests)
                }
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, { root: true })
            }
        },
        async loadOne({ dispatch }, id) {
            try {
                const token = store.getters['auth/token']
                const { data } = await axios.get(`/requests/${id}.json?auth=${token}`)
                return data
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, { root: true })
            }
        },
        async remove({ commit }, id) {
            try {
                const token = store.getters['auth/token']
                await axios.delete(`/requests/${id}.json?auth=${token}`)
                commit('removeRequest', id)
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, { root: true })
            }
        },
        async update({ commit, dispatch }, request) {
            try {
                const token = store.getters['auth/token']
                await axios.put(`/requests/${request.id}.json?auth=${token}`, request)
                dispatch('setMessage', {
                    value: 'Заявка успешно обновлена',
                    type: 'primary'
                }, { root: true })
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, { root: true })
            }
        }
    }
}