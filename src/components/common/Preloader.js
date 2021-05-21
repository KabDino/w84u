import React from 'react';
import preloader from '../../source/images/preloader.svg';

let Preloader = () => {
  return (
    <div className='preloaderContainer'><img src={preloader} alt='preloader'/></div>
  )
}

export default Preloader;
