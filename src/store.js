import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Adam Jahr' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: false }
    ],
    event: {},
    events: [],
    eventsTotal: 0,
    count: 0
  },
  mutations: {
    INCREMENT_COUNT(state, value) {
      state.count += value
    },
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENT(state, event) {
      state.event = event
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTS_TOTAL(state, total) {
      state.eventsTotal = total
    }
  },
  actions: {
    //the context object ( here { state, commit } )is the first argument of any Action
    //payload is the second argument of all Actions
    updateCount({ state, commit }, incrementBy) {
      if (state.user) {
        commit('INCREMENT_COUNT', incrementBy) //commit from the Vuex context
      }
    },
    createEvent({ commit }, event) {
      //post event to our mock database (db.json)
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event.data)
      })
    },
    fetchEvent({ commit, getters }, id) {
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
            console.log('There was an error:', error.response)
          })
      }
    },
    // fetchEvents({ commit }) {
    //   EventService.getEvents()
    //     .then(response => {
    //       commit('SET_EVENTS', response.data)
    //     })
    //     .catch(error => {
    //       console.log('There was an error:', error.response)
    //     })
    // }
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(response => {
          //console.log('Total events are ' + response.headers['x-total-count'])
          commit('SET_EVENTS', response.data)
          commit('SET_EVENTS_TOTAL', response.headers['x-total-count']) //total number of events
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    }
  },
  getters: {
    catLength: state => {
      return state.categories.length
    },
    doneTodos: state => {
      return state.todos.filter(todo => todo.done) //gets an array of the todos that are labeled done
    },
    activeTodosCount: (state, getters) => {
      return state.todos.length - getters.doneTodos.length
    },
    // activeTodosCount: (state) => {
    //   return state.todos.filter(todo => !todo.done).length
    // }
    getEventById: state => id => {
      //retrieve some state based upon a parameter
      return state.events.find(event => event.id === id)
    }
  }
})
