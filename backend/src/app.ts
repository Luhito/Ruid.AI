import express from "express";
import questionRouter from "./routes/questionRouter.js";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}))

app.get("/", (_, res) => {
  res.json({
    message: "this is a Ruid.AI server.",
  });
});

app.use("/question", questionRouter)

export default app;