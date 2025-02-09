import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OnrampTitle from "./assets/images/onramp-title.png";
import OnrampImage from "./assets/images/onramp.png";

function Onramp() {
	const navigate = useNavigate();

	const handleAddCrypto = () => {
		//
	};

	const handleSkip = () => {
		//
	};

	// If "user" is not found in localStorage, consider the user unauthenticated and redirect to the auth page
	useEffect(() => {
		const isAuth = localStorage.getItem("user");
		if (!isAuth) navigate("/auth", { replace: true });
	}, [navigate]);

	return (
		<div className="center-container start-center">
			<div className="centered-box p-4">
				<img src={OnrampTitle} alt="onramp-title" className="my-12 px-10" />
				<div className="mx-auto my-8 text-center">
					<img src={OnrampImage} alt="onramp" />
				</div>
				<button className="btn-add-crypto mx-auto mb-20" onClick={handleAddCrypto}>
					Add Crypto Directly
				</button>
				<button className="btn-skip-now mx-auto" onClick={handleSkip}>
					Skip now
				</button>
			</div>
		</div>
	);
}

export default Onramp;
