const database = window.indexedDB.open('list', 4)

database.onerror = event => {
  console.error('Failed to load database!')
}

database.onsuccess = event => {
  console.log('Successfully loaded the database!');
}

export default database
