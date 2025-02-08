import { useNavigate } from "react-router-dom";
import ImgFaceId from "./assets/images/face-id.png";

function Auth() {
	const navigate = useNavigate();

	const signUp = () => {
		localStorage.setItem("user", "DUMMY");
		navigate("/intro", { replace: true });
	};

	return (
		<div className="center-container">
			<div className="centered-box">
				<h1 className="signup-title">
					Start Magic Wallet
					<br />
					with Face ID.
				</h1>
				<img src={ImgFaceId} className="img-face-id mx-auto" onClick={signUp} />
				<button className="btn-face-id" onClick={signUp}>
					Sign up with Face ID
				</button>
			</div>
		</div>
	);
}

export default Auth;
