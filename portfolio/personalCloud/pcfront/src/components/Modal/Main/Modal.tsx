import React, { SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import { modalClose } from "../../../store/features/mainModalSlice";

// import ModalForm from "./Form/ModalForm";
import ModalForm from "./Form/ModalForm";
import classes from "./Modal.module.css";

interface ModalProps extends React.PropsWithChildren {}

const Modal = (props: ModalProps) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={(e: SyntheticEvent) => {
        if (e.target !== e.currentTarget) return;
        dispatch(modalClose());
      }}
      className={`${classes["modal_container"]} ${classes[`${""}_container`]}`}
    >
      <ModalForm />
    </div>
  );
};

export default Modal;
