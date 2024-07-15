import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { User } from "../Types/User";

export const session_get = (req: Request, res: Response) => {
  if (!res.locals.user) {
    res.sendStatus(401);
  }
  res.status(200).send(res.locals.user);
};

export const session_post = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  passport.authenticate("local", (err: unknown, user: User) => {
    if (err) {
      next(err);
      return;
    }

    req.logIn(user, (err) => {
      if (err) {
        next(err);
        return;
      }
      res.sendStatus(200);
    });
  })(req, res, next);
};
