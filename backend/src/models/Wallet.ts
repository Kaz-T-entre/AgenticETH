import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    privateKey: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const Wallet = mongoose.model('Wallet', walletSchema); 