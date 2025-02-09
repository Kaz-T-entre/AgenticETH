import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import walletRoutes from "./routes/wallet";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';

const token = jwt.sign({ userId: 123 }, process.env.JWT_SECRET!, { expiresIn: '1h' });
console.log('Generated Token:', token);
dotenv.config();

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});