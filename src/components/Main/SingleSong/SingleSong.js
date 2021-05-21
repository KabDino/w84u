import React from 'react';

const SingleSong = ({ song, toggleEditSong, handleDeleteSong }) => {
  return (
    <div>
      {/* <button onClick={toggleEditSong}>Edit</button> */}
      {/* <div onClick={() => handleDeleteSong(song.id)}>X</div> */}

      <div className="header-single-song">
      <img
          src={song.image}
          className="header-single-song__image-background"
          alt="song"
        />
        <img
          src={song.image}
          className="header-single-song__image"
          alt="song"
        />
        <div>
          <p className="header-single-song__name">{song.name}</p>
          <p className="header-single-song__author">{song.author}</p>
        </div>
      </div>

      <div className="body-single-song">
        <p>{song.text}</p>
      </div>
    </div>
  );
};

export default SingleSong;
