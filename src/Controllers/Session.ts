import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { User } from "../Types/User";

export const session_post = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  passport.authenticate("local", (err: unknown, user: User) => {
    console.log(user);
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
