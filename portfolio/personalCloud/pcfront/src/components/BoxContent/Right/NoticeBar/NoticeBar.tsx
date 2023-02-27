import React, { SyntheticEvent } from "react";
import axios from "axios";

import Button from "../../../Button/Button";

import classes from "./NoticeBar.module.css";
import { SERVER_URL } from "../../../../config";

interface NoticeBarProps extends React.PropsWithChildren {
  ticket: Notice.TICKET;
  currentFolder: string;
  ticketsHandler: (fileId: string) => void;
}

const ticketClickHandler = async (
  type: string,
  ticket: Notice.TICKET,
  currentFolder?: string
) => {
  const data: { ticket: Notice.TICKET; currentFolder?: string } = { ticket };
  if (currentFolder) data.currentFolder = currentFolder;

  try {
    const response = await axios.post(
      `${SERVER_URL}/api/notice/${type}`,
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const NoticeBar = (props: NoticeBarProps) => {
  const ticket = props.ticket;

  const ticketConfirmationClickHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const msg = await ticketClickHandler(
        "confirm",
        ticket,
        props.currentFolder
      );

      alert(msg.COMMENT);
    } catch (err) {
      console.error(err);
    } finally {
      props.ticketsHandler(ticket.fileId);
    }
  };

  const ticketDeleteClickHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const msg = await ticketClickHandler("delete", ticket);
      alert(msg.COMMENT);
    } catch (err) {
      console.error(err);
    } finally {
      props.ticketsHandler(ticket.fileId);
    }
  };

  return (
    <div className={classes.noticeBar_container}>
      <div>
        <div>{`from : ${ticket.from}`}</div>
        <div>
          {ticket.fileName.length < 20
            ? `filename : ${ticket.fileName}`
            : `filename: ${ticket.fileName.substring(0, 20)}......`}
        </div>
        <div>{`expire: ${ticket.madeDate}`}</div>
      </div>
      <div>
        <Button
          buttonName="받기"
          className={`btn btn_confirmation sm mg-sm`}
          onClick={ticketConfirmationClickHandler}
        />
        <Button
          buttonName="삭제"
          className={`btn btn_cancel sm`}
          onClick={ticketDeleteClickHandler}
        />
      </div>
    </div>
  );
};

export default NoticeBar;
