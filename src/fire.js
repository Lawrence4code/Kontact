import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAj09e3yeL-lJAT3GkqJ_n1n1rz_FCOEJQ",
  authDomain: "kontact-103e9.firebaseapp.com",
  databaseURL: "https://kontact-103e9.firebaseio.com",
  projectId: "kontact-103e9",
  storageBucket: "kontact-103e9.appspot.com",
  messagingSenderId: "657764194742"
};

const fire = firebase.initializeApp(config);

// const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, fire };
