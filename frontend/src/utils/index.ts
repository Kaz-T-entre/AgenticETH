import { WalletInfo, Transaction } from "../types";

// Format wallet address to display format (0x123...abc)
export const formatAddress = (address: string): string => {
  if (!address) return "...";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Format balance to USD with commas and decimals
export const formatUSD = (amount: string | number): string => {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
};

// Format crypto amount with specified decimals
export const formatCrypto = (amount: string | number, decimals: number = 4): string => {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return num.toFixed(decimals);
};

// Validate transaction parameters
export const validateTransaction = (tx: Transaction): string | null => {
  if (!tx.to || !tx.to.match(/^0x[a-fA-F0-9]{40}$/)) {
    return "Invalid recipient address";
  }
  
  const amount = parseFloat(tx.amount);
  if (isNaN(amount) || amount <= 0) {
    return "Invalid amount";
  }
  
  return null;
};

// Parse and handle API errors
export const parseError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return "An unknown error occurred";
};

// Check if WebAuthn is supported
export const isWebAuthnSupported = (): boolean => {
  return window.PublicKeyCredential !== undefined &&
    typeof window.PublicKeyCredential === "function";
};

// Decode WebAuthn binary data
export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let string = "";
  for (const byte of bytes) {
    string += String.fromCharCode(byte);
  }
  return btoa(string);
};

// Convert base64 to array buffer
export const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

// Local storage helpers
export const storage = {
  setToken: (token: string) => localStorage.setItem("token", token),
  getToken: () => localStorage.getItem("token"),
  removeToken: () => localStorage.removeItem("token"),
  clear: () => localStorage.clear(),
};

// Debounce function for input handlers
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): Promise<ReturnType<F>> => {
    if (timeout) {
      clearTimeout(timeout);
    }

    return new Promise((resolve) => {
      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
  };
};

// Copy to clipboard helper
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    return false;
  }
};