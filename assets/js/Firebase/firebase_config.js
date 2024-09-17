import 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js';
import 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth-compat.js';
import 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore-compat.js';
import 'https://www.gstatic.com/firebasejs/10.11.0/firebase-storage-compat.js';

const firebaseConfig = {
  apiKey: "AIzaSyD_c-ALWkxzlnj16jlo6E4V87-2mZo8gdg",
  authDomain: "allen-vision.firebaseapp.com",
  projectId: "allen-vision",
  storageBucket: "allen-vision.appspot.com",
  messagingSenderId: "898076668203",
  appId: "1:898076668203:web:dee7ee178698d17704556e"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
