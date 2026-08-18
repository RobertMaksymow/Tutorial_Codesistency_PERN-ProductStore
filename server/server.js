import express from "express";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World from the ROOT route!");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
