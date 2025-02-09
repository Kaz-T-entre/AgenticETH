import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY || "your-secret-key"; // 環境変数から取得、存在しない場合はデフォルト値

const router = Router();

// Base64 URLエンコード関数
function toBase64Url(buffer: ArrayBuffer): string {
  const uint8Array = new Uint8Array(buffer);
  let str = "";
  uint8Array.forEach(byte => str += String.fromCharCode(byte));
  // traditional base64
  let base64 = Buffer.from(str, "binary").toString("base64");
  // make URL safe
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// POST /api/auth/register-challenge
router.post("/register-challenge", (req: Request, res: Response) => {
  try {
    const dummyChallenge = "dummy-challenge";
    const challengeBuffer = new TextEncoder().encode(dummyChallenge).buffer;
    const challengeBase64 = toBase64Url(challengeBuffer);

    const publicKeyCredentialCreationOptions = {
      challenge: challengeBase64,
      rp: {
        name: "Agentic",
        id: "localhost"
      },
      user: {
        // If your backend expects an email or user info, make sure these values are received correctly.
        id: toBase64Url(new TextEncoder().encode("dummy-user-id").buffer),
        name: "user@example.com",
        displayName: "User Example"
      },
      pubKeyCredParams: [{ type: "public-key", alg: -7 }],
      timeout: 60000,
      attestation: "direct"
    };

    res.json({ publicKeyCredentialCreationOptions });
  } catch (error) {
    console.error("Error in register-challenge:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// POST /api/auth/register-verify
router.post("/register-verify", (req: Request, res: Response) => {
  // 本来は req.body.credential の検証を行いますが、ここではダミー実装
  const token = jwt.sign({ user: "dummy-user" }, secretKey, { expiresIn: "1h" });
  res.json({ success: true, token });
});

// POST /api/auth/login-challenge
router.post("/login-challenge", (req: Request, res: Response) => {
  // WebAuthn ログイン用のチャレンジ（ダミーデータ）
  const publicKeyCredentialRequestOptions = {
    challenge: "dummy-challenge",
    timeout: 60000,
    rpId: "localhost",
    allowCredentials: [{ id: "dummy-credential-id", type: "public-key" }],
    userVerification: "preferred"
  };

  res.json({ publicKeyCredentialRequestOptions });
});

// POST /api/auth/login-verify
router.post("/login-verify", (req: Request, res: Response) => {
  // 本来は req.body.credential の検証を行いますが、ここではダミー実装
  const token = jwt.sign({ user: "dummy-user" }, secretKey, { expiresIn: "1h" });
  res.json({ success: true, token });
});

// GET /api/auth/verify
router.get("/verify", (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ success: false, message: "No token provided" });
    return;
  }
  
  const token = authHeader.split(" ")[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ success: false, message: "Invalid token" });
    res.json({ success: true, user: decoded });
  });
});

export default router;