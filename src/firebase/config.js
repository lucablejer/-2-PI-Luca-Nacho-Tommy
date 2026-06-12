import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDBiutfJ-AtmlXXr9Afqx8Q2CullFl757c",
  authDomain: "pi-progra-3.firebaseapp.com",
  projectId: "pi-progra-3",
  storageBucket: "pi-progra-3.firebasestorage.app",
  messagingSenderId: "459462779641",
  appId: "1:459462779641:web:faa2b5d81183b6a38ff828"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();