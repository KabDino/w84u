import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Redirect, useParams, Link } from 'react-router-dom';
import {
  getSingleSong,
  updateSong,
  deleteSong,
} from '../../../redux/main-reducers';
import SingleSong from './SingleSong';
import EditSong from './EditSong';
import Menu from '../../common/Menu/Menu';

const SingleSongContainer = ({
  isAuth,
  getSingleSong,
  song,
  updateSong,
  deleteSong,
}) => {
  let { songId } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [isRedirectOnMain, setIsRedirectOnMain] = useState(false);
  const [tonality, setTonality] = useState(0);
  const [transposedSong, setTransposedSong] = useState(null);

  const toggleEditSong = useCallback(() => {
    isEdit ? setIsEdit(false) : setIsEdit(true);
  }, [isEdit]);

  useEffect(() => {
    getSingleSong(songId);
    transposeSong(song.text);
  }, [getSingleSong, songId, toggleEditSong, song.text, tonality]);

  const transposeChord = (chord, amount) => {
    let scale = [
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F',
      'F#',
      'G',
      'G#',
      'A',
      'A#',
      'H',
    ];
    return chord.replace(/[CDEFGAHB]#?/g, function (match) {
      let i = (scale.indexOf(match) + amount) % 12;
      return scale[i < 0 ? i + 12 : i];
    });
  };

  const transposeSong = (song) => {
    if (song) {
      let newSong = song
        .split('[')
        .map((item) => {
          return item.indexOf(']') !== -1
            ? '<span class="chords">' +
                transposeChord(item.split(']')[0], tonality) +
                '</span>' +
                item.split(']')[1]
            : item;
        })
        .join('');
      setTransposedSong(newSong);
      console.log(tonality);
    }
  };

  const editSong = (newSong) => {
    updateSong(newSong);
  };

  const handleDeleteSong = (id) => {
    deleteSong(id);
    setIsRedirectOnMain(true);
  };

  const tonalityUp = () => {
    setTonality(tonality + 1);
  };

  const tonalityDown = () => {
    setTonality(tonality - 1);
  };

  if (isRedirectOnMain) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      {!isEdit ? (
        <SingleSong
          song={song}
          songText={transposedSong}
          toggleEditSong={toggleEditSong}
          handleDeleteSong={handleDeleteSong}
        />
      ) : (
        <EditSong
          song={song}
          toggleEditSong={toggleEditSong}
          editSong={editSong}
        />
      )}

      {isAuth ? (
        <Menu
          isAuth={isAuth}
          song={song}
          handleDeleteSong={handleDeleteSong}
          toggleEditSong={toggleEditSong}
          tonalityUp={tonalityUp}
          tonality={tonality}
          tonalityDown={tonalityDown}
        />
      ) : (
        <Link to="/login" className="link">
          Войти
        </Link>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  song: state.mainReducer.singleSong,
  isAuth: state.authReducer.isAuth,
});

export default connect(mapStateToProps, {
  getSingleSong,
  updateSong,
  deleteSong,
})(SingleSongContainer);
