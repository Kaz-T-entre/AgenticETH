import React from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import type { FC, ReactNode } from 'react';

const PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID || '';

interface PrivyProviderWrapperProps {
  children: ReactNode;
}

export const PrivyProviderWrapper: FC<PrivyProviderWrapperProps> = ({ children }) => {
  return React.createElement(PrivyProvider, { appId: PRIVY_APP_ID, children });
}; 