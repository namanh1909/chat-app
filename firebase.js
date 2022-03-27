import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgfNcPeIYszun7A0jbmSunIwYL53O0nzE",
  authDomain: "signal-ad577.firebaseapp.com",
  projectId: "signal-ad577",
  storageBucket: "signal-ad577.appspot.com",
  messagingSenderId: "816819688895",
  appId: "1:816819688895:web:0c95c6f47e5ee7b6e4fd0a",
  measurementId: "G-76V1GVFFHY",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
