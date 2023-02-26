import { createStore } from 'vuex'
import axios from 'axios'
import { timeInterval } from '../assets/js/utils'
const headers = {
  Authorization:
    'Bearer 16e2f0694a311151c01aa0a131b94a5a3ad7f110e12c2d8f459fcbb158214f5f',
}
export default createStore({
  state: {
    workEntries: [],
    employeeId: 'b99a6cd9-3a3d-4635-9eea-e089c90ac45a',
    workEntryIn: null,
    lastTimeWorked: '00:00:00',
  },
  getters: {
    lastEntry(state) {
      const array = state.workEntries.data
      return array ? state.workEntries.data.slice(-1)[0] : null
    },
  },
  mutations: {
    SET_WORK_ENTRIES(state, newWorkEntries) {
      state.workEntries = newWorkEntries
    },
    SET_WORK_ENTRY_IN(state, newWorkEntryIn) {
      state.workEntryIn = newWorkEntryIn
    },
    SET_LAST_TIME_WORKED(state, newLastTimeWorked) {
      state.lastTimeWorked = newLastTimeWorked
    },
  },
  actions: {
    async fetchWorkEntries(context) {
      try {
        const response = await axios.get(
          'https://api-test.sesametime.com/schedule/v1/work-entries',
          {
            headers: headers,
          }
        )
        context.commit('SET_WORK_ENTRIES', response.data)
      } catch (error) {
        console.log('error', error)
      }
    },
    async setWorkEntryIn(context) {
      context.commit('SET_WORK_ENTRY_IN', null)
      const data = {
        employeeId: context.state.employeeId,
        workEntryIn: {
          date: new Date().getTime(),
          coordinates: {
            latitude: null,
            longitude: null,
          },
        },
      }
      try {
        const response = await axios.post(
          'https://api-test.sesametime.com/schedule/v1/work-entries/clock-in',
          data,
          { headers: headers }
        )

        context.commit('SET_WORK_ENTRY_IN', response.data.data.workEntryIn.date)
      } catch (error) {
        console.log('error', error)
      }
    },
    async setWorkEntryOut(context) {
      const data = {
        employeeId: context.state.employeeId,
        workEntryOut: {
          date: new Date().getTime(),
          coordinates: {
            latitude: null,
            longitude: null,
          },
        },
      }
      try {
        await axios.post(
          'https://api-test.sesametime.com/schedule/v1/work-entries/clock-out',
          data,
          { headers: headers }
        )

        context.commit(
          'SET_LAST_TIME_WORKED',
          timeInterval(context.state.workEntryIn)
        )
      } catch (error) {
        console.log('error', error)
      }
    },
  },
  modules: {},
})
