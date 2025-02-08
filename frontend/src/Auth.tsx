import { useNavigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import ImgFaceId from "./assets/images/face-id.png";

function Auth() {
	const navigate = useNavigate();
	const { login, ready, authenticated } = usePrivy();

	// ユーザーが既に認証済みの場合はIntroページへリダイレクト
	if (ready && authenticated) {
		navigate("/intro", { replace: true });
		return null;
	}

	const handleLogin = async () => {
		try {
			await login();
		} catch (error) {
			console.error("Login error:", error);
		}
	};

	return (
		<div className="center-container">
			<div className="centered-box">
				<h1 className="signup-title">
					Start Magic Wallet
					<br />
					with Face ID.
				</h1>
				<img src={ImgFaceId} className="img-face-id mx-auto" onClick={handleLogin} alt="Face ID" />
				<button className="btn-face-id" onClick={handleLogin}>
					Sign up with Face ID
				</button>
			</div>
		</div>
	);
}

export default Auth;
