import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth';
import MongoStore from 'connect-mongo';
import walletRoutes from './routes/wallet';

dotenv.config();

const app = express();

// CORSの設定
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://your-domain.com'
        : 'http://localhost:3000',
    credentials: true
}));

// ミドルウェアの設定
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'default-secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/magic-wallet',
        ttl: 24 * 60 * 60 // 1日
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 24時間
    }
}));

// MongoDBの接続
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/magic-wallet')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// ルートの設定
app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 