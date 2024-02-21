import { MouseEvent, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import { NewTrip } from "../../types/trip";
import style from "./Modal.module.css";
import AddTripForm from "../AddTripForm/AddTripForm";

interface ModalProps {
  handleModal: () => void;
  addNewTrip: (data: NewTrip) => void;
}

interface KeyboardEvent {
  code: string;
}

const modalRoot = document.getElementById("modal-root") as HTMLElement;

const Modal = ({ handleModal, addNewTrip }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        handleModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [handleModal]);

  const onBackdropClick = (e: MouseEvent<HTMLElement>) => {
    if (e.currentTarget === e.target) {
      handleModal();
    }
  };

  return createPortal(
    <div className={style.backdrop} onClick={onBackdropClick}>
      <div className={style.modal}>
        <div className={style.wrapper}>
          <h2 className={style.title}>Create trip</h2>
          <button>
            <IoMdClose size={20} onClick={handleModal} color="#9C9C9C" />
          </button>
        </div>

        <AddTripForm handleModal={handleModal} addNewTrip={addNewTrip} />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
