import express from "express";
import questionRouter from "./routes/questionRouter.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "node:url";
import SwaggerParser from "@apidevtools/swagger-parser";
import { createError } from "./shared-components/error.js"

/** サーバー起動処理 */
let label = 0;

// Expressインスタンス作成
const app = express();

try {
  // CORSの設定
  app.use(cors({
    // origin: "http://localhost:5173"  //ローカル開発用設定
    origin: true  //開発用設定
  }))

  // サーバー生存確認用
  app.get("/", (_, res) => {
    res.json({
      message: "THIS IS RUID.AI SERVER.",
    });
  });

  // Swagger提供用：openapi.yaml読み込み
  const openApiPath = fileURLToPath(
    new URL("../../documents/openapi/openapi.yaml", import.meta.url)
  );
  const openApiDocument = await SwaggerParser.bundle(openApiPath);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(openApiDocument)
  );

  // 以降、アプリ用
  app.use("/question", questionRouter)  //問題取得用
}
catch(e) {
  createError("サーバーの起動処理で例外が発生しました", label, e)
}

export default app;