import express from "express";
import moment from "moment-timezone";

import fileTicketSchema from "../../../schema/fileTicket";

import fs from "fs/promises";

const router = express.Router();

router.get(`/`, async (req, res, next) => {
  console.log(req.session.userId);
  const to = req.session.userId;

  const msg = {
    RESPONSE_CODE: "DEFAULT",
    COMMENT: "notice 불러오기 ",
    TICKETS: {},
  };

  try {
    const validFileTickets = await fileTicketSchema
      .find({ to: to, expireDate: { $gt: Date.now() }, isRead: false })
      .sort({ madeDate: -1 });

    const fileTicket = validFileTickets.map((ticket) => {
      const ticketObject = ticket.toObject();
      const madeDate = moment(ticket.madeDate)
        .add(9, "h")
        .format("YYMMDD-HH:mm:ss");
      const expireDate = moment(ticket.expireDate)
        .add(9, "h")
        .format("YYMMDD-HH:mm:ss");
      return { ...ticketObject, madeDate: madeDate, expireDate: expireDate };
    });

    msg.RESPONSE_CODE = "SUCCESS";
    msg.COMMENT = msg.COMMENT + "성공";
    msg.TICKETS = fileTicket;
  } catch (err) {
    console.error(err);
    msg.RESPONSE_CODE = "FAILED";
    msg.COMMENT = msg.COMMENT + "실패";
  } finally {
    res.json(msg);
  }
});

router.post(`/:cmd`, async (req, res, next) => {
  const cmd = req.params.cmd;
  const { ticket, currentFolder } = req.body;
  const src = `${process.env.PWD}/users/${ticket.filePath}`;

  if (cmd === "confirm") {
    const dest = `${process.env.PWD}/users/${currentFolder}/${ticket.fileName}`;
    const msg = { RESPONSE_CODE: "DEFAULT", COMMENT: "Ticket File Download " };
    try {
      await fs.copyFile(src, dest);
      await fileTicketSchema.updateOne(
        { fileId: ticket.fileId },
        { isRead: true }
      );
      msg.RESPONSE_CODE = "SUCCESS";
      msg.COMMENT = msg.COMMENT + "SUCCESS";
    } catch (err) {
      console.error(err);
      msg.RESPONSE_CODE = "FAILED";
      msg.COMMENT = msg.COMMENT + "FAILED";
    } finally {
      res.json(msg);
    }
  }

  if (cmd === "delete") {
    const msg = { RESPONSE_CODE: "DEFAULT", COMMENT: "Ticket Delete " };
    try {
      await fileTicketSchema.updateOne(
        { fileId: ticket.fileId },
        { isRead: true }
      );
      msg.RESPONSE_CODE = "SUCCESS";
      msg.COMMENT = msg.COMMENT + "SUCCESS";
    } catch (err) {
      console.error(err);
      msg.RESPONSE_CODE = "FAILED";
      msg.COMMENT = msg.COMMENT + "FAILED";
    } finally {
      res.json(msg);
    }
  }
});

export default router;
