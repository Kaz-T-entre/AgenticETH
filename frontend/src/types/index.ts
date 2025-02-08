// Authentication types
export interface AuthResponse {
    success: boolean;
    token?: string;
    message?: string;
  }
  
  // Wallet types
  export interface WalletInfo {
    walletId: string;
    address: string;
    balance: string;
    balanceUSD?: string;
    network?: string;
  }
  
  export interface Transaction {
    to: string;
    amount: string;
    gasLimit?: string;
    gasPrice?: string;
  }
  
  export interface TransactionResponse {
    success: boolean;
    txHash?: string;
    message?: string;
  }
  
  // WebAuthn types
  export interface PublicKeyCredentialCreationOptionsJSON {
    rp: {
      name: string;
      id: string;
    };
    user: {
      id: string;
      name: string;
      displayName: string;
    };
    challenge: string;
    pubKeyCredParams: {
      type: "public-key";
      alg: number;
    }[];
    timeout?: number;
    excludeCredentials?: {
      id: string;
      type: "public-key";
      transports?: AuthenticatorTransport[];
    }[];
    authenticatorSelection?: {
      authenticatorAttachment?: AuthenticatorAttachment;
      requireResidentKey?: boolean;
      residentKey?: ResidentKeyRequirement;
      userVerification?: UserVerificationRequirement;
    };
    attestation?: AttestationConveyancePreference;
  }
  
  export interface PublicKeyCredentialRequestOptionsJSON {
    challenge: string;
    timeout?: number;
    rpId?: string;
    allowCredentials?: {
      id: string;
      type: "public-key";
      transports?: AuthenticatorTransport[];
    }[];
    userVerification?: UserVerificationRequirement;
  }
  
  // Component props types
  export interface ProtectedRouteProps {
    children: React.ReactElement;
  }
  
  // Error types
  export interface ApiError {
    message: string;
    code?: string;
    details?: unknown;
  }