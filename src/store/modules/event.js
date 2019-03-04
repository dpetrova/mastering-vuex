import EventService from '@/services/EventService.js'

//export const namespaced = true

// export const state = {
//   events: [],
//   eventsTotal: 0,
//   event: {}
// }

// export const mutations = {
//   ADD_EVENT(state, event) {
//     state.events.push(event)
//   },
//   SET_EVENTS(state, events) {
//     state.events = events
//   },
//   SET_EVENTS_TOTAL(state, eventsTotal) {
//     state.eventsTotal = eventsTotal
//   },
//   SET_EVENT(state, event) {
//     state.event = event
//   }
// }

// export const actions = {
//   createEvent({ commit }, event) {
//     //post event to our mock database (db.json)
//     return EventService.postEvent(event).then(() => {
//       commit('ADD_EVENT', event.data)
//     })
//   },
//   fetchEvent({ commit, getters }, id) {
//     var event = getters.getEventById(id) // See if we already have this event
//     if (event) {
//       // If we do, set the event
//       commit('SET_EVENT', event)
//     } else {
//       // If not, get it with the API.
//       EventService.getEvent(id)
//         .then(response => {
//           commit('SET_EVENT', response.data)
//         })
//         .catch(error => {
//           console.log('There was an error:', error.response)
//         })
//     }
//   },
//   fetchEvents({ commit }, { perPage, page }) {
//     EventService.getEvents(perPage, page)
//       .then(response => {
//         //console.log('Total events are ' + response.headers['x-total-count'])
//         commit('SET_EVENTS', response.data)
//         commit('SET_EVENTS_TOTAL', response.headers['x-total-count']) //total number of events
//       })
//       .catch(error => {
//         console.log('There was an error:', error.response)
//       })
//   }
// }

// export const getters = {
//   getEventById: state => id => {
//     //retrieve some state based upon a parameter
//     return state.events.find(event => event.id === id)
//   }
// }

export default {
  namespaced: true, //namespace your module (to avoid naming collisions)
  state: {
    events: [],
    eventsTotal: 0,
    event: {}
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    createEvent({ commit, rootState, dispatch }, event) {
      //while state object here is only our local module’s state
      //rootState gives access to the root of the Vuex state
      console.log('User creating Event is ' + rootState.user.user.name)

      //accessing another module’s action
      //if the module is not namespaced:
      //actions, mutations and getters are all registered under the global namespace
      //this means that no matter where they’re declared, they’re called without their module name
      //dispatch('someAction')

      //but if the module they're declared is namespaced, they should use its namespace
      //second parameter is payload (null here)
      //third parameter say that look for this action in the root of our store
      //dispatch('moduleName/someAction', null, {root: true})

      //this.$store.getters.filteredList

      //post event to our mock database (db.json)
      return EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event.data)
          const notification = {
            type: 'success',
            message: 'Your event has been created!'
          }
          dispatch('notification/add', notification, { root: true })
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There was a problem creating your event: ' + error.message
          }
          dispatch('notification/add', notification, { root: true })
          throw error
        })
    },
    fetchEvent({ commit, getters, dispatch }, id) {
      var event = getters.getEventById(id) // See if we already have this event
      if (event) {
        // If we do, set the event
        commit('SET_EVENT', event)
      } else {
        // If not, get it with the API.
        EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            //console.log('There was an error:', error.response)
            const notification = {
              type: 'error',
              message: 'There was a problem fetching an event: ' + error.message
            }
            dispatch('notification/add', notification, {
              root: true
            })
          })
      }
    },
    fetchEvents({ commit, dispatch }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(response => {
          //console.log('Total events are ' + response.headers['x-total-count'])
          commit('SET_EVENTS', response.data)
          commit('SET_EVENTS_TOTAL', response.headers['x-total-count']) //total number of events
        })
        .catch(error => {
          //console.log('There was an error:', error.response)
          const notification = {
            type: 'error',
            message: 'There was a problem fetching events: ' + error.message
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  },
  getters: {
    getEventById: state => id => {
      //retrieve some state based upon a parameter
      return state.events.find(event => event.id === id)
    }
  }
}
