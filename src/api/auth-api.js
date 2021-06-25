import firebase from '../firebase';

export const authAPI = {
  login(email, password) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      // .catch((err) => {
      //   switch (err.code) {
      //     case 'auth/invalid-email':
      //     case 'auth/user-disabled':
      //     case 'auth/user-not-found':
      //       // setEmailError(err.message);
      //       break;
      //     case 'auth/wrong-password':
      //       // setPasswordError(err.message);
      //       break;
      //     default:
      //       break;
      //   }
      // });
  },
  signup(email, password) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      // .catch((err) => {
      //   switch (err.code) {
      //     case 'auth/email-already-in-use':
      //     case 'auth/invalid-email':
      //       // setEmailError(err.message);
      //       break;
      //     case 'auth/weak-password':
      //       // setPasswordError(err.message);
      //       break;
      //     default:
      //       break;
      //   }
      // });
  },
  authListener(ok, no) {
    return firebase.auth().onIdTokenChanged((user) => {
      if (user) {
        ok();
      } else {
        no();
      }
    });
    // firebase.auth().onAuthStateChanged((user) => {
    //   debugger
    //   return !!user ? true : false;
    // });
  },
  logout() {
    return firebase.auth().signOut();
  },
};