namespace Files {
  interface ExtendedDirectoryNode {
    name: string;
    path: string;
    childrenFolder: DirectoryNode[];
    level: number;
    clicked: boolean;
  }

  interface ExtendedFileNode {
    name: string;
    path: string;
    type: "file" | "directory";
    volume: number;
    clicked: boolean;
  }
}
