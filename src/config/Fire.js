import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAoN3jwWoDe6kTB8sJLRUeHhioVdsRixNA",
  authDomain: "webpage-builder-1.firebaseapp.com",
  databaseURL: "https://webpage-builder-1.firebaseio.com",
  projectId: "webpage-builder-1",
  storageBucket: "webpage-builder-1.appspot.com",
  messagingSenderId: "1056154724659",
  appId: "1:1056154724659:web:b8bc0239e6f32c64f9f646",
  measurementId: "G-43HZTHDDHZ"
};

firebase.initializeApp(config)
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;