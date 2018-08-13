let DBOpenRequest = window.indexedDB.open('todos', 4)

let database = null

const databaseError = event => {
  console.error('Failed to load database!')
}

const databaseSuccess = event => {
  database = event.target.result
  console.log('Successfully loaded the database!')
}

const databaseUpgradeNeeded = event => {
  database = event.target.result
  database.onerror = onerror
  let objectStore = database.createObjectStore('todo', { keyPath: '_key' })
  objectStore.createIndex("_key", "_key", { unique: true })
  objectStore.createIndex("text", "text", { unique: true })
  objectStore.createIndex("done", "done", { unique: false })
  console.log('Database upgraded!')
}

const transactionComplete = event => {
  console.log('Transaction completed: database modification finished.')
}

const transactionError = event => {
  console.log('Transaction not opened due to error. Duplicate items not allowed.')
}

const storeSuccess = event => {
  console.log('Store Request Successful!');
}

const getAll = () => {
  return new Promise((resolve, reject) => {
    let transaction = database.transaction(['todos'], 'readwrite')
    transaction.oncomplete = transactionComplete
    transaction.onerror = transactionError
    const todoStore = transaction.objectStore('todos')
    let storeRequest = todoStore.getAll()
    storeRequest.onsuccess = resolve
    storeRequest.onerror = reject
  })
}

const add = todo => {
  return new Promise((resolve, reject) => {
    let error = null
    if (!todo) error = { message: 'Missing Payload.' }
    else {
      if (!todo.text) error = { message: 'Missing Properties.', properties: { text: 'Text Property is Required!' } }
      if (!todo.hasOwnProperty('done')) {
        if (!error) error = { message: 'Missing Properties.', properties: { done: 'Done Property is Required!' } }
        else error = { ...error, ...{ properties: { done: 'Done Property is Required!' } } }
      }
    }
    if (!!error) reject(error)
    else {
      let transaction = database.transaction(['todos'], 'readwrite')
      transaction.oncomplete = transactionComplete
      transaction.onerror = transactionError
      const todoStore = transaction.objectStore('todos')
      let storeRequest = todoStore.add(todo)
      storeRequest.onsuccess = resolve
      storeRequest.onerror = reject
    }
  })
}

const edit = (todo) => {
  return new Promise((resolve, reject) => {
    let error = null
    if (!todo) error = { message: 'Missing Payload.' }
    else {
      if (!todo.text) error = { message: 'Missing Properties.', properties: { text: 'Text Property is Required!' } }
      if (!todo.hasOwnProperty('done')) {
        if (!error) error = { message: 'Missing Properties.', properties: { done: 'Done Property is Required!' } }
        else error = { ...error, ...{ properties: { done: 'Done Property is Required!' } } }
      }
    }
    if (!!error) reject(error)
    else {
      let transaction = database.transaction(['todos'], 'readwrite')
      transaction.oncomplete = transactionComplete
      transaction.onerror = transactionError
      const todoStore = transaction.objectStore('todos')
      let storeRequest = todoStore.put(todo)
      storeRequest.onsuccess = resolve
      storeRequest.onerror = reject
    }
  })
}

const remove = key => {
  return new Promise((resolve, reject) => {
    if (!key) reject({ message: 'Object Key is Required!' })
    else {
      let transaction = database.transaction(['todos'], 'readwrite')
      transaction.oncomplete = transactionComplete
      transaction.onerror = transactionError
      const todoStore = transaction.objectStore('todos')
      let storeRequest = todoStore.delete(key)
      storeRequest.onsuccess = resolve
      storeRequest.onerror = reject
    }
  })
}

DBOpenRequest.onerror = databaseError
DBOpenRequest.onsuccess = databaseSuccess
DBOpenRequest.onupgradeneeded = databaseUpgradeNeeded

export {
  add,
  getAll,
  edit,
  remove
}
