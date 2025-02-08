import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import authRoutes from "./routes/auth";
import walletRoutes from "./routes/wallet";

// テスト用: JWT_SECRET を使ってトークンを生成（開発中のみ利用してください）
const token = jwt.sign({ userId: 123 }, process.env.JWT_SECRET!, { expiresIn: '1h' });
console.log("Generated Token:", token);

const app = express();
const PORT = process.env.PORT || 3001;

// ミドルウェアの設定
app.use(cors());
app.use(express.json());

// ルートの設定
app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);

app.get("/", (req, res) => {
  res.send("Agentic Backend is running.");
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 