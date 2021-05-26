import React from 'react';

const SingleSong = ({ song, songText, toggleEditSong, handleDeleteSong }) => {
  return (
    <>
      <div className="headerSingleSong">
        <img
          src={song.image}
          className="headerSingleSong__image-background"
          alt="song"
        />
        <img src={song.image} className="headerSingleSong__image" alt="song" />
        <div>
          <p className="headerSingleSong__name">{song.name}</p>
          <p className="headerSingleSong__text">{song.author}</p>
          {song.tonality && (
            <p className="headerSingleSong__text">{song.tonality}</p>
          )}
          {song.temp && <p className="headerSingleSong__text">{song.temp}</p>}
        </div>
      </div>

      <div className="bodySingleSong">
        <pre dangerouslySetInnerHTML={{ __html: songText }}></pre>
      </div>
    </>
  );
};

export default SingleSong;
