import React from "react";
import ReactDOM from "react-dom";

const ModalPortal: React.FC<React.PropsWithChildren> = ({ children }) => {
  const portalLocation = document.getElementById("modal_root")!;
  return ReactDOM.createPortal(children, portalLocation);
};

export default ModalPortal;
