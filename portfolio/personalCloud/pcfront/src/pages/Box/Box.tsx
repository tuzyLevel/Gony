import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
  SyntheticEvent,
  useMemo,
} from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Card from "../../components/Card/Card";
import { SERVER_URL } from "../../config";
import { RootState } from "../../store/store";
import { sessionCheck } from "../../utils/sessionCheck";

import { login } from "../../store/features/loginSlice";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import BoxModal from "../../components/Modal/Box/Modal";
import {
  renameModalOpen,
  sendModalOpen,
} from "../../store/features/boxModalSlice";
import Title from "../../components/Title/Title";
import Directories from "../../components/BoxContent/Left/Directories";
import FilesNFolders from "../../components/BoxContent/Right/FilesNFolders";
import FileControllBox from "../../components/BoxContent/Right/FileControllBox";

import { getSocket } from "../../utils/socket";
import ModalPortal from "../../components/Portal/ModalPortal";

import classes from "./Box.module.css";
import Notice from "../../components/BoxContent/Right/Notice";

library.add(fas);

const modalBtns: ModalBtns = {
  Rename: {
    category: "rename",
    clickHandler: async (data: Object) => {
      return axios.post(`${SERVER_URL}/api/files/rename`, data, {
        withCredentials: true,
      });
    },
  },
  Send: {
    category: "send",
    clickHandler: async (data: Object) => {
      const id = "";
      console.log(`Send button Clicked!`);
      return axios.post(`${SERVER_URL}/api/files/send/${id}`, data, {
        withCredentials: true,
      });
    },
  },
};

const modalFormInfo: ModalInfo[] = [
  {
    modalName: "rename",
    contents: ["Now", "Change"],
    ko: { Now: "현재 파일명", Change: "변경할 파일명" },
  },
  { modalName: "send", contents: ["To"], ko: { To: "받을 사람" } },
];

const menues: Menu[] = [
  { title: "Notice", to: "/box" },
  { title: "Logout", to: "/logout" },
];

let socket;

