import firebase from '../firebase';

export const profileAPI = {
  changeMyName(newName) {
    let user = firebase.auth().currentUser;
    return user.updateProfile({
      displayName: newName,
    });
  },
};
