import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImgChainBase from "./assets/images/chain-base.png";
import ImgBank from "./assets/images/i-bank.png";
import ImgArrow from "./assets/images/i-arrow.png";
import ImgBuy from "./assets/images/i-buy.png";
import ImgSend from "./assets/images/i-send.png";
import ImgReceive from "./assets/images/i-receive.png";

function Home() {
  const navigate = useNavigate();
  const [isHelp, setIsHelp] = useState(false);

  // Activate the help button when input is provided
  const typeHelp = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setIsHelp(true);
    } else {
      setIsHelp(false);
    }
  };

  // If "user" is not found in localStorage, consider the user unauthenticated and redirect to the auth page
  useEffect(() => {
    const isAuth = localStorage.getItem("user");
    if (!isAuth) {
      navigate("/auth", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="center-container start-center">
      <div className="centered-box p-4">
        {/* Total Asset Display Section */}
        <div className="mb-8 text-left">
          <div className="avatar-box"></div>
          <div className="lbl-total-asset">Total Asset</div>
          <div className="val-total-asset">$5,038</div>
        </div>

        {/* Scrollable Asset Information */}
        <div className="flex overflow-x-scroll -m-4 p-4 mb-4">
          <div className="flex items-center">
            <div className="box-asset">
              <div className="flex items-center">
                <img src={ImgChainBase} className="img-asset mr-2" alt="Chain Base" />
                <div className="name-asset">BASE</div>
              </div>
              <div className="flex items-center mt-4">
                <img src={ImgBank} className="i-addr-asset mr-1" alt="Bank Icon" />
                <div className="addr-asset">...561a</div>
              </div>
              <div className="w-fit">
                <div className="value-asset">USD$ 1540</div>
                <div className="inc-value-asset text-right">+$0.15</div>
              </div>
            </div>
          </div>
        </div>

        {/* Help Input Section */}
        <div className="mb-8">
          <h2 className="help-title pb-3">How Can I Help?</h2>
          <div className="relative">
            <input placeholder="Message Here" className="help-input" onChange={typeHelp} />
            <button className={"help-button absolute cursor-pointer " + (isHelp ? "active" : "")}>
              <img src={ImgArrow} className="mx-auto" alt="Arrow" />
            </button>
          </div>
        </div>

        {/* Quick Menu */}
        <div>
          <h2 className="quick-title mb-2">Quick Menu</h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-3">
            <div className="quick-box p-2 cursor-pointer">
              <img src={ImgBuy} className="img-buy" alt="Buy Assets" />
              <h3 className="quick-name">Buy Assets</h3>
              <p className="quick-desc">Buy Crypto/NFTs within a single step.</p>
            </div>
            <div className="quick-box p-2 cursor-pointer">
              <img src={ImgSend} className="img-send" alt="Send Assets" />
              <h3 className="quick-name">Send Assets</h3>
              <p className="quick-desc">Send your Crypto/NFTs within a minutes. No Gas-fees.</p>
            </div>
            <div className="quick-box p-2 cursor-pointer">
              <img src={ImgReceive} className="img-receive" alt="Receive Assets" />
              <h3 className="quick-name">Receive Assets</h3>
              <p className="quick-desc">Get Crypto/NFTs within a single step.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;