import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../redux/auth-reducer';
import styles from './Menu.module.scss';
import Modal from '../Modal/Modal';

const Menu = ({
  song,
  handleDeleteSong,
  toggleEditSong,
  logout,
  tonality,
  tonalityUp,
  tonalityDown,
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState('');
  const [isVisibleModalForDelete, setIsVisibleModalForDelete] = useState(false);

  const toggleMenu = () => {
    let menuOpen = styles.isMenuOpen;
    isOpenMenu === menuOpen ? setIsOpenMenu('') : setIsOpenMenu(menuOpen);
  };

  const userLogout = () => {
    logout();
  };

  const toggleModalForDeleting = () => {
    setIsVisibleModalForDelete(!isVisibleModalForDelete)
  }

  const deleteSong = () => {
    handleDeleteSong(song.id);
  };

  return (
    <div className={styles.menuWrapper + ' ' + isOpenMenu}>
      <div className={styles.menu}>
        <div
          className={styles.menu__icon}
          type="menu-fold"
          onClick={() => toggleMenu()}>
          <svg
            viewBox="64 64 896 896"
            width="1em"
            height="1em"
            fill="#BB86FC"
            aria-hidden="true">
            <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 0 0 0 13.8z"></path>
          </svg>
        </div>

        <nav className={styles.menu__body}>
          <div className={styles.menu__bodyTop}>
            <NavLink
              to="/"
              className={styles.svgButton}
              onClick={() => toggleMenu()}>
              <svg
                width="16"
                height="19"
                viewBox="0 0 16 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 8.41418C0 8.14897 0.105357 7.89461 0.292893 7.70708L7.29289 0.707077C7.68342 0.316553 8.31658 0.316554 8.70711 0.707078L15.7071 7.70708C15.8946 7.89462 16 8.14897 16 8.41418V18C16 18.5523 15.5523 19 15 19H10V12H6V19H1C0.447715 19 0 18.5523 0 18V8.41418Z"
                  fill="#BB86FC"
                />
              </svg>
            </NavLink>

            <NavLink
              to="/add-song"
              className={styles.svgButton}
              onClick={() => toggleMenu()}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="#BB86FC" />
              </svg>
            </NavLink>

            {song && (
              <>
                <div className={styles.customMenu}>
                  <div onClick={toggleEditSong} className={styles.svgButton}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14.9833 5.48122L3.66957 16.7949L3.42466 19.4889C3.36812 20.1109 3.88915 20.6319 4.51109 20.5754L7.2051 20.3304L18.5188 9.01675L14.9833 5.48122Z"
                        fill="#BB86FC"
                      />
                      <path
                        d="M19.2259 8.30964L21.3472 6.18831C21.7378 5.79778 21.7378 5.16462 21.3472 4.77409L19.2259 2.65277C18.8354 2.26225 18.2022 2.26225 17.8117 2.65277L15.6904 4.77411L19.2259 8.30964Z"
                        fill="#BB86FC"
                      />
                    </svg>
                  </div>

                  <div onClick={tonalityUp} className={styles.svgButton}>
                    <svg
                      width="19"
                      height="18"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14 7H16V10H19V12H16V15H14V12H11V10H14V7Z"
                        fill="#BB86FC"
                      />
                      <path
                        d="M6 0V9.28C5.53 9.11 5.03 9 4.5 9C2.01 9 0 11.01 0 13.5C0 15.99 2.01 18 4.5 18C6.81 18 8.7 16.25 8.95 14H9V3H13V0H6Z"
                        fill="#BB86FC"
                      />
                    </svg>
                  </div>

                  <div className={styles.tonality}>{tonality}</div>

                  <div onClick={tonalityDown} className={styles.svgButton}>
                    <svg
                      width="19"
                      height="18"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 10H11V12H19V10Z" fill="#BB86FC" />
                      <path
                        d="M6 0V9.28C5.53 9.11 5.03 9 4.5 9C2.01 9 0 11.01 0 13.5C0 15.99 2.01 18 4.5 18C6.81 18 8.7 16.25 8.95 14H9V3H13V0H6Z"
                        fill="#BB86FC"
                      />
                    </svg>
                  </div>

                  <div
                    onClick={() => toggleModalForDeleting()}
                    className={styles.svgButton}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M15 2H9C7.897 2 7 2.897 7 4V5H3V7H5V20C5 21.103 5.897 22 7 22H17C18.103 22 19 21.103 19 20V7H21V5H17V4C17 2.897 16.103 2 15 2ZM9 4H15V5H9V4ZM17 20H7V7H17V20Z"
                        fill="#BB86FC"
                      />
                    </svg>
                  </div>
                </div>

                {isVisibleModalForDelete && (
                  <Modal
                    text="Вы точно хотите удалить песню?"
                    positiveHandler={deleteSong}
                    negativeHandler={toggleModalForDeleting}
                  />
                )}
              </>
            )}

            <NavLink
              to="/settings"
              className={styles.svgButton}
              onClick={() => toggleMenu()}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.0281 3.08657C13.7643 2.93254 13.4909 2.79318 13.209 2.6696L12.7971 0.786304C12.6966 0.32722 12.2901 0 11.8202 0H8.17997C7.71003 0 7.30349 0.32722 7.20307 0.786304L6.79109 2.6696C6.52543 2.78606 6.2673 2.91655 6.01766 3.06011C5.7556 3.21016 5.50127 3.37551 5.25615 3.55576L3.41918 2.97089C2.97139 2.82831 2.48474 3.01677 2.24977 3.42375L0.429666 6.57627C0.194696 6.98324 0.274809 7.49893 0.622175 7.81544L2.04717 9.11386C2.01442 9.40919 1.99836 9.70503 1.99864 9.99999C1.99836 10.295 2.01442 10.5908 2.04717 10.8862L0.622174 12.1846C0.274808 12.5011 0.194696 13.0168 0.429665 13.4238L2.24977 16.5763C2.48474 16.9832 2.97139 17.1717 3.41918 17.0291L5.25614 16.4443C5.50398 16.6265 5.76124 16.7935 6.02638 16.9449C6.27331 17.0865 6.52852 17.2153 6.7911 17.3304L7.20307 19.2137C7.30349 19.6728 7.71003 20 8.17997 20H11.8202C12.2901 20 12.6966 19.6728 12.7971 19.2137L13.209 17.3304C13.4877 17.2082 13.7581 17.0706 14.0191 16.9187C14.2682 16.7743 14.5102 16.6161 14.7438 16.4443L16.5808 17.0291C17.0286 17.1717 17.5152 16.9832 17.7502 16.5763L19.5703 13.4238C19.8052 13.0168 19.7251 12.5011 19.3778 12.1846L17.9528 10.8862C17.9856 10.5904 18.0016 10.2942 18.0013 9.99888C18.0015 9.70429 17.9855 9.40883 17.9528 9.11387L19.3778 7.81544C19.7251 7.49893 19.8052 6.98325 19.5703 6.57627L17.7502 3.42375C17.5152 3.01678 17.0286 2.82831 16.5808 2.97089L14.7438 3.55576C14.513 3.38604 14.274 3.22954 14.0281 3.08657ZM10 14C12.2091 14 14 12.2091 14 10C14 7.79086 12.2091 6 10 6C7.79086 6 6 7.79086 6 10C6 12.2091 7.79086 14 10 14Z"
                  fill="#BB86FC"
                />
              </svg>
            </NavLink>
          </div>

          <div>
            <div
              className={styles.svgButton + ' ' + styles.svgButtonLogout}
              onClick={() => toggleMenu()}>
              <svg
                onClick={userLogout}
                width="20"
                height="20"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M9 13L14 9L9 5V8H0V10H9V13Z" fill="#BB86FC" />
                <path
                  d="M16 0H7C5.897 0 5 0.897 5 2V6H7V2H16V16H7V12H5V16C5 17.103 5.897 18 7 18H16C17.103 18 18 17.103 18 16V2C18 0.897 17.103 0 16 0Z"
                  fill="#BB86FC"
                />
              </svg>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default connect(null, { logout })(Menu);
