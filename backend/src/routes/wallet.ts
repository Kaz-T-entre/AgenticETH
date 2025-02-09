import { Router, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';

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

// 環境変数からキーを取得（もしくはデフォルト値）
const PRIVY_API_KEY = process.env.PRIVY_API_KEY || "cm6t6svwm063qgvcrv656hbxp";
const PRIVY_SECRET_KEY = process.env.PRIVY_SECRET_KEY || "3pdxCWYaKLmA9TQc6so6WVkBwxueQ1Q3hsteJN2nC7cyPsxTGKYgDgy3Qc3y3Bm8WMQKFqEaPPRNQAgEiigb2vo7";

const getAuthSignature = (data: string): string => {
  // 実際には Privy の仕様に則った署名生成処理を書く必要がありますが、
  // ここではダミー署名として "dummy-signature" を返します。
  return "dummy-signature";
};

router.post("/", async (req, res) => {
  try {
    const payload = { chain_type: "ethereum" };
    const jsonPayload = JSON.stringify(payload);
    const authSignature = getAuthSignature(jsonPayload);

    const response = await axios.post("https://api.privy.io/v1/wallets", payload, {
      auth: {
        username: PRIVY_API_KEY,
        password: PRIVY_SECRET_KEY,
      },
      headers: {
        "privy-app-id": PRIVY_API_KEY,
        "privy-authorization-signature": authSignature,
        "Content-Type": "application/json",
      },
    });
    console.log("Wallet created (backend):", response.data);
    res.json({ success: true, data: response.data });
  } catch (error: any) {
    console.error("Wallet creation error (backend):", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;