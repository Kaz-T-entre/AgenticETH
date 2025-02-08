import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImgFaceId from "./assets/images/face-id.png";

function Auth() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(true);

  // Face ID Registration flow
  const handleRegister = async () => {
    try {
      setError('');
      setMessage('');

      // 1. 登録用チャレンジをバックエンドへリクエスト
      const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register-challenge`, { email });

      // 2. WebAuthn による登録処理（Face ID などの機能を利用）
      const publicKeyOptions = data.publicKeyCredentialCreationOptions;
      const credential = await navigator.credentials.create({
        publicKey: publicKeyOptions,
      });

      // 3. 取得した credential をバックエンドへ送信し検証
      const verifyRes = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register-verify`, {
        email,
        credential,
      });

      if (verifyRes.data.success) {
        setMessage('Registration succeeded! You can now log in with Face ID.');
      } else {
        setError('Registration failed.');
      }
    } catch (err: any) {
      console.error(err);
      setError('Registration Error: ' + err.message);
    }
  };

  // Face ID Login flow
  const handleLogin = async () => {
    try {
      setError('');
      setMessage('');

      // 1. ログイン用チャレンジをバックエンドへリクエスト
      const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login-challenge`, { email });

      // 2. WebAuthn による認証を実施
      const publicKeyOptions = data.publicKeyCredentialRequestOptions;
      const assertion = await navigator.credentials.get({
        publicKey: publicKeyOptions,
      });

      // 3. 取得した assertion をバックエンドに送信し、JWT を受け取る
      const verifyRes = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login-verify`, {
        email,
        credential: assertion,
      });

      if (verifyRes.data.success) {
        // JWT を localStorage に保存し、ダッシュボードへ遷移
        localStorage.setItem('token', verifyRes.data.token);
        navigate('/home');
      } else {
        setError('Login failed.');
      }
    } catch (err: any) {
      console.error(err);
      setError('Login Error: ' + err.message);
    }
  };

  // 登録とログインを切り替える処理
  const handleWebAuthn = async () => {
    if (isRegistering) {
      await handleRegister();
    } else {
      await handleLogin();
    }
  };

  return (
    <div style={{ margin: "2rem" }}>
      <h2>WebAuthn (Face ID) Authentication Page</h2>
      <div style={{ margin: "1rem 0" }}>
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginLeft: "0.5rem" }}
        />
      </div>
      <img 
        src={ImgFaceId} 
        alt="Face ID" 
        className="img-face-id mx-auto cursor-pointer"
        onClick={handleWebAuthn}
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
  );
}

export default Auth; 