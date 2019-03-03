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
    events: [
      { id: 1, organizer: 'Adam', title: 'Cat Cabaret' },
      { id: 2, organizer: 'Adam', title: 'Kitty Cluster' },
      { id: 3, organizer: 'Adam', title: 'Puppy Parade' }
    ],
    count: 0
  },
  mutations: {
    INCREMENT_COUNT(state, value) {
      state.count += value
    },
    ADD_EVENT(state, event) {
      state.events.push(event)
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
