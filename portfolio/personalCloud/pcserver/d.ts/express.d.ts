import MongoStore from "connect-mongo";

declare namespace Express {
  export interface Request {
    mongoSessionStore?: MongoStore;
  }
}
