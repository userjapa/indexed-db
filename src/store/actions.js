import _ from 'lodash'
import Vue from 'vue'
import uuid from 'uuid/v4'
import { add, getAll, edit, remove } from './indexedDB'

export default {
  getAll ({ commit }) {
    getAll()
      .then(ev => {
        commit('setTodos', ev.target.result)
        console.log('GetAll Successful')
      })
      .catch(error => {
        console.warn(error)
        console.log('GetAll Failed')
      })
  },
  add ({ commit }, todo) {
    let copy = _.cloneDeep(todo)
    Vue.set(copy, '_key', uuid())
    add(copy)
      .then(ev => {
        commit('addTodo', copy)
        console.log('Add Successful')
      })
      .catch(error => {
        console.warn(error)
        console.log('Add Failed')
      })
  },
  edit ({ commit }, todo) {
    console.log(todo)
    edit(todo)
      .then(ev => {
        commit('editTodo', todo)
        console.log('Edit Successful')
      })
      .catch(error => {
        console.warn(error)
        console.log('Edit Failed')
      })
  },
  remove ({ commit }, key) {
    remove(key)
      .then(ev => {
        commit('removeTodo', key)
        console.log('Delete Successful')
      })
      .catch(error => {
        console.warn(error)
        console.log('Delete Failed')
      })
  }
}
