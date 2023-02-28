declare interface ModalInfo {
  modalName: modalType;
  contents: string[];
  ko: { [en: string]: string };
}

interface ModalBtns {
  [modalName: string]: ModalBtn;
}

interface ModalBtn {
  category: "rename" | "send";
  clickHandler: (data: {
    currentFileName?: string;
    changedFileName?: string;
    to?: string;
  }) => Promise;
}

type modalType = "rename" | "send" | "login" | "regist";
