import axios from "axios";
import { 
  AuthResponse, 
  WalletInfo, 
  Transaction, 
  TransactionResponse 
} from "../types";

// 環境変数から API のベース URL を設定（Vite では import.meta.env を使用）
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authApi = {
  // WebAuthn Registration
  registerChallenge: async () => {
    const { data } = await api.post<AuthResponse>("/auth/register-challenge");
    return data;
  },

  registerVerify: async (credential: any) => {
    const { data } = await api.post<AuthResponse>("/auth/register-verify", { credential });
    return data;
  },

  // WebAuthn Login
  loginChallenge: async () => {
    const { data } = await api.post<AuthResponse>("/auth/login-challenge");
    return data;
  },

  loginVerify: async (credential: any) => {
    const { data } = await api.post<AuthResponse>("/auth/login-verify", { credential });
    return data;
  },

  // Token verification
  verifyToken: async () => {
    const { data } = await api.get<AuthResponse>("/auth/verify");
    return data;
  },
};

// Wallet API
export const walletApi = {
  // Get wallet information
  getInfo: async () => {
    const { data } = await api.get<{ wallet: WalletInfo }>("/wallet/info");
    return data.wallet;
  },

  // Send transaction
  sendTransaction: async (transaction: Transaction) => {
    const { data } = await api.post<TransactionResponse>("/wallet/send", transaction);
    return data;
  },

  // Get transaction history
  getHistory: async () => {
    const { data } = await api.get("/wallet/history");
    return data;
  },
};

// Error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 401エラーの場合は、トークンを削除しトップページへリダイレクト
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;