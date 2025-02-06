import { useNavigate } from "react-router-dom";
import ImgIntroLogo from "./assets/images/intro-logo.png";
import ImgIntroTitle from "./assets/images/intro-title.png";

function Intro() {
	const navigate = useNavigate();

	const goToHome = () => {
		navigate("/", { replace: true });
	};

	return (
		<div className="center-container">
			<div className="centered-box">
				<img src={ImgIntroLogo} className="img-intro-logo mx-auto" />
				<img src={ImgIntroTitle} className="img-intro-title mx-auto mt-4" />
				<p className="intro-desc text-center">
					Woo-hoo!
					<br />
					You've successfully
					<br />
					created your account.
				</p>
				<button className="btn-intro" onClick={goToHome}>
					Start!
				</button>
			</div>
		</div>
	);
}

export default Intro;
