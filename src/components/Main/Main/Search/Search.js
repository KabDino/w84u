import React, { useState } from 'react';
import style from './Seacrch.module.scss';

const Search = ({newSearchText}) => {
  const [valueForSearch, setValueForSearch] = useState('');

  const changeSearch = (e) => {
    setValueForSearch(e.target.value);
    newSearchText(e.target.value);
  };

  return (
    <div className={'formContainer ' + style.searchInput}>
      <input
        defaultValue={valueForSearch}
        placeholder="Введите название или часть песни"
        onChange={changeSearch}
      />
    </div>
  );
};

export default Search;
