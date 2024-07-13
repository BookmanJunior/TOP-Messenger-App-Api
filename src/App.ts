import express, {
  CookieOptions,
  NextFunction,
  Request,
  Response,
} from "express";
import logger from "morgan";
import session from "express-session";
import passport from "passport";
import { LocalStrategy } from "./Auth/LocalStrategy";
import dbquery from "./DB/DB";
import { User } from "./Types/User";

import UserRouter from "./Routes/Users";
import SessionRouter from "./Routes/Session";

const app = express();
const port = process.env.PORT || 3000;
const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
  sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "strict" : "none",
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
passport.use(LocalStrategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  const queryString = "SELECT USERNAME, NAME FROM USERS WHERE ID = $1";
  dbquery<User>(queryString, [id])
    .then((user) => {
      done(null, user.rows[0]);
    })
    .catch((err: unknown) => {
      done(err, false);
    });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.user = req.user;
  next();
});

app.use("/users", UserRouter);
app.use("/session", SessionRouter);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
