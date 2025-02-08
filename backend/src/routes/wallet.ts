import { Router, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRET_KEY || "your-secret-key";

const router = Router();

// ダミーウォレットデータ
const walletData = {
  walletId: "wallet_123456",
  address: "0xABCDEF1234567890ABCDEF1234567890ABCDEF12",
  balance: "1000",
  balanceUSD: "1000"
};

// GET /api/wallet/info
router.get("/info", (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ success: false, message: "No token provided" });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, secretKey);
    // ダミーのウォレット情報
    const wallet = {
      walletId: "wallet-1234",
      address: "0xABCDEF0123456789",
      balance: "1.234 ETH",
    };
    res.json({ success: true, wallet });
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
});

// POST /api/wallet/send
router.post("/send", (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ success: false, message: "No token provided" });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, secretKey);
    const { to, amount } = req.body;
    // ここで実際の送金処理を行う (今回はダミー実装)
    const txHash = "0xMOCKTRANSACTIONHASH";
    res.json({ success: true, txHash });
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
});

// GET /api/wallet/history
router.get("/history", (req: Request, res: Response) => {
  // ダミーのトランザクション履歴
  const history = [
    { txHash: "0x1234abcd", to: "0x1111111111111111111111111111111111111111", amount: "50", date: new Date() },
    { txHash: "0x5678efgh", to: "0x2222222222222222222222222222222222222222", amount: "75", date: new Date() }
  ];
  res.json({ history });
});

export default router;