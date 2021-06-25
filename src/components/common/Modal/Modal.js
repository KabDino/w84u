import React from 'react';
import styles from './Modal.module.scss';

const Modal = ({ text, positiveHandler, negativeHandler }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal__container}>
        <p className={styles.modal__title}>{text}</p>
        <div className={styles.modal__buttons}>
          <button onClick={() => positiveHandler()}>Да</button>
          <button onClick={() => negativeHandler()}>Нет</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
