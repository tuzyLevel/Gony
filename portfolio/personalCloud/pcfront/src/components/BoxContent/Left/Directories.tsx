import React, { SyntheticEvent, Dispatch, SetStateAction } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSelector } from "react-redux";

import Card from "../../Card/Card";

import { RootState } from "../../../store/store";

import classes from "./Directories.module.css";

interface BoxContentProps extends React.PropsWithChildren {
  style: React.CSSProperties;
  folderList: Array<Files.ExtendedDirectoryNode>;

  directoryHandler: (path: string) => void;
}

const Directories = (props: BoxContentProps) => {
  const loginId = useSelector((state: RootState) => state.loginChecker.userId);

  const folderClickHandler = (e: SyntheticEvent) => {
    const folderPath =
      e.currentTarget.getAttribute("data-path") || `/${loginId}`;

    props.directoryHandler(folderPath);
  };

  return (
    <Card style={props.style}>
      {props.folderList.map(
        (folder: Files.ExtendedDirectoryNode, index: number) => (
          <div
            className={
              folder.clicked
                ? `${classes.folder} ${classes.folder_clicked}`
                : `${classes.folder}`
            }
            style={{
              margin: "10px",
            }}
            key={folder.name + index}
            data-path={folder.path}
            data-index={index}
            onClick={folderClickHandler}
          >
            {folder.level > 0
              ? "\u00A0".repeat((folder.level - 1) * 4) + " ⎣ "
              : ""}
            <FontAwesomeIcon icon="folder" />
            {folder.name}
          </div>
        )
      )}
    </Card>
  );
};

export default Directories;
