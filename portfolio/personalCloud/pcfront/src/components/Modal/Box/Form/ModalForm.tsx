import React, { SyntheticEvent, useState, useRef } from "react";
import axios from "axios";

import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useDispatch } from "react-redux";

import { RootState } from "../../../../store/store";

import Button from "../../../Button/Button";

import modalClasses from "../Modal.module.css";

import { modalClose } from "../../../../store/features/boxModalSlice";

import { validation } from "../../../../utils/validation";
import { SERVER_URL } from "../../../../config";

interface ModalProps extends React.PropsWithChildren {
  //   type: string;
  modalInfo: ModalInfo[];
  btns: ModalBtns;
  currentFolderFiles: Files.ExtendedFileNode[];
  modalFileIndex: number;
  getFolderList: () => Promise<Files.ExtendedDirectoryNode[]>;
  directoryHandler: (folderPath: string) => void;
  callAPICurrentFolderFiles: (folder: string) => void;
  currentFolder: string;
}

const ModalForm = (props: ModalProps) => {
  const modalState = useSelector(
    (state: RootState) => state.boxModalOpenChecker.modalState
  );

  const userSearchRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState<string>("");
  const [fileReceiveUser, setFileReceiveUser] = useState<string>("");

  const dispatch = useDispatch();

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const inputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const btnClickHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    const file = props.currentFolderFiles[props.modalFileIndex];
    //click Rename button
    if (e.currentTarget.textContent === "Rename") {
      //check validation of name
      if (validation(file.type, inputValue)) {
        try {
          //check same name folder of file
          const folder = props.currentFolderFiles.filter(
            (file) => file.name === inputValue
          );
          if (folder.length > 0) {
            alert("이미 존재하는 폴더(파일)명입니다.");
            return;
          }

          //change folder or file name
          const response = await props.btns[
            e.currentTarget.textContent
          ].clickHandler({
            currentFileName: file.path,
            changedFileName: inputValue,
          });
          const msg: Message.FileMessage = await response.data;
          alert(msg.COMMENT);
          if (msg.RESPONSE_CODE === "SUCCESS") {
            dispatch(modalClose());
            console.log(props.currentFolder);
            props.directoryHandler(props.currentFolder);
            props.callAPICurrentFolderFiles(props.currentFolder);
          }
        } catch (err) {
          console.error(err);
        } finally {
          //rerender directories and currentFolder Files and Folders
        }
      } else {
        alert(
          `정확한 폴더(파일)명을 입력해주세요. \n영어, 한글, 숫자, 괄호, -, _ 사용 가능합니다. \n파일의 경우 .과 확장자까지 입력해주세요.`
        );
      }

      // props.btns[e.currentTarget.textContent].clickHandler(file.path, inputValu)
      return;
    }

    //click send button
    if (e.currentTarget.textContent === "Send") {
      const currentInputValue = userSearchRef.current!.value;

      if (currentInputValue !== fileReceiveUser) {
        alert("유저 검색을 해주세요.");
        return;
      }

      try {
        const response = await axios.post(
          `${SERVER_URL}/api/files/send`,
          {
            to: currentInputValue,
            filePath: file.path,
            fileName: file.name,
          },
          { withCredentials: true }
        );
        const msg = response.data;
        alert(msg.COMMENT);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const cancelButtonClickHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(modalClose());
  };

  const userSearchBtnHandler = async (e: SyntheticEvent) => {
    const inputValue = userSearchRef!.current!.value;
    if (!validation("user", inputValue)) {
      alert("6~15자의 영어, 숫자를 입력하세요.");
      return;
    }
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/users/find/${inputValue}`,
        {
          withCredentials: true,
        }
      );
      const msg = response.data;
      if (msg.RESPONSE_CODE === "SUCCESS") {
        setFileReceiveUser(`${inputValue}`);
        alert("유저 찾기 성공 원하는 파일을 전송하세요.");
      } else if (msg.RESPONSE_CODE === "FAILED") {
        alert(`유저 없음.`);
        userSearchRef!.current!.value = "";
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      id={`${modalState.name}_modal_form`}
      className={`${modalClasses.modal_form} ${modalClasses.modal_form__sm}`}
      onSubmit={submitHandler}
    >
      {props.modalInfo.map(
        (info) =>
          info.modalName === modalState.name &&
          info.contents.map((content) => (
            <div
              className={`${modalClasses.modal_content} ${modalClasses.modal_content__sm}`}
              id={`${info.modalName}_content_${content}`}
              key={`${info.modalName}_content_${content}}`}
            >
              <label
                className={`${modalClasses.modal_label}`}
                htmlFor={content}
              >
                {info.ko[content]}
              </label>
              {content === "Now" ? (
                <div style={{ display: "flex", border: "2px solid black" }}>
                  <div
                    className={`${modalClasses.modal_input} ${modalClasses.modal_input__sm}`}
                    style={{
                      border:
                        info.modalName === "send" ? "0px" : "1px solid black",
                    }}
                    id={content}
                  >
                    {props.currentFolderFiles[props.modalFileIndex].name
                      .length > 15
                      ? `${props.currentFolderFiles[
                          props.modalFileIndex
                        ].name.substring(0, 15)}...`
                      : props.currentFolderFiles[props.modalFileIndex].name}
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", border: "2px solid black" }}>
                  <input
                    className={`${modalClasses.modal_input} ${modalClasses.modal_input__sm}`}
                    style={{
                      border:
                        info.modalName === "send" ? "0px" : "1px solid black",
                    }}
                    name={content}
                    id={content}
                    type={"text"}
                    autoFocus
                    onChange={inputOnChangeHandler}
                    ref={userSearchRef}
                  />
                  {info.modalName === "send" && (
                    <button
                      style={{
                        borderRadius: "inherit",
                        width: "30px",
                        fontSize: "inherit",
                        zIndex: "3",
                      }}
                      onClick={userSearchBtnHandler}
                    >
                      <FontAwesomeIcon icon="magnifying-glass" />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
      )}
      <div
        style={{
          width: "350px",
          display: "flex",
          justifyContent: "end",
        }}
        id="button_container"
      >
        {Object.entries(props.btns).map(
          ([btnName, btnValue]) =>
            btnValue.category === modalState.name && (
              <Button
                buttonName={btnName}
                className={`md btn_default mg-sm`}
                onClick={btnClickHandler}
                key={btnName}
                type="submit"
              />
            )
        )}
        <Button
          buttonName="Cancel"
          className={`md btn_cancel`}
          onClick={cancelButtonClickHandler}
        />
      </div>
    </div>
  );
};

export default ModalForm;
