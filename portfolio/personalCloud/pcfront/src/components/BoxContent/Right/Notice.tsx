import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

import Button from "../../Button/Button";

import { SERVER_URL } from "../../../config";
import NoticeBar from "./NoticeBar/NoticeBar";

interface NoticeProps extends React.PropsWithChildren {
  currentFolder: string;
}

const Notice = (props: NoticeProps) => {
  // const [newNotice, setNewNotice] = useState<boolean>(true);
  const [tickets, setTickets] = useState(Array<Notice.TICKET>());

  const getFileTickets = useCallback(async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/notice`, {
        withCredentials: true,
      });
      const { RESPONSE_CODE, COMMENT, TICKETS } = response.data;
      if (RESPONSE_CODE === "SUCCESS") {
        setTickets(TICKETS);
        return;
      }

      if (RESPONSE_CODE === "FAILED") {
        alert(COMMENT);
        return;
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const ticketsHandler = (fileId: string) => {
    setTickets((prev) => prev.filter((ticket) => ticket.fileId !== fileId));
  };

  useEffect(() => {
    getFileTickets();
  }, [getFileTickets]);

  return (
    <React.Fragment>
      {tickets.map((ticket: Notice.TICKET) => (
        <NoticeBar
          key={ticket.fileId}
          ticket={ticket}
          ticketsHandler={ticketsHandler}
          currentFolder={props.currentFolder}
        />
      ))}
    </React.Fragment>
  );
};

export default Notice;
