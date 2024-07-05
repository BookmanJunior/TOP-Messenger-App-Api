import express from "express";
import logger from "morgan";

const app = express();
const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  return res.status(200).send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
