import * as express from 'express';
import { ethers } from 'ethers';
import { authenticateToken } from '../middleware/auth';
import { PrivyClient, Quantity } from '@privy-io/server-auth';
import { AuthRequest } from '../middleware/auth';

const router = express.Router();

// PrivyClient の初期化（authorizationPrivateKey を設定する）
const privy = new PrivyClient(
  process.env.PRIVY_API_KEY || '',
  process.env.PRIVY_API_SECRET || '',
  {
    walletApi: {
      authorizationPrivateKey: process.env.PRIVY_AUTHORIZATION_PRIVATE_KEY || ''
    }
  }
);

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// トランザクション送信の例
router.post('/send', authenticateToken, async (req: AuthRequest, res: express.Response) => {
  try {
    const { userId } = req.user as { userId: string };
    const { to, amount } = req.body;

    // ethers.parseEther(amount) の結果（bigint）を ethers.hexlify で変換して渡す
    const tx = await privy.walletApi.ethereum.sendTransaction({
      transaction: {
        to,
        value: ("0x" + ethers.parseEther(amount).toString(16)) as unknown as Quantity
      },
      caip2: `eip155:${process.env.CHAIN_ID}`,
      walletId: userId
    });

    res.json({ transaction: tx });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Transaction failed' });
  }
});

export default router;