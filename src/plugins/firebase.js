import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAsypXUhcHDhhg6WotkYsO6UWXQZpZ6198",
  authDomain: "mini-blog-b6f6a.firebaseapp.com",
  databaseURL: "https://mini-blog-b6f6a.firebaseio.com",
  projectId: "mini-blog-b6f6a",
  storageBucket: "mini-blog-b6f6a.appspot.com",
  messagingSenderId: "140718831200",
  appId: "1:140718831200:web:bafa19f93f0e10263ff505",
  measurementId: "G-PHGEE0PNGR",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

export { auth, provider };
