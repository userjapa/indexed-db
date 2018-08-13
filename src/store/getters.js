import _ from 'lodash'

export default {
  getTodos ({ todos }) {
    const copy = _.cloneDeep(todos)
    return copy.sort((c, p) => {
      if (c.text < p.text) return -1
      else if (c.text > p.text) return 1
      else return 0
    })
  },
  getTodo ({ todo }) {
    if (!todo) return {}
    else return _.cloneDeep(todo)
  },
  hasTodo ({ todo }) {
    if (!todo) return false
    else return true
  }
}
