import _ from 'lodash'

export default {
  getList ({ list }) {
    const copy = _.cloneDeep(list)
    return copy
  },
  getItem ({ item }) {
    if (!item) return {}
    else return item
  },
  hasItem ({ item }) {
    if (!item) return false
    else return true
  },
  isToUpdate ({ toUpdate }) {
    if (!toUpdate) return false
    else return true
  }
}
