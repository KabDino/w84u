import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getSongs } from '../../../redux/main-reducers';
import { Link } from 'react-router-dom';
import Menu from '../../common/Menu/Menu';
import Search from './Search/Search';
import styles from './Main.module.scss';

const Main = ({ songs, getSongs, isAuth }) => {
  const [valueForSearch, setValueForSearch] = useState('');

  useEffect(() => {
    getSongs();
  }, [getSongs]);
  // }, [songs]);

  const newSearchText = (text) => {
    setValueForSearch(text);
  };

  return (
    <>
      {isAuth && <Menu isAuth={isAuth} />}

      <main className="main">
        <Search newSearchText={newSearchText} />

        <div className="songCards">
          {songs.map((item) => {
            return item.name
              .toLowerCase()
              .indexOf(valueForSearch.toLowerCase()) !== -1 ||
              item.text.toLowerCase().indexOf(valueForSearch.toLowerCase()) !==
                -1 ? (
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
                    <p className={styles.songCards__itemAuthor}>
                      {item.author}
                    </p>
                  </div>
                </Link>
              </section>
            ) : null;
          })}
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
