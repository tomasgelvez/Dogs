 import React from 'react'
import {Link} from 'react-router-dom';
import s from '../../styles/LadingPage.module.css'
import Modal from '../Modal/Modal.js';
import useModal from '../Modal/UseModal.js';

function LadingPage() {
  const [isOpenLoginModal, openLoginModal ,closeLoginModal ] = useModal();
  return (
    <div className={s.conteiner}>
        <div className={s.div}>
        <button className={s.btn} onClick={openLoginModal}>
        WOOF!
      </button>
      <Modal
        isOpen={isOpenLoginModal} 
        closeModal={closeLoginModal}
      >
        <h1 className={s.title}>Bienvenidos al Proyecto Invidual DOGS</h1>
        <h2  className={s.title}>De Tomas Gelvez</h2>
        <Link to="/home">
            <button className={s.btn}>Ingresar</button>
        </Link>
      </Modal>
        </div>
    </div>
  )
}

export default LadingPage 