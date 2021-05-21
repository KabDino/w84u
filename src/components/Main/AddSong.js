import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addNewSong } from '../../redux/main-reducers';
import { Redirect } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

const AddSong = ({ addNewSong }) => {
  const [nameSong, setNameSong] = useState();
  const [textSong, setTextSong] = useState();
  const [authorSong, setAuthorSong] = useState();
  const [isRedirect, setIsRedirect] = useState(false);
  const [imageAsFile, setImageAsFile] = useState('');

  const setNewNameSong = (e) => {
    setNameSong(e.target.value);
  };

  const setNewAuthorSong = (e) => {
    setAuthorSong(e.target.value);
  };

  const setNewTextSong = (e) => {
    setTextSong(e.target.value);
  };

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(image);
  };

  const sendNewData = () => {
    addNewSong(nameSong, authorSong, textSong, imageAsFile);
    setIsRedirect(true);
  };

  if (isRedirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container form-container">
      <div className="some-inputs">
        <div>
          <input
            className="input"
            defaultValue={nameSong}
            onChange={setNewNameSong}
            placeholder="Название"
          />
        </div>
        <div>
          <input
            className="input"
            defaultValue={authorSong}
            onChange={setNewAuthorSong}
            placeholder="Исполнитель"
          />
        </div>
      </div>
      <div>
        <textarea
          className="input"
          defaultValue={textSong}
          onChange={setNewTextSong}
          placeholder="Текст"
        />
      </div>
      <input type="file" onChange={handleImageAsFile} />

      <div>
        <button onClick={sendNewData}>Сохранить</button>
      </div>
    </div>
  );
};

export default compose(
  connect(null, { addNewSong }),
  withAuthRedirect
)(AddSong);
