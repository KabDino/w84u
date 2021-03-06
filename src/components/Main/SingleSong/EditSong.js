import React, { useEffect, useState } from 'react';

const EditSong = ({ song, toggleEditSong, editSong }) => {
  const [name, setName] = useState(null);
  const [author, setAuthor] = useState(null);
  const [text, setText] = useState(null);
  const [image, setNewImage] = useState(null);
  const [isNewImage, setIsNewImage] = useState(false);
  const [rowsInTextarea, setRowsInTextarea] = useState(9);
  const [numberOfClickEnter, setNumberOfClickEnter] = useState(1);
  const [tonalitySong, setTonalitySong] = useState(null);
  const [tempSong, setTempSong] = useState(null);

  useEffect(() => {
    setName(song.name);
    setAuthor(song.author);
    setText(song.text);
    setNewImage(song.image);
    setTonalitySong(song.tonality);
    setTempSong(song.temp);
  }, [song.name, song.author, song.tonality, song.temp, song.text, song.image]);

  const setNewName = (e) => {
    setName(e.target.value);
  };

  const setNewAuthor = (e) => {
    setAuthor(e.target.value);
  };

  const setNewTonality = (e) => {
    setTonalitySong(e.target.value);
  };

  const setNewTemp = (e) => {
    setTempSong(e.target.value);
  };

  const setNewText = (e) => {
    setText(e.target.value);
    e.nativeEvent.inputType === 'insertLineBreak' &&
      setNumberOfClickEnter(numberOfClickEnter + 1);
    numberOfClickEnter > 9 && setRowsInTextarea(numberOfClickEnter + 1);
  };

  const changeImage = (e) => {
    setNewImage(e.target.files[0]);
    setIsNewImage(true);
  };

  const updateSong = () => {
    let newSong = {
      id: song.id,
      name,
      author,
      tonality: tonalitySong + ' ' || '',
      temp: tempSong + ' ' || '',
      text,
      image,
      isNewImage,
    };
    editSong(newSong);
    toggleEditSong();
  };

  return (
    <div className="container formContainer">
      <div onClick={toggleEditSong} className="svgButton comeBack">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.5 11.9497L13.4497 7L14.864 8.41421L11.3284 11.9497L14.864 15.4853L13.4497 16.8995L8.5 11.9497Z"
            fill="#BB86FC"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z"
            fill="#BB86FC"
          />
        </svg>
      </div>

      <div className="someInputs">
        <div>
          <label htmlFor="name">????????????????</label>
          <input
            id="name"
            defaultValue={name}
            onChange={setNewName}
            className="input"
          />
        </div>
        <div>
          <label htmlFor="author">??????????</label>
          <input
            id="author"
            defaultValue={author}
            onChange={setNewAuthor}
            className="input"
          />
        </div>

        <div className="littleInputsContainer">
          <div className="littleInputs">
            <label htmlFor="author">??????-??????</label>
            <input
              className="input"
              defaultValue={tonalitySong}
              onChange={setNewTonality}
            />
          </div>
          <div className="littleInputs">
            <label htmlFor="author">????????</label>
            <input
              className="input"
              defaultValue={tempSong}
              onChange={setNewTemp}
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="text">??????????</label>
        <textarea
          id="text"
          rows={rowsInTextarea}
          defaultValue={text}
          onChange={setNewText}
          className="input"
        />
      </div>

      <img src={image} className="littleImageForCard" alt="song" />
      <input type="file" onChange={changeImage} />

      <div>
        <button onClick={updateSong}>??????????????????</button>
      </div>
    </div>
  );
};

export default EditSong;
