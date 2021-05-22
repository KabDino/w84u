import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getSongs } from '../../../redux/main-reducers';
import { Link } from 'react-router-dom';
import Menu from '../../common/Menu/Menu';
import styles from './Main.module.scss';

const Main = ({ songs, getSongs, isAuth }) => {
  useEffect(() => {
    getSongs();
  }, [songs]);
  return (
    <>
      {isAuth && <Menu isAuth={isAuth} />}
      <main className="main">
        <div className="songCards">
          {songs.map((item) => (
            <section key={item.id} className={styles.songCards__item}>
              <Link to={'/song-' + item.id}>
                <div className={styles.songCards__itemImage}>
                  <img
                    src={item.image}
                    className={styles.littleImageForCard}
                    alt="song"
                  />
                </div>
                <div className={styles.songCards__itemBody}>
                  <p className={styles.songCards__itemTitle}>{item.name}</p>
                  <p className={styles.songCards__itemAuthor}>{item.author}</p>
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
