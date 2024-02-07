import {Request, Response, NextFunction} from 'express';
import {logger} from "../helpers/winstonLogger";

export const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
    logger.error(err.message || err.stack);
    res.status(500).json({error: err.stack});
};