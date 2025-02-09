import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImgArrow from "./assets/images/i-arrow.png";

function Chat() {
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
		if (!isAuth) navigate("/auth", { replace: true });
	}, [navigate]);

	return (
		<div className="center-container start-center">
			<div className="centered-box min-h-screen p-4 relative">
				<div className="w-full absolute bottom-4">
					<div className="chat relative -mb-4 p-4 border-t-2 border-gray-300">
						<input placeholder="Message Here" className="help-input" onChange={typeHelp} />
						<button className={"help-button absolute cursor-pointer " + (isHelp ? "active" : "")}>
							<img src={ImgArrow} className="mx-auto" alt="Arrow" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Chat;
