import { Strategy } from "passport-local";
import dbquery from "../DB/DB";
import bcrypt from "bcrypt";
import { User } from "../Types/User";

export const LocalStrategy = new Strategy(
  (username: string, password: string, done) => {
    const queryString = `SELECT * FROM USERS WHERE USERNAME = $1`;
    const queryParams = [username.toLowerCase()];
    dbquery<User>(queryString, queryParams)
      .then(async (user) => {
        if (!user.rows.length)
          throw new Error("username or password not found.");

        const doPasswordsMatch = await bcrypt.compare(
          password,
          user.rows[0].password
        );

        if (!doPasswordsMatch)
          throw new Error("username or password not found.");

        done(null, user.rows[0]);
      })
      .catch((error: unknown) => {
        done(error, false);
      });
  }
);
