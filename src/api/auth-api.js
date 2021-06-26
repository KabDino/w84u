import firebase from '../firebase';

export const authAPI = {
  login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
  signup(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  },
  async authListener() {
    return await firebase.auth();
  },
  logout() {
    return firebase.auth().signOut();
  },
};
