// todos: Install the following package:
import { openDB } from 'idb';

// todos: Complete the initDb() function below:
const initdb = async () => {
  openDB('todos', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('todos')) {
        console.log('todos database already exists');
        return;
      }
      db.createObjectStore('todos', { keyPath: 'id', autoIncrement: true });
      console.log('todos database created');
    },
  });
};

// todos: Complete the postDb() function below:
export const postDb = async (name, home, cell, email) => {
  console.log('POST to the database', name, home, cell, email);
  const todosDb = await openDB('todos', 1);
  const tx = todosDb.transaction('todos', 'readwrite');
  const store = tx.objectStore('todos');
  const request = store.add({ name, home, cell, email });
  const result = await request;
  console.log('Data saved to the database', result);
};

// todos: Complete the getDb() function below:
export const getDb = async () => {
  console.log('GET from database');
  const todosDb = await openDB('todos', 1);
  const tx = todosDb.transaction('todos', 'readonly');
  const store = tx.objectStore('todos');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

// todos: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
  console.log('DELETE from the database', id);
  const todossDb = await openDB('todoss', 1);
  const tx = todossDb.transaction('todoss', 'readwrite');
  const store = tx.objectStore('todoss');
  const request = store.delete(id);
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
