import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
<<<<<<< HEAD
import { usePrivy } from "@privy-io/react-auth";
=======
>>>>>>> 2c81f68eb28c4661b4873a567d59b6c89428f720
import ImgIntroLogo from "./assets/images/intro-logo.png";
import ImgIntroTitle from "./assets/images/intro-title.png";

function Intro() {
  const navigate = useNavigate();

  // Commented out auto-redirection for unauthenticated users to allow navigation from Intro
  // useEffect(() => {
  //   if (ready && !authenticated) {
  //     navigate("/auth", { replace: true });
  //   }
  // }, [ready, authenticated, navigate]);

  const handleAddFunds = () => {
    console.log("Navigating to /home");
    navigate("/home");
  };

  return (
    <div className="center-container">
      <div className="centered-box">
        <div className="flex flex-col items-center">
          <img src={ImgIntroLogo} className="img-intro-logo" alt="Intro Logo" />
          <img src={ImgIntroTitle} className="img-intro-title mt-4" alt="Intro Title" />
          <p className="intro-desc text-center mt-4">
          Woo-hoo! You've successfully             
          <br />
          created your account.
          </p>
          <button className="btn-intro mt-4" onClick={handleAddFunds}>
            Add Your Funds
          </button>
        </div>
      </div>
    </div>
  );
}

export default Intro;
