import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ImgChainBase from "./assets/images/chain-base.png";
import ImgBank from "./assets/images/i-bank.png";
import ImgArrow from "./assets/images/i-arrow.png";
import ImgBuy from "./assets/images/i-buy.png";
import ImgSend from "./assets/images/i-send.png";
import ImgReceive from "./assets/images/i-receive.png";

function Home() {
  const navigate = useNavigate()
  const [isHelp, setIsHelp] = useState(false)
  const [walletId, setWalletId] = useState('')
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState('')
  const [error, setError] = useState('')
  const [totalAssetUSD, setTotalAssetUSD] = useState("5,038")

  useEffect(() => {
    // JWT の存在確認 (未ログインの場合は Auth 画面へ)
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/auth')
      return
    }

    // サーバーからウォレット情報を取得
    axios
      .get('http://localhost:3001/api/wallet/info', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const w = res.data.wallet
        setWalletId(w.walletId)
        setAddress(w.address)
        setBalance(w.balance)
        if (w.balanceUSD) {
          setTotalAssetUSD(w.balanceUSD)
        }
      })
      .catch((err) => {
        console.error(err)
        setError('ウォレット情報の取得に失敗しました。')
      })
  }, [navigate])

  const typeHelp = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setIsHelp(true)
    } else {
      setIsHelp(false)
    }
  }

  const handleBuyAssets = () => {
    // Implement buy assets functionality
    console.log("Buy assets clicked")
  }

  const handleSendTransaction = async () => {
    setError('')
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/auth')
      return
    }
    try {
      // 例: 0xRecipientAddress に 0.01 ETH を送金
      const res = await axios.post(
        'http://localhost:3001/api/wallet/send',
        {
          to: '0xRecipientAddressHere', 
          amount: '0.01',
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert(`トランザクション成功！ TxHash: ${res.data.txHash}`)
    } catch (err) {
      console.error(err)
      setError('トランザクションエラー')
    }
  }

  const handleReceiveAssets = () => {
    // Show receive address
    alert(`Your wallet address: ${address}`)
  }

  return (
    <div style={{ margin: "2rem" }}>
      <h2>Home / Dashboard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: "1rem" }}>
        <strong>Wallet ID:</strong> {walletId}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <strong>Address:</strong> {address}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <strong>Balance:</strong> {balance}
      </div>

      <button onClick={handleSendTransaction}>0.01 ETH を送る</button>

      {/* 以下はその他のUI（quick menu など）の例 */}
      <div className="quick-menu mt-8">
        <h2 className="quick-title mb-2">Quick Menu</h2>
        <div className="grid grid-cols-2 gap-x-5 gap-y-3">
          <div className="quick-box p-2 cursor-pointer" onClick={handleBuyAssets}>
            <img src={ImgBuy} className="img-buy" alt="Buy" />
            <h3 className="quick-name">Buy Assets</h3>
            <p className="quick-desc">Buy Crypto/NFTs within a single step.</p>
          </div>
          <div className="quick-box p-2 cursor-pointer" onClick={handleSendTransaction}>
            <img src={ImgSend} className="img-send" alt="Send" />
            <h3 className="quick-name">Send Assets</h3>
            <p className="quick-desc">Send your Crypto/NFTs in minutes. No Gas-fees.</p>
          </div>
          <div className="quick-box p-2 cursor-pointer" onClick={handleReceiveAssets}>
            <img src={ImgReceive} className="img-receive" alt="Receive" />
            <h3 className="quick-name">Receive Assets</h3>
            <p className="quick-desc">Get Crypto/NFTs within a single step.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home