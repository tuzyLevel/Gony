import React, { SyntheticEvent } from "react";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSelector, useDispatch } from "react-redux";

import Card from "../../Card/Card";

import classes from "./FilesNFolders.module.css";

// import {
//   renameModalOpen,
//   sendModalOpen,
// } from "../../../store/features/boxModalSlice";
import { RootState } from "../../../store/store";

interface FilesNFoldersProps extends React.PropsWithChildren {
  currentFolderFiles: Array<Files.ExtendedFileNode>;
  setCurrentFolderFiles: Function;
  directoryHandler: (path: string) => void;
  callAPICurrentFolderFiles: (folder: string) => void;
  setMoveFileIndex: React.Dispatch<React.SetStateAction<number>>;
  setMovedInFolderIndex: React.Dispatch<React.SetStateAction<number>>;
  fileBtnsClickHandler: (e: SyntheticEvent) => void;
  // setCurrentFolder: Dispatch<SetStateAction<string>>;
}

const fileControllBtnsStyle = {
  borderRadius: "5px",
  padding: "1px",
  backgroundColor: "#DDDDDD",
};

const FilesNFolders = (props: FilesNFoldersProps) => {
  // const modalState = useSelector(
  //   (state: RootState) => state.boxModalOpenChecker.modalState
  // );

  // const dispatch = useDispatch();

  const doubleClickHandler = (e: SyntheticEvent) => {
    const doubleClickedTargetIndex =
      e.currentTarget.getAttribute("data-index")!;
    const targetObject = props.currentFolderFiles[+doubleClickedTargetIndex];
    if (targetObject.type === "directory") {
      // props.setCurrentFolder(targetObject.path);
      props.directoryHandler(targetObject.path);
      return;
    }
  };

  const clickHandler = (e: SyntheticEvent) => {
    const clickedTargetIndex = e.currentTarget.getAttribute("data-index")!;
    const filePath = props.currentFolderFiles[+clickedTargetIndex].path;
    console.log(e.currentTarget);
    props.setCurrentFolderFiles((prev: any) =>
      prev.map((file: any) => {
        if (file.path === filePath) {
          return { ...file, clicked: true };
        }
        return { ...file, clicked: false };
      })
    );
  };

  const dragStartHandler = (e: SyntheticEvent) => {
    const dragStartTargetIndex = +(e.currentTarget.getAttribute(
      "data-index"
    ) as string);
    // console.log(`dragStartTargetIndex : ${dragStartTargetIndex}`);
    props.setMoveFileIndex((prev) => dragStartTargetIndex);
  };

  const dropHandler = (e: SyntheticEvent) => {
    const dropTargetIndex = +(e.currentTarget.getAttribute(
      "data-index"
    ) as string);

    props.setMovedInFolderIndex((prev) => dropTargetIndex);
  };

  const mouseOverHandler = (e: SyntheticEvent) => {
    const file = e.currentTarget;
    if (file.querySelector("span")?.textContent === "..") return;
    const btnsIndividualFile = e.currentTarget.querySelector(
      `.${classes.btns_individual_file}`
    );

    btnsIndividualFile?.classList.add(`${classes.btns_individual_file_over}`);
    // console.log(btnsIndividualFile);
  };

  const mouseLeaveHandler = (e: SyntheticEvent) => {
    const btnsIndividualFile = e.currentTarget.querySelector(
      `.${classes.btns_individual_file}`
    );
    btnsIndividualFile?.classList.remove(
      `${classes.btns_individual_file_over}`
    );
  };

  const fileBtnsDoubleClickHandler = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    // <div className={classes.box_right_content_container}>
    <React.Fragment>
      {props.currentFolderFiles.map(
        (file: Files.ExtendedFileNode, index: number) => (
          <div
            style={{
              width: "100%",
              height: "150px",
              margin: "20px 0px",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
            key={file.name}
            data-index={index}
            onDoubleClick={doubleClickHandler}
            onClick={clickHandler}
            onDrop={dropHandler}
            onDragStart={dragStartHandler}
            onDragOver={(e: SyntheticEvent) => {
              e.preventDefault();
            }}
            draggable
          >
            <div
              style={{
                width: "150px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              className={
                file.clicked
                  ? `${classes.file_folder_container} ${classes.file_folder_container_clicked}`
                  : `${classes.file_folder_container}`
              }
              onMouseOver={mouseOverHandler}
              onMouseLeave={mouseLeaveHandler}
            >
              <FontAwesomeIcon
                className={classes.clickable}
                icon={file.type === "file" ? "file" : "folder"}
                size="5x"
              />
              <span>
                {file.name.length > 10
                  ? file.name.substring(0, 10) + "..."
                  : file.name}
              </span>
              <div
                className={classes.btns_individual_file}
                onClick={(e: SyntheticEvent) => {
                  e.stopPropagation();
                }}
              >
                <button
                  style={{
                    ...fileControllBtnsStyle,
                  }}
                  onClick={props.fileBtnsClickHandler}
                  onDoubleClick={fileBtnsDoubleClickHandler}
                >
                  Rename
                </button>

                {file.type === "file" ? (
                  <button
                    style={{
                      ...fileControllBtnsStyle,
                    }}
                    onClick={props.fileBtnsClickHandler}
                    onDoubleClick={fileBtnsDoubleClickHandler}
                  >
                    Send
                  </button>
                ) : (
                  <></>
                )}
                <button
                  style={{ ...fileControllBtnsStyle }}
                  onClick={props.fileBtnsClickHandler}
                  onDoubleClick={fileBtnsDoubleClickHandler}
                >
                  Del
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </React.Fragment>
  );
};

export default FilesNFolders;
