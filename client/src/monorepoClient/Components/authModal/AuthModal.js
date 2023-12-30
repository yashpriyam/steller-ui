import React from 'react';
import { Modal } from '../modal/modal.component';
import "./authModal.scss";
import SocialLoginComponent from "../SocialLoginCompenent/SocialLoginComponent";


const AuthModal = ({ setOpenModal }) => {

    return (
      <div>
        <Modal onEscPress={() => setOpenModal(false)}>
          <div className="modal-container">
            <div className="modal-close-button-container">
              <button
                className="modal-close-button"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                ✖️
              </button>
            </div>
            <SocialLoginComponent
              setOpenModal={setOpenModal}
            />
          </div>
        </Modal>
      </div>
    );
}

export default AuthModal
