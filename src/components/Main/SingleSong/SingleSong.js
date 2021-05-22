import React from 'react';

const SingleSong = ({ song, toggleEditSong, handleDeleteSong }) => {
  return (
    <div>
      {/* <button onClick={toggleEditSong}>Edit</button> */}
      {/* <div onClick={() => handleDeleteSong(song.id)}>X</div> */}

      <div className="headerSingleSong">
      <img
          src={song.image}
          className="headerSingleSong__image-background"
          alt="song"
        />
        <img
          src={song.image}
          className="headerSingleSong__image"
          alt="song"
        />
        <div>
          <p className="headerSingleSong__name">{song.name}</p>
          <p className="headerSingleSong__author">{song.author}</p>
        </div>
      </div>

      <div className="bodySingleSong">
        <p>{song.text}</p>
      </div>
    </div>
  );
};

export default SingleSong;
