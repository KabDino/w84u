import { songsAPI } from '../api/songs-api';

const ADD_NEW_SONG = 'ADD_NEW_SONG';
const GET_SONGS = 'GET_SONGS';
const DELETE_SONG = 'DELETE_SONG';
const GET_SINGE_SONG = 'GET_SINGE_SONG';
const TOGGLE_FETCHING = 'TOGGLE_FETCHING';

let initialState = {
  songs: [],
  singleSong: [],
  isFetching: false,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SONGS: {
      return {
        ...state,
        songs: [...action.songs],
      };
    }
    case ADD_NEW_SONG: {
      return {
        ...state,
        songs: [...state.songs],
      };
    }
    case DELETE_SONG: {
      return {
        ...state,
        songs: state.songs.filter((song) => song.id !== action.id),
        singleSong: [],
      };
    }
    case GET_SINGE_SONG: {
      return {
        ...state,
        singleSong: action.song,
      };
    }
    case TOGGLE_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }
    default:
      return state;
  }
};

const getSongsSuccess = (songs) => ({
  type: GET_SONGS,
  songs,
});

const deleteSongSuccess = (id) => ({
  type: DELETE_SONG,
  id,
});

const getSingleSongSuccess = (song) => ({
  type: GET_SINGE_SONG,
  song,
});

const toggleFetching = (isFetching) => ({
  type: TOGGLE_FETCHING,
  isFetching,
})

export const getSongs = () => {
  return (dispatch) => {
    dispatch(toggleFetching(true))
    songsAPI.getSongs().then((response) => {
      dispatch(getSongsSuccess(Object.values(response.val())));
      dispatch(toggleFetching(false))
    });
  };
};

export const addNewSong = (nameSong, authorSong, tonalitySong, tempSong, textSong, imageAsFile) => {
  let id = new Date().getTime();
  if (imageAsFile !== '') {
    return async () => {
      let imageForSong = await songsAPI.onloadImageSong(imageAsFile);
      songsAPI.addSong(id, nameSong, authorSong, tonalitySong, tempSong, textSong, imageForSong);
    };
  } else {
    let fakeURL =
      'https://firebasestorage.googleapis.com/v0/b/liteworship.appspot.com/o/images%2Fno-image.svg?alt=media&token=8da6e4eb-104a-42ae-bd37-c93c527c4a9b';
    return async () => songsAPI.addSong(id, nameSong, authorSong, tonalitySong, tempSong, textSong, fakeURL);
  }
};

export const updateSong = (newSong) => {
  if (newSong.isNewImage === true) {
    return async () => {
      let imageForSong = await songsAPI.onloadImageSong(newSong.image);
      let newSongWithNewImage = {
        id: newSong.id,
        name: newSong.name,
        author: newSong.author,
        text: newSong.text,
        image: imageForSong,
      };
      songsAPI.updateSong(newSongWithNewImage);
    };
  } else {
    return () => {
      songsAPI.updateSong(newSong);
    };
  }
};

export const deleteSong = (id) => {
  return (dispatch) => {
    dispatch(toggleFetching(true))
    songsAPI.deleteSong(String(id)).then(() => {
      dispatch(deleteSongSuccess(id));
      dispatch(toggleFetching(false))
    });
  };
};

export const getSingleSong = (id) => {
  return (dispatch) => {
    songsAPI.getSingleSong(id).then((response) => {
      dispatch(getSingleSongSuccess(response.val()));
    });
  };
};

export default mainReducer;
