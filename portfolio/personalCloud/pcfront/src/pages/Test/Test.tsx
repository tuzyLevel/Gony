import React from "react";

import axios from "axios";

import Modal from "../../components/Modal/Box/Modal";

// const modalBtns: ModalBtn[] = [
//   {
//     name: "Rename",
//     category: "rename",
//     clickHandler: () => {
//       console.log("Rename button Clicked!");
//     },
//   },
//   {
//     name: "Send",
//     category: "send",
//     clickHandler: () => {
//       console.log(`Send button Clicked!`);
//     },
//   },
// ];

const modalFormInfo: ModalInfo[] = [
  {
    modalName: "rename",
    contents: ["Now", "Change"],
    ko: { Now: "현재 파일명", Change: "변경할 파일명" },
  },
  { modalName: "send", contents: ["To"], ko: { To: "받을 사람" } },
];

const Test = () => {
  //   return <Modal btns={modalBtns} modalFormInfo={modalFormInfo} />;
  return <div></div>;
};

export default Test;
