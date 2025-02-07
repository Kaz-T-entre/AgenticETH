import { useNavigate } from "react-router-dom";
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
				<img src={ImgIntroLogo} className="img-intro-logo mx-auto" alt="Intro Logo" />
				<img src={ImgIntroTitle} className="img-intro-title mx-auto mt-4" alt="Intro Title" />
				<p className="intro-desc text-center">
					Your wallet is ready.
					<br />
					Let's start!
				</p>
				<button className="btn-intro" onClick={handleStart}>
					Start
				</button>
			</div>
		</div>
	);
}

export default Intro;
