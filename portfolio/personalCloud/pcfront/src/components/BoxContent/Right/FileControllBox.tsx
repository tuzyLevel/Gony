import React, { SyntheticEvent, useRef } from "react";
import axios from "axios";

import { SERVER_URL } from "../../../config";
import classes from "./FileControllBox.module.css";

interface FileControllBoxProps extends React.PropsWithChildren {
  currentFolder: string;
  currentFolderFiles: Array<Files.ExtendedFileNode>;
  callAPICurrentFolderFiles: (folder: string) => void;
}

const btns = ["Upload", "Download", "Folder"];

const FileControllBox = (props: FileControllBoxProps) => {
  const fileInput = useRef<HTMLInputElement>(null);

  React.useEffect(() => {}, [fileInput]);

  const btnClickHandler = async (e: SyntheticEvent) => {
    const id = e.currentTarget.id;
    if (id === "Upload") {
      fileInput.current!.click();
      return;
    }

    if (id === "Folder") {
      console.log(id);
      try {
        const response = await axios.post(
          `${SERVER_URL}/api/files/newFolder`,
          { currentFolder: props.currentFolder },
          { withCredentials: true }
        );
        const msg: Message.FileMessage = response.data;
        if (msg.RESPONSE_CODE === "SUCCESS") {
          props.callAPICurrentFolderFiles(props.currentFolder);
        }
        alert(msg.COMMENT);
        return;
      } catch (err) {
        console.error(err);
      }
    }
    const target = props.currentFolderFiles.filter((file) => file.clicked);
    if (target === null || target[0].type === "directory") {
      alert("파일을 선택해 주세요.");
      return;
    }

    if (id === "Download") {
      try {
        await axios
          .get(`${SERVER_URL}/api/files/download?filePath=${target[0].path}`, {
            responseType: "blob",
            withCredentials: true,
          })
          .then((res) => {
            const href = URL.createObjectURL(res.data);
            const contentDisposition = res.headers["content-disposition"];
            const fileNameQueryValue = contentDisposition
              ?.split(";")
              .filter((value) => value.includes("fileName"))[0];

            // create "a" HTML element with href to file & click
            const link = document.createElement("a");
            link.href = href;
            link.setAttribute(
              "download",
              `${fileNameQueryValue!.split("=")[1]}`
            ); //or any other extension
            document.body.appendChild(link);
            link.click();

            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
          });
      } catch (err) {
        console.error(err);
      }
      return;
    }
  };

  const inputChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0];
      // console.log(file);
      let formData = new FormData();
      formData.append("currentFolder", props.currentFolder);
      formData.append("file", file);

      try {
        const response = await axios.post(`${SERVER_URL}/api/files`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const msg: Message.FileMessage = response.data;
        props.callAPICurrentFolderFiles(props.currentFolder);
        e.target.value = "";
        alert(msg.COMMENT);
        return;
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("input tag change event handling error!");
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gap: "5px",
        gridTemplateColumns: `auto `.repeat(btns.length),
        width: "100%",
        height: "100%",
        backgroundColor: "inherit",
        borderRadius: "10px",
      }}
    >
      <React.Fragment>
        {btns.map((btn) => {
          return (
            <button
              className={`${classes.btn} ${
                classes[`btn_${btn.toLocaleLowerCase()}`]
              }`}
              key={btn}
              id={btn}
              onClick={btnClickHandler}
            >
              {btn}
            </button>
          );
        })}
        <input
          type="file"
          ref={fileInput}
          style={{ display: "none" }}
          onChange={inputChangeHandler}
        />
      </React.Fragment>
    </div>
  );
};

export default FileControllBox;
