import express, { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);

  if (err.message === "Need Login") {
    return res.status(500).send("Need Login");
  }
};
