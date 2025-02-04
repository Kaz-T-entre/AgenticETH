import { useNavigate } from "react-router-dom";
import ImgFaceId from "./assets/images/face-id.png";

function Home() {
	const navigate = useNavigate();

	const signUp = () => {
		navigate("/intro", { replace: true });
	};

	return (
		<div className="center-container">
			<div className="centered-div">
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

export default Home;
