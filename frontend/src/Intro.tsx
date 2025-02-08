import React from 'react'
import { useNavigate } from 'react-router-dom'

function Intro() {
  const navigate = useNavigate()

  return (
    <div style={{ margin: '2rem' }}>
      <h1>Welcome to My FaceID + Privy Demo</h1>
      <p>顔認証(WebAuthn)と暗号資産ウォレット(Privy)を組み合わせたデモ</p>
      <button onClick={() => navigate('/auth')}>Face IDでログインする</button>
    </div>
  )
}

export default Intro