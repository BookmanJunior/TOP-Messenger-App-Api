import express from "express";
import logger from "morgan";

import UserRouter from "./Routes/Users";

const app = express();
const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", UserRouter);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
