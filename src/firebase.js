// import firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: 'AIzaSyDZOU1qvBKlR4nj0oIobcSfH_Vqq70ljS0',
  authDomain: 'liteworship.firebaseapp.com',
  databaseURL: "https://liteworship-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: 'liteworship',
  storageBucket: 'liteworship.appspot.com',
  messagingSenderId: '860580237001',
  appId: '1:860580237001:web:495bba6ff87b8de468c718',
  measurementId: 'G-NWGPGENDNE',
};
firebase.initializeApp(firebaseConfig);

export default firebase;
