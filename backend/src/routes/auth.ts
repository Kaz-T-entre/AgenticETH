import express from 'express';
import crypto from 'crypto';
import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from '@simplewebauthn/server';
import { isoBase64URL } from '@simplewebauthn/server/helpers';
import type {
  AuthenticationResponseJSON,
  RegistrationResponseJSON,
} from '@simplewebauthn/typescript-types';
import { User } from '../models/User';
import { generateToken } from '../utils/auth';
import type { Request, Response } from 'express';
import type { Session } from 'express-session';

const router = express.Router();

declare module 'express-session' {
  interface SessionData {
    currentChallenge?: string;
    userId?: string;
  }
}

interface AuthRequest extends Request {
  session: Session & {
    currentChallenge?: string;
    userId?: string;
  };
}

/**
 * 「void | Promise<void>」のみ許容するハンドラ型
 * 通常の Express RequestHandler は戻り値に特に制限はありませんが、
 * あなたのプロジェクトで「必ず Promise<void> にしたい」のであればこう書きます
 */
type AuthRequestHandler = (
  req: AuthRequest,
  res: Response,
) => Promise<void>;

// WebAuthn関連の設定
const rpName = 'Magic Wallet';
const rpID = process.env.NODE_ENV === 'production' 
  ? 'your-domain.com' 
  : 'localhost';

/**
 * 1. 登録チャレンジ生成 (User Registration)
 */
const registerChallenge: AuthRequestHandler = async (req, res) => {
  try {
    const userIdBuffer = crypto.randomBytes(16);

    const options = await generateRegistrationOptions({
      rpName,
      rpID,
      userID: userIdBuffer,
      userName: 'user@example.com',
      attestationType: 'none',
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        userVerification: 'required',
        residentKey: 'preferred',
      },
    });

    req.session.currentChallenge = options.challenge;
    req.session.userId = userIdBuffer.toString('base64');
    await req.session.save();

    // res.json(...) を呼んでも return はしない
    res.json({ challenge: options.challenge });
    // 「関数を終わる」ときは戻り値を何も指定せず `return;`
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate registration challenge' });
    return; // ここでも関数を終了
  }
};

/**
 * 2. 登録の検証 (Register Verify)
 */
const registerVerify: AuthRequestHandler = async (req, res) => {
  try {
    const responseCred = req.body.credential as RegistrationResponseJSON;

    if (!req.session.currentChallenge || !req.session.userId) {
      res.status(400).json({ error: 'Session data missing' });
      return;
    }

    const verification = await verifyRegistrationResponse({
      response: responseCred,
      expectedChallenge: req.session.currentChallenge,
      expectedOrigin: `https://${rpID}`,
      expectedRPID: rpID,
    });

    const { verified, registrationInfo } = verification;
    if (!verified || !registrationInfo) {
      res.status(400).json({ error: 'Verification failed' });
      return;
    }

    const { credential: verifiedCred } = registrationInfo;
    const credentialIDBase64 = Buffer.from(verifiedCred.id).toString('base64');
    const credentialPubKeyBase64 = Buffer.from(verifiedCred.publicKey).toString('base64');

    const user = await User.create({
      id: req.session.userId,
      credentials: [
        {
          credentialID: credentialIDBase64,
          publicKey: credentialPubKeyBase64,
          counter: 0,
        },
      ],
    });

    const token = generateToken(user.id);
    res.json({ token });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration verification failed' });
    return;
  }
};

/**
 * 3. ログインチャレンジの生成 (Login Challenge)
 */
const loginChallenge: AuthRequestHandler = async (req, res) => {
  try {
    const options = await generateAuthenticationOptions({
      rpID,
      userVerification: 'required',
      allowCredentials: [],
    });

    req.session.currentChallenge = options.challenge;
    await req.session.save();

    res.json({ challenge: options.challenge });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate login challenge' });
    return;
  }
};

/**
 * 4. ログインの検証 (Login Verify)
 */
const loginVerify: AuthRequestHandler = async (req, res) => {
  try {
    const responseCred = req.body.credential as AuthenticationResponseJSON;

    const user = await User.findByCredentialID(responseCred.id);
    if (!user || !req.session.currentChallenge) {
      res.status(400).json({ error: 'Verification failed' });
      return;
    }

    const verification = await verifyAuthenticationResponse({
      response: responseCred,
      expectedChallenge: req.session.currentChallenge,
      // ここは ENV に合わせて
      expectedOrigin: process.env.ORIGIN || 'http://localhost:5173',
      expectedRPID: process.env.RPID || 'localhost',
      credential: {
        id: responseCred.id,
        publicKey: isoBase64URL.toBuffer(user.credentials[0].publicKey),
        counter: user.credentials[0].counter,
      }
    });

    if (!verification.verified) {
      res.status(400).json({ error: 'Verification failed' });
      return;
    }
    // verified = true
    res.json({ success: true, token: 'mock-token' });
    return;
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Verification failed' });
    return;
  }
};

// ルート登録
router.post('/register-challenge', registerChallenge);
router.post('/register-verify', registerVerify);
router.post('/login-challenge', loginChallenge);
router.post('/login-verify', loginVerify);

export default router;
