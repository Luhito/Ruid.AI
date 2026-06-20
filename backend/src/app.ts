import express from "express";

const app = express();

app.get("/hello", (_, res) => {
  res.json({
    message: "Hello World",
  });
});

app.listen(3000, () => {
  console.log("Server started");
});