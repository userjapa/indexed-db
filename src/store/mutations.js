import Vue from 'vue'

export default {
  setTodos (state, todos) {
    Vue.set(state, 'todos', todos)
  },
  setTodo (state, todo) {
    state.todo = todo
  },
  addTodo (state, todo) {
    state.todos.push(todo)
  },
  editTodo (state, todo) {
    const index = state.todos.findIndex(x => x._key === todo._key)
    Vue.set(state.todos, index, todo)
  },
  removeTodo (state, key) {
    const index = state.todos.findIndex(x => x._key === key)
    Vue.delete(state.todos, index)
  }
}
