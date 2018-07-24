import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCpRQY-Qr5QEr8hSPOlp_wI6G67urEsINI",
  authDomain: "bankruptcy-trust-app.firebaseapp.com",
  databaseURL: "https://bankruptcy-trust-app.firebaseio.com",
  projectId: "bankruptcy-trust-app",
  storageBucket: "bankruptcy-trust-app.appspot.com",
  messagingSenderId: "881094159537"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};

