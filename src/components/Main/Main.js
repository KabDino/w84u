import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getSongs } from '../../redux/main-reducers';
import { Link } from 'react-router-dom';
import Menu from '../common/Menu';

const Main = ({ songs, getSongs, isAuth }) => {
  useEffect(() => {
    getSongs();
  }, [songs]);
  return (
    <>
      {isAuth && <Menu isAuth={isAuth} />}
      <main className="main">
        <div className="song-cards">
          {songs.map((item) => (
            <section key={item.id} className="song-cards__item">
              <Link to={'/song-' + item.id}>
                <div className="song-cards__item-image">
                  <img
                    src={item.image}
                    className="little-image-for-card"
                    alt="song"
                  />
                </div>
                <div className="song-cards__item-body">
                  <p className="song-cards__item-title">{item.name}</p>
                  <p className="song-cards__item-author">{item.author}</p>
                </div>
              </Link>
            </section>
          ))}
        </div>
      </main>
    </>
  );
};

let mapStateToProps = (state) => ({
  songs: state.mainReducer.songs,
  isFetching: state.mainReducer.isFetching,
  name: state.profileReducer.name,
});

export default connect(mapStateToProps, { getSongs })(Main);
