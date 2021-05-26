import firebase from '../firebase';
// const db = firebase.firestore();
const database = firebase.database();
const storage = firebase.storage();

export const songsAPI = {
  getSongs() {
    // return db.collection('songs').get();
    return database.ref(`songs`).once('value');
  },
  addSong(id, nameSong, authorSong, tonalitySong, tempSong, textSong, imageForSong) {
    // return db.collection('songs').doc(String(newSong.id)).set(newSong);
    return database.ref('songs/' + String(id)).set({
      id: id,
      name: nameSong,
      text: textSong,
      author: authorSong,
      tonality: tonalitySong,
      temp: tempSong,
      image: imageForSong,
    });
  },
  deleteSong(id) {
    // return db.collection('songs').doc(id).delete();
    return database.ref('songs/' + id).remove();
  },
  getSingleSong(id) {
    return database.ref(`songs/${id}`).once('value');
  },
  updateSong(newSong) {
    return database.ref('songs/' + newSong.id).update(newSong);
  },

  onloadImageSong(imageAsFile) {
    return new Promise((resolve, reject) => {
      const uploadTask = storage
        .ref(`/images/${imageAsFile.name}`)
        .put(imageAsFile);

      uploadTask.on(
        'state_changed',
        (snapShot) => {
          // console.log(snapShot);
        },
        (err) => {
          // console.log(err);
        },
        () => {
          storage
            .ref('images')
            .child(imageAsFile.name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              resolve(fireBaseUrl);
            });
        }
      );
    });
  },
};
