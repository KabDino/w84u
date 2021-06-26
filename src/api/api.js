import firebase from '../firebase';

export const profileAPI = {
  async getName() {
    var userBase = await firebase.auth().currentUser;
    if (userBase != null) {
      return userBase.displayName;
    }
  },

  changeMyName(newName) {
    let user = firebase.auth().currentUser;
    return user.updateProfile({
      displayName: newName,
    });
  },
};
