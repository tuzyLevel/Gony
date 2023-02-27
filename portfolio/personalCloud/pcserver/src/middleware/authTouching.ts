import { Request, Response, NextFunction } from "express";

const authTouching = (req: Request, res: Response, next: NextFunction) => {
  console.log(`raw check ${req.session}`);
  if (req.session) {
    req.session.touch();
    console.log(`session touched! ${req.session.userId}`);
  }

  next();
};

export default authTouching;
