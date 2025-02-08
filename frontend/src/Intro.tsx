import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import ImgIntroLogo from "./assets/images/intro-logo.png";
import ImgIntroTitle from "./assets/images/intro-title.png";

function Intro() {
  const navigate = useNavigate();
  const { ready, authenticated } = usePrivy();

  useEffect(() => {
    if (ready && !authenticated) {
      navigate("/auth", { replace: true });
    }
  }, [ready, authenticated, navigate]);

  const handleStart = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="center-container">
      <div className="centered-box">
        <div className="flex flex-col items-center">
          <img src={ImgIntroLogo} className="img-intro-logo" alt="Intro Logo" />
          <img src={ImgIntroTitle} className="img-intro-title mt-4" alt="Intro Title" />
          <p className="intro-desc text-center mt-4">
          Woo-hoo! You’ve successfully             
          <br />
          created your account.
          </p>
          <button className="btn-intro mt-4" onClick={handleStart}>
            Add your funds
          </button>
        </div>
      </div>
    </div>
  );
}

export default Intro;