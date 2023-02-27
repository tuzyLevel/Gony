namespace Notice {
  interface TICKET {
    _id: string;
    fileId: string;
    fileName: string;
    filePath: string;
    expiredDate: string;
    madeDate: string;
    isRead: boolean;
    from: string;
    to: string;
  }
}
