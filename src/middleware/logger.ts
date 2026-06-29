import type { NextFunction, Request, Response } from "express";
import fs from "fs"

const logger =(req:Request, res:Response, next:NextFunction) => {
  console.log('Method-URL-Time:',req.method,req.url, Date.now());
 const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\n`;

fs.appendFile("logger.txt", log, (err) => {
  if (err) {
    console.error(err);
  }
});
  next();
}

export default logger