import { Request, Response, NextFunction } from "express";

export const isAuthorized = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.user) {
    return res.sendStatus(401);
  }
  next();
};
