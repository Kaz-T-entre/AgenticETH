Here’s a well-structured version of your content in markdown format:

# Magic Wallet with Face ID Authentication

A secure and user-friendly crypto wallet application that leverages Face ID (WebAuthn) for authentication and provides seamless wallet functionality.

## Features

### 🔐 Biometric Authentication
- Face ID/Touch ID support via WebAuthn
- Secure credential management
- JWT-based session handling

### 💰 Wallet Features
- View total assets and balances
- Send/receive crypto assets
- Buy crypto with card
- Real-time USD conversion

### 🎨 Modern UI/UX
- Clean, minimalist design
- Mobile-first responsive layout
- Smooth transitions
- Dark mode support

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for development & building
- TailwindCSS for styling
- React Router for navigation
- Privy SDK for wallet integration
- WebAuthn API for biometric auth

### Backend
- Express.js with TypeScript
- MongoDB for data persistence
- Express Session with MongoDB store
- JWT for authentication
- Privy Server SDK for wallet operations

## Project Structure

### Key Components

#### Authentication Flow
1. User clicks Face ID button
2. Backend generates challenge
3. Browser prompts for biometric verification
4. Credentials verified on backend
5. JWT token issued for session

#### Wallet Integration
- Privy SDK handles wallet creation
- Secure key management
- Transaction signing
- Balance checking
- Asset transfers

### Development Features
- Hot Module Replacement (HMR)
- TypeScript type checking
- ESLint configuration
- Mock server for development
- Environment variable management

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Frontend (.env): `id`
   - Backend (.env): `secret`
4. Start development servers:
   ```bash
   npm run dev
   ```

## API Routes

### Authentication
- `POST /api/auth/register-challenge`
- `POST /api/auth/register-verify`
- `POST /api/auth/login-challenge`
- `POST /api/auth/login-verify`

### Wallet
- `GET /api/wallet/info`
- `POST /api/wallet/send`

## Security Considerations
- WebAuthn requires HTTPS in production
- Secure key storage
- Rate limiting
- Input validation
- Session management
- CORS configuration

## Development Mode Features
- Mock server for API responses
- In-memory session store
- Dummy wallet data
- Console logging
- Hot reloading

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Create a Pull Request

## License
MIT License

## Acknowledgments
- WebAuthn Web API
- Privy Wallet SDK
- React Community
- MongoDB Team
```

This markdown structure should now be much more readable, organized, and easy to navigate.
