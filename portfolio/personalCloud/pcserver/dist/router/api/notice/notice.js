"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const fileTicket_1 = __importDefault(require("../../../schema/fileTicket"));
const promises_1 = __importDefault(require("fs/promises"));
const router = express_1.default.Router();
router.post(`/`, async (req, res, next) => {
    console.log(req.session.userId);
    const to = req.session.userId;
    const msg = {
        RESPONSE_CODE: "DEFAULT",
        COMMENT: "notice 불러오기 ",
        TICKETS: {},
    };
    try {
        const validFileTickets = await fileTicket_1.default
            .find({ to: to, expireDate: { $gt: Date.now() }, isRead: false })
            .sort({ madeDate: -1 });
        const fileTicket = validFileTickets.map((ticket) => {
            const ticketObject = ticket.toObject();
            const madeDate = (0, moment_timezone_1.default)(ticket.madeDate).format("YYMMDD-hh:mm:ss");
            const expireDate = (0, moment_timezone_1.default)(ticket.expireDate).format("YYMMDD-hh:mm:ss");
            return { ...ticketObject, madeDate: madeDate, expireDate: expireDate };
        });
        msg.RESPONSE_CODE = "SUCCESS";
        msg.COMMENT = msg.COMMENT + "성공";
        msg.TICKETS = fileTicket;
        res.json(msg);
    }
    catch (err) {
        console.error(err);
        msg.RESPONSE_CODE = "FAILED";
        msg.COMMENT = msg.COMMENT + "실패";
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
            await promises_1.default.copyFile(src, dest);
            await fileTicket_1.default.updateOne({ fileId: ticket.fileId }, { isRead: true });
            msg.RESPONSE_CODE = "SUCCESS";
            msg.COMMENT = msg.COMMENT + "SUCCESS";
        }
        catch (err) {
            console.error(err);
            msg.RESPONSE_CODE = "FAILED";
            msg.COMMENT = msg.COMMENT + "FAILED";
        }
        finally {
            res.json(msg);
        }
    }
    if (cmd === "delete") {
        const msg = { RESPONSE_CODE: "DEFAULT", COMMENT: "Ticket Delete " };
        try {
            await fileTicket_1.default.updateOne({ fileId: ticket.fileId }, { isRead: true });
            msg.RESPONSE_CODE = "SUCCESS";
            msg.COMMENT = msg.COMMENT + "SUCCESS";
        }
        catch (err) {
            console.error(err);
            msg.RESPONSE_CODE = "FAILED";
            msg.COMMENT = msg.COMMENT + "FAILED";
        }
        finally {
            res.json(msg);
        }
    }
});
exports.default = router;
