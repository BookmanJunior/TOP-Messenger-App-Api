import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
// import { hashSync, genSalt } from "bcrypt";
import dbquery from "../DB/DB";
import { User } from "../Types/User";

export const user_post = [
  body("name", "Name should be between 2 and 30 characters long.")
    .trim()
    .isLength({ min: 2, max: 30 })
    .escape(),
  body("password", "Password must be at least 8 characters long.")
    .trim()
    .isLength({ min: 8 })
    .escape(),
  body("confirmPassword", "Password must be at least 8 characters long.")
    .trim()
    .isLength({ min: 8 })
    .custom((confirmPassword: string, { req }) => {
      const { password } = req.body as User;
      return confirmPassword === password;
    })
    .withMessage("Passwords don't match.")
    .escape(),
  body("username", "Username must be between 2 and 30 characters long.")
    .trim()
    .isLength({ min: 2, max: 30 })
    .bail()
    .escape()
    .custom(async (value: string) => {
      const res = await dbquery(
        "SELECT USERNAME FROM USERS WHERE USERNAME = $1",
        [value]
      );

      if (res.rows.length)
        throw new Error("Username exists. Please pick a different username.");
    }),

  async (
    req: Request<Record<string, never>, Record<string, never>, User>,
    res: Response,
    next: NextFunction
  ) => {
    const errors = validationResult(req);
    console.log("Called");

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.mapped());
    }

    try {
      const queryString = `INSERT INTO USERS (name, username, password) VALUES($1, $2, $3) RETURNING *`;
      const queryParams = [req.body.name, req.body.username, req.body.password];
      const queryRes = await dbquery(queryString, queryParams);
      res.status(200).send(queryRes);
    } catch (error) {
      next(error);
    }
  },
];
