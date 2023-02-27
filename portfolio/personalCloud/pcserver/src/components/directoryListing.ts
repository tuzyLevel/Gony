import fs from "fs/promises";
import path from "path";

class DirectoryNode implements Message.DirectoryNode {
  name: string;
  path: string;
  childrenFolder: DirectoryNode[];
  level: number;
  constructor(name: string, path: string, level: number) {
    this.name = name;
    this.path = path;
    this.childrenFolder = [];
    this.level = level;
  }
}

// interface DirectoryNode {
//   name: string;
//   belows: DirectoryNode[];
//   level: number;
// }

export const getPrivateDirectoryTree = async (
  path: string,
  loginId: string
) => {
  const result: DirectoryNode[] = [];
  const stack: DirectoryNode[] = [];
  const preFix = path.substring(0, path.lastIndexOf("/")); // .../users
  const postFix = path.substring(path.lastIndexOf("/") + 1); // /${loginId}

  const tree: DirectoryNode = new DirectoryNode(postFix, postFix, 0);
  //   const childrenFolder = (
  //     await fs.readdir(path, { withFileTypes: true })
  //   ).filter((element) => element.isDirectory());

  //   for (const folder of childrenFolder) {
  //     const path = tree.path + folder.name;
  //     tree.childrenFolder.push(
  //       new DirectoryNode(folder.name, path, tree.level + 1)
  //     );
  //   }
  stack.push(tree);
  result.push(tree);

  while (stack.length > 0) {
    const currentNode = stack.pop() as DirectoryNode;
    const childrenFolders = (
      await fs.readdir(`${preFix}/${currentNode.path}`, {
        withFileTypes: true,
      })
    ).filter((element) => element.isDirectory());

    for (const dirent of childrenFolders) {
      const newNode = new DirectoryNode(
        dirent.name,
        `${currentNode.path}/${dirent.name}`,
        currentNode.level + 1
      );
      currentNode.childrenFolder.push(newNode);
      result.push(newNode);
      stack.push(newNode);
    }
  }

  return result.sort((a, b) => {
    if (a.path < b.path) return -1;
    else if (a.path > b.path) return 1;
    else return 0;
  });

  //   while (stack.length > 0) {
  //     const currentNode = stack.pop() as DirectoryNode;

  //     const childrenFolderNames = (
  //       await fs.readdir(`${preFix}/${currentNode.path}`, { withFileTypes: true })
  //     ).filter((element) => element.isDirectory());

  //     for (const dirent of childrenFolderNames) {
  //       const newNode = new DirectoryNode(
  //         dirent.name,
  //         `${currentNode.path}/${dirent.name}`,
  //         currentNode.level + 1
  //       );
  //       currentNode.childrenFolder.push(newNode);
  //       stack.push(newNode);
  //     }
  //   }

  //   while (stack.length > 0) {
  //     const currentNode = stack.pop() as DirectoryNode;
  //     for (const childNode of currentNode.childrenFolder) {
  //       const childrenFolder = (
  //         await fs.readdir(`${currentNode.path}/${childNode.name}`, {
  //           withFileTypes: true,
  //         })
  //       ).filter((element) => element.isDirectory());

  //       for (const folder of childrenFolder) {
  //         const path = currentNode.path + folder.name;
  //         const newFolderNode = new DirectoryNode(
  //           folder.name,
  //           path,
  //           currentNode.level + 1
  //         );
  //         currentNode.childrenFolder.push(newFolderNode);
  //         stack.push(newFolderNode);
  //       }
  //     }
  //   }
};

export const getCurrentDirectoryFiles = async (path: string) => {
  const response = await fs.readdir(path, { withFileTypes: true });
  const directories = response.filter((element) => element.isDirectory());
  console.log(directories);
};
