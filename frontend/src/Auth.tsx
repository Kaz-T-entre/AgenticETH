import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { usePrivy } from "@privy-io/react-auth"
import ImgFaceId from "./assets/images/face-id.png";
import { base64UrlToArrayBuffer } from './utils/webAuthnUtils';

function Auth() {
  const navigate = useNavigate()
  const { login, ready, authenticated } = usePrivy()

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isRegistering, setIsRegistering] = useState(true);

  // If the user is already authenticated, redirect to the Intro page
  if (ready && authenticated) {
    navigate("/intro", { replace: true });
    return null;
  }

  // Face ID Registration flow
  const handleRegister = async () => {
    try {
      setError('')
      setMessage('')

      // 1. Request registration challenge from the server
      const { data } = await axios.post('http://localhost:3001/api/auth/register-challenge', {
        email,
      })

      // 2. Perform WebAuthn registration (using Face ID or platform authenticator)
      const publicKeyOptions = data.publicKeyCredentialCreationOptions
      publicKeyOptions.challenge = base64UrlToArrayBuffer(publicKeyOptions.challenge)
      publicKeyOptions.user.id = base64UrlToArrayBuffer(publicKeyOptions.user.id)
      const credential = await navigator.credentials.create({
        publicKey: publicKeyOptions,
      })

      // 3. Send the obtained credential to the server for verification
      const verifyRes = await axios.post('http://localhost:3001/api/auth/register-verify', {
        email,
        credential,
      })

      if (verifyRes.data.success) {
        setMessage('Registration succeeded! You can now log in with Face ID.')
      } else {
        setError('Registration failed.')
      }
    } catch (err: any) {
      console.error(err)
      setError('Registration Error: ' + err.message)
    }
  }

  // Face ID Login flow
  const handleLogin = async () => {
    try {
      await login()
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  // Choose between registration and login mode
  const handleWebAuthn = async () => {
    if (isRegistering) {
      await handleRegister();
    } else {
      await handleLogin();
    }
  };

  return (
    <div className="center-container">
      <div className="centered-box">
        <h1 className="signup-title">
          Start Magic Wallet
          <br />
          with Face ID.
        </h1>
        <img 
          src={ImgFaceId} 
          className="img-face-id mx-auto cursor-pointer" 
          onClick={handleWebAuthn}
          alt="Face ID"
        />
        <button className="btn-face-id" onClick={handleWebAuthn}>
          {isRegistering ? "Sign up with Face ID" : "Login with Face ID"}
        </button>
        <p className="mt-4 text-center">
          <button 
            className="text-blue-500 underline"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering 
              ? "Already have an account? Login" 
              : "New user? Register with Face ID"}
          </button>
        </p>
        {error && <p className="error-message text-center text-red-500 mb-4">{error}</p>}
        {message && <p className="text-center text-green-500 mb-4">{message}</p>}
      </div>
    </div>
  );
}

export default Auth;