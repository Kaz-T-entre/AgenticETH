import ImgFaceId from "./assets/images/face-id.png";

function Home() {
	return (
		<div className="center-container">
			<div className="centered-div">
				<h1 className="intro-title">
					Start Magic Wallet
					<br />
					with Face ID.
				</h1>
				<img src={ImgFaceId} className="img-face-id mx-auto" />
				<button className="btn-face-id">Sign up with Face ID</button>
			</div>
		</div>
	);
}

export default Home;
