import Vue from 'vue'
import Vuex from 'vuex'
//modules
import * as user from '@/store/modules/user.js' // * import all public items into user namespace
//import * as event from '@/store/modules/event.js' // import all public items into event namespace
import event from '@/store/modules/event.js'
import * as notification from '@/store/modules/notification.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    event,
    notification
  },
  state: {
    //user: { id: 'abc123', name: 'Adam Jahr' },
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
    count: 0
  },
  mutations: {
    INCREMENT_COUNT(state, value) {
      state.count += value
    }
  },
  actions: {
    //the context object ( here { state, commit } )is the first argument of any Action
    //payload is the second argument of all Actions
    updateCount({ state, commit }, incrementBy) {
      if (state.user) {
        commit('INCREMENT_COUNT', incrementBy) //commit from the Vuex context
      }
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
    }
    // activeTodosCount: (state) => {
    //   return state.todos.filter(todo => !todo.done).length
    // }
  }
})