const Box = () => {
  // const navigate = useNavigate();

  const [reRenderTrigger, setReRenderTrigger] = useState<boolean>(false);

  const loginId = useSelector((state: RootState) => state.loginChecker.userId);

  const modalState = useSelector(
    (state: RootState) => state.boxModalOpenChecker.modalState
  );

  const [rightContent, setRightContent] = useState<string>("box");

  const [newNotice, setNewNotice] = useState<boolean>(false);

  const [folderList, setFolderList] = useState<Files.ExtendedDirectoryNode[]>(
    []
  );

  const [currentFolder, setCurrentFolder] = useState<string>(`logout`);
  const [currentFolderFiles, setCurrentFolderFiles] = useState<
    Files.ExtendedFileNode[]
  >([]);

  const [moveFileIndex, setMoveFileIndex] = useState<number>(-1);
  const [movedInFolderIndex, setMovedInFolderIndex] = useState<number>(-1);

  const [modalFileIndex, setModalFileIndex] = useState<number>(-1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fileReceiveNoticeHandler = () => {
    setNewNotice(true);
  };

  const renderNoticeOnRightContent = () => {
    setRightContent((prev) => "notice");
  };

  const renderBoxOnRightContent = () => {
    setRightContent((prev) => "box");
  };

  const fileBtnsClickHandler = async (e: SyntheticEvent) => {
    e.stopPropagation();
    const currentTarget = e.currentTarget;
    const fileIdx =
      +(currentTarget.parentElement!.parentElement!.parentElement!.getAttribute(
        "data-index"
      ) as string);
    setModalFileIndex((prev) => fileIdx);
    const file = currentFolderFiles[fileIdx];
    // const data = { currentFilePath: file.path, changeFilePath: "" };
    if (currentTarget.textContent === "Rename") {
      dispatch(renameModalOpen());
      return;
    }

    if (currentTarget.textContent === "Send") {
      dispatch(sendModalOpen());
      return;
    }

    if (currentTarget.textContent === "Del") {
      if (
        window.confirm(
          `정말로 ${file.name} ${
            file.type === "file" ? "파일을" : "폴더를"
          } 삭제 하시겠습니까?`
        ) === true
      ) {
        try {
          const response = await axios.post(
            `${SERVER_URL}/api/files/delete`,
            { path: file.path },
            { withCredentials: true }
          );
          const msg: Message.FileMessage = response.data;
          alert(msg.COMMENT);
        } catch (err) {
          console.error(err);
        }
        callAPICurrentFolderFiles(currentFolder);
        return;
      }
    }
  };

  const getFolderList = useCallback(async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/directories/directories`,
        {},
        { withCredentials: true }
      );
      const msg: Message.FolderListMessage = response.data;
      if (msg.RESPONSE_CODE === "SUCCESS") {
        const data = msg.data;
        const directory = data.map((folder) => {
          if (folder.path === currentFolder) {
            return { ...folder, clicked: true };
          }
          return { ...folder, clicked: false };
        });
        return directory;
      }
    } catch (err) {
      console.error(err);
    }

    return [];
  }, [currentFolder]);

  const directoryHandler = useCallback(
    async (folderPath: string) => {
      setCurrentFolder((prev) => folderPath);
      const newDirectory = (await getFolderList()).map((folder) => {
        if (folder.path === folderPath) return { ...folder, clicked: true };
        else return { ...folder, clicked: false };
      });
      setFolderList((prev) => newDirectory);
    },
    [getFolderList]
  );

  const callAPICurrentFolderFiles = useCallback(
    async (folder: string) => {
      //initial value
      console.log(`folder : ${folder}, loginId : ${loginId}`);
      if (folder === "/logout" || folder === "logout") return;
      if (loginId === "/logout" || loginId === "logout") return;

      const response = await axios.post(
        `${SERVER_URL}/api/files/currentFolder`,
        { folder: folder },
        { withCredentials: true }
      );

      const msg = response.data;
      if (msg.RESPONSE_CODE === "SUCCESS") {
        let data: Message.FileNode[] = msg.data;
        if (currentFolder !== loginId) {
          const upperFolder: Message.FileNode = {
            name: "..",
            path: currentFolder.substring(0, currentFolder.lastIndexOf("/")),
            type: "directory",
            volume: 0,
          };
          data.unshift(upperFolder);
        }
        const fileData: Files.ExtendedFileNode[] = [];
        for (const file of data) {
          const newFile: Files.ExtendedFileNode = {
            ...file,
            clicked: false,
          };
          fileData.push(newFile);
        }
        setCurrentFolderFiles(fileData);

        return;
      }
      console.log(response);
    },
    [currentFolder, loginId]
  );

  const moveFileOtherFolder = useCallback(async () => {
    const file = currentFolderFiles[moveFileIndex];
    if (file.name === "..") return;

    const destFolder = currentFolderFiles[movedInFolderIndex];
    if (destFolder.type === "file") return;

    try {
      const data = await axios.post(
        `${SERVER_URL}/api/files/move`,
        {
          filePath: file.path,
          destFolderPath: destFolder.path,
        },
        { withCredentials: true }
      );
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }, [moveFileIndex, currentFolderFiles, movedInFolderIndex]);

  const newNoticeOffHandler = () => {
    setNewNotice(false);
  };

  useEffect(() => {
    sessionCheck().then(async (res) => {
      const data = res.data;
      let { userId } = JSON.parse(data);
      if (!userId) {
        userId = "logout";
        dispatch(login(userId));
        navigate("/");
      } else {
        dispatch(login(userId));
        setFolderList(await getFolderList());
      }
    });
  }, [dispatch, navigate, getFolderList]);

  useEffect(() => {
    if (loginId === "logout") return;
    setCurrentFolder(() => loginId);
    socket = getSocket("notice", loginId, {
      fileReceiveNoticeHandler: fileReceiveNoticeHandler,
    });
  }, [loginId]);

  useEffect(() => {
    callAPICurrentFolderFiles(currentFolder);
  }, [currentFolder, callAPICurrentFolderFiles]);

  useEffect(() => {
    if (movedInFolderIndex === -1) return;

    moveFileOtherFolder();
    setReRenderTrigger(true);
    setMovedInFolderIndex(() => -1);
  }, [
    currentFolder,
    movedInFolderIndex,
    moveFileOtherFolder,
    getFolderList,
    callAPICurrentFolderFiles,
  ]);

  useEffect(() => {
    if (reRenderTrigger === false) return;
    directoryHandler(currentFolder);
    callAPICurrentFolderFiles(currentFolder);
    setReRenderTrigger(false);
  }, [
    reRenderTrigger,
    currentFolder,
    directoryHandler,
    callAPICurrentFolderFiles,
  ]);

  return (
    <Fragment>
      {/* box-container */}
      <Card
        style={{
          width: "100%",
          minWidth: "1000px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* navbar-container */}
        <Card
          style={{
            width: "80%",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          <Navbar
            menues={menues}
            newNotice={newNotice}
            renderNoticeOnRightContent={renderNoticeOnRightContent}
            renderBoxOnRightContent={renderBoxOnRightContent}
            newNoticeOffHandler={newNoticeOffHandler}
          />
        </Card>

        {/* content-container */}
        <Card
          style={{
            width: "80%",
            height: "60%",
            borderRadius: "10px",
            backgroundColor: "beige",
            display: "grid",
            gridTemplateRows: "1fr 12fr 1fr",
            gridTemplateColumns: "1fr 3fr",
            gap: "10px",
            padding: "10px",
            boxSizing: "border-box",
            flex: 1,
          }}
        >
          {/* Left Title */}

          <Title
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "10px",
              backgroundColor: "black",
              color: "white",
              fontSize: "1.2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span>Directory</span>
          </Title>
          {/* Right Title */}
          <Title
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "10px",
              backgroundColor: "black",
              color: "white",
              fontSize: "1.2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {rightContent === "box" ? (
              <span>File & Folder</span>
            ) : (
              <span>Notice</span>
            )}
          </Title>

          {/* Left Box Content - Directory Trees */}
          <Directories
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "10px",
              backgroundColor: "black",
              color: "white",
              overflow: "auto",
              gridRow: "span 2",
            }}
            folderList={folderList}
            directoryHandler={directoryHandler}
          />
          {/* Right Box Content - Files & Folders */}
          {/* <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
            }}
          > */}
          {rightContent === "box" ? (
            <div
              className={`${classes.box_right_content_container} ${classes.box_right_content_box_container}`}
            >
              <FilesNFolders
                currentFolderFiles={currentFolderFiles}
                directoryHandler={directoryHandler}
                setCurrentFolderFiles={setCurrentFolderFiles}
                callAPICurrentFolderFiles={callAPICurrentFolderFiles}
                setMoveFileIndex={setMoveFileIndex}
                setMovedInFolderIndex={setMovedInFolderIndex}
                fileBtnsClickHandler={fileBtnsClickHandler}
              />
            </div>
          ) : (
            <div
              className={`${classes.box_right_content_container} ${classes.box_right_content_notice_container}`}
            >
              <Notice currentFolder={currentFolder} />
            </div>
          )}
          {/* {rightContent === "box" ? (
               : (
              
            )} */}
          {/* </div> */}
          <div className={classes.box_right_controllbox_container}>
            <FileControllBox
              currentFolder={currentFolder}
              currentFolderFiles={currentFolderFiles}
              callAPICurrentFolderFiles={callAPICurrentFolderFiles}
            />
          </div>
        </Card>
      </Card>
      <ModalPortal>
        {modalState.isOpen && (
          <BoxModal
            modalFormInfo={modalFormInfo}
            btns={modalBtns}
            currentFolderFiles={currentFolderFiles}
            modalFileIndex={modalFileIndex}
            currentFolder={currentFolder}
            getFolderList={getFolderList}
            callAPICurrentFolderFiles={callAPICurrentFolderFiles}
            directoryHandler={directoryHandler}
          />
        )}
      </ModalPortal>
    </Fragment>
  );
};

export default Box;
