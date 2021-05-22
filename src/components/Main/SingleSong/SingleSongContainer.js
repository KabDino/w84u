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

  const toggleEditSong = useCallback(() => {
    isEdit ? setIsEdit(false) : setIsEdit(true);
  }, [isEdit]);

  useEffect(() => {
    getSingleSong(songId);
  }, [getSingleSong, songId, toggleEditSong, song]);

  const editSong = (newSong) => {
    updateSong(newSong);
  };

  const handleDeleteSong = (id) => {
    deleteSong(id);
    setIsRedirectOnMain(true);
  };

  if (isRedirectOnMain) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      {!isEdit ? (
        <SingleSong
          song={song}
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
