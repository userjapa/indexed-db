import Vue from 'vue'

export default {
  addItem (state, item) {
    state.list.push(item)
  },
  setItem (state, item) {
    state.item = item
  },
  setToUpdate (state, item) {
    state.toUpdate = item
  },
  update (state, item) {
    const uid = state.toUpdate
    Vue.set(state.list, uid, item)
  },
  remove (state, uid) {
    Vue.delete(state.list, uid)
  }
}
