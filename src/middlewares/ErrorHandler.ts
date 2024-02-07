import { Request, Response, NextFunction } from 'express';

export const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
    res.status(500).json({ error: err.stack });
};