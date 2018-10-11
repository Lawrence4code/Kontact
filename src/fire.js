import firebase from 'firebase/app';

import 'firebase/database';

var config = {
  apiKey: 'AIzaSyAj09e3yeL-lJAT3GkqJ_n1n1rz_FCOEJQ',
  authDomain: 'kontact-103e9.firebaseapp.com',
  databaseURL: 'https://kontact-103e9.firebaseio.com',
  projectId: 'kontact-103e9',
  storageBucket: 'kontact-103e9.appspot.com',
  messagingSenderId: '657764194742'
};

firebase.initializeApp(config);

const database = firebase.database();

export { database as default };
