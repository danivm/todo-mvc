import firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyBZ5rNNv0fQGAhm-CkCWLE8wbEFEEr05yo',
  authDomain: 'todo-mvc-1e9fc.firebaseapp.com',
  projectId: 'todo-mvc-1e9fc'
})

const db = firebase.firestore()

export default db
