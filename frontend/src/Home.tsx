import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import ImgAvatar from "./assets/images/chain-base.png";
import ImgBuy from "./assets/images/chain-base.png";
import ImgSend from "./assets/images/chain-base.png";
import ImgReceive from "./assets/images/chain-base.png";

function Home() {
	const navigate = useNavigate();
	const { ready, authenticated } = usePrivy();

	useEffect(() => {
		if (ready && !authenticated) {
			navigate("/auth", { replace: true });
		}
	}, [ready, authenticated, navigate]);

	return (
		<div className="center-container start-center">
			<div className="centered-box">
				<div className="flex flex-col items-center">
					<img src={ImgAvatar} className="avatar-box" alt="Avatar" />
					<p className="lbl-total-asset">Total Asset</p>
					<p className="val-total-asset">$1,000</p>
				</div>

				<div className="mt-8">
					<div className="box-asset flex items-center justify-between mb-4">
						<div className="flex items-center gap-4">
							<img src={ImgBuy} className="img-asset" alt="Buy" />
							<div>
								<p className="name-asset">Buy</p>
								<p className="addr-asset">Buy crypto with card</p>
							</div>
						</div>
					</div>

					<div className="box-asset flex items-center justify-between mb-4">
						<div className="flex items-center gap-4">
							<img src={ImgSend} className="img-asset" alt="Send" />
							<div>
								<p className="name-asset">Send</p>
								<p className="addr-asset">Send to other wallet</p>
							</div>
						</div>
					</div>

					<div className="box-asset flex items-center justify-between">
						<div className="flex items-center gap-4">
							<img src={ImgReceive} className="img-asset" alt="Receive" />
							<div>
								<p className="name-asset">Receive</p>
								<p className="addr-asset">Receive from other wallet</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
