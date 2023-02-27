namespace Message {
  interface Message {
    RESPONSE_CODE: ResponseCode;
    COMMENT: string;
  }

  type ResponseCode =
    | "USER_EXIST"
    | "REGIST_DONE"
    | "REGIST_ERROR"
    | "NO_USER"
    | "LOGIN_SUCCESS"
    | "PASSWORD_INCONSISTENCY"
    | "LOGIN_ERROR"
    | "DEFAULT"
    | "LOGOUT_SUCCESS"
    | "LOGOUT_FAILED";

  interface FolderListMessage extends Message {
    RESPONSE_CODE: FolderListMessageResponseCode;
    data: DirectoryNode[];
  }

  interface CurrentFolderFilesMessage extends Message {
    RESPONSE_CODE: ShortResponseCode;
    data: FileNode[];
  }

  interface FileMessage extends Message {
    RESPONSE_CODE: ShortResponseCode;
  }

  type ShortResponseCode = "SUCCESS" | "FAILED" | "DEFAULT";
  type FolderListMessageResponseCode = ShortResponseCode;

  declare interface DirectoryNode {
    name: string;
    path: string;
    childrenFolder: DirectoryNode[];
    level: number;
  }

  declare interface FileNode {
    name: string;
    path: string;
    type: "file" | "directory";
    volume: number;
  }
}
