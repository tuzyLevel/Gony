import React, { SyntheticEvent } from "react";
import { useDispatch } from "react-redux";

import { modalClose } from "../../../store/features/boxModalSlice";
import ModalForm from "./Form/ModalForm";

import modalClasses from "./Modal.module.css";

interface ModalProps extends React.PropsWithChildren {
  modalFormInfo: ModalInfo[];
  btns: ModalBtns;
  currentFolderFiles: Files.ExtendedFileNode[];
  modalFileIndex: number;
  currentFolder: string;
  getFolderList: () => Promise<Files.ExtendedDirectoryNode[]>;
  callAPICurrentFolderFiles: (folder: string) => void;
  directoryHandler: (folderPath: string) => void;
}

const Modal = (props: ModalProps) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={(e: SyntheticEvent) => {
        if (e.target !== e.currentTarget) return;
        dispatch(modalClose());
      }}
      className={`${modalClasses.modal_container}`}
      style={{ backgroundColor: "rgb(255, 255, 255, 0.2)" }}
    >
      <ModalForm
        modalInfo={props.modalFormInfo}
        btns={props.btns}
        currentFolderFiles={props.currentFolderFiles}
        modalFileIndex={props.modalFileIndex}
        getFolderList={props.getFolderList}
        callAPICurrentFolderFiles={props.callAPICurrentFolderFiles}
        currentFolder={props.currentFolder}
        directoryHandler={props.directoryHandler}
      />
    </div>
  );
};

export default Modal;
