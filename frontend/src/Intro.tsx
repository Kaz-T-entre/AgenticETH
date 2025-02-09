import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImgIntroLogo from "./assets/images/intro-logo.png";
import ImgIntroTitle from "./assets/images/intro-title.png";

function Intro() {
	const navigate = useNavigate();
	const handleAddFunds = () => {
		navigate("/home");
	};

	// If "user" is not found in localStorage, consider the user unauthenticated and redirect to the auth page
	useEffect(() => {
		const isAuth = localStorage.getItem("user");
		if (!isAuth) navigate("/auth", { replace: true });
	}, [navigate]);

	return (
		<div className="center-container">
			<div className="centered-box p-4">
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
