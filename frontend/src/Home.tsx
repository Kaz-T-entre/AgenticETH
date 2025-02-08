import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { usePrivy } from "@privy-io/react-auth"
import ImgAvatar from "./assets/images/chain-base.png";
import ImgBuy from "./assets/images/chain-base.png";
import ImgSend from "./assets/images/chain-base.png";
import ImgReceive from "./assets/images/chain-base.png";

function Home() {
  const navigate = useNavigate()
  const { ready, authenticated } = usePrivy()
  const [isHelp, setIsHelp] = useState(false)
  const [walletId, setWalletId] = useState('')
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState('')
  const [error, setError] = useState('')
  const [totalAssetUSD, setTotalAssetUSD] = useState("5,038")

  useEffect(() => {
    if (ready && !authenticated) {
      navigate("/auth", { replace: true })
    }

    // サーバーからウォレット情報を取得
    const token = localStorage.getItem('token')
    if (token) {
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
    }
  }, [ready, authenticated, navigate])

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
    <div className="center-container start-center">
      <div className="centered-box">
        <div className="flex flex-col items-center">
          <img src={ImgAvatar} className="avatar-box" alt="Avatar" />
          <p className="lbl-total-asset">Total Asset</p>
          <p className="val-total-asset">$1,000</p>
        </div>

        <div className="mt-8">
          <div className="box-asset flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <img src={ImgBuy} className="img-asset" alt="Buy" />
              <div>
                <p className="name-asset">Buy</p>
                <p className="addr-asset">Buy crypto with card</p>
              </div>
            </div>
          </div>

          <div className="box-asset flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <img src={ImgSend} className="img-asset" alt="Send" />
              <div>
                <p className="name-asset">Send</p>
                <p className="addr-asset">Send to other wallet</p>
              </div>
            </div>
          </div>

          <div className="box-asset flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={ImgReceive} className="img-asset" alt="Receive" />
              <div>
                <p className="name-asset">Receive</p>
                <p className="addr-asset">Receive from other wallet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home