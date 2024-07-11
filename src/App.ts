import express, { CookieOptions } from "express";
import logger from "morgan";
import session from "express-session";
import passport from "passport";

import UserRouter from "./Routes/Users";

const app = express();
const port = process.env.PORT || 3000;
const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
  sameSite: process.env.NODE_ENV === "DVELOPMENT" ? "strict" : "none",
  maxAge: 168 * 60 * 60 * 1000,
};

if (!process.env.COOKIE_SECRET) {
  throw Error("Forgot to set cookie's secret");
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: cookieOptions,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", UserRouter);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
