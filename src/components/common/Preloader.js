import React from 'react';
import preloader from '../../source/images/preloader.svg';

const Preloader = () => (
  <div className="preloaderContainer">
    <img src={preloader} alt="preloader" />
  </div>
);

export default Preloader;
