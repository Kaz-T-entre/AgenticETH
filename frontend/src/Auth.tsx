import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { base64UrlToArrayBuffer } from "./utils/webAuthnUtils";
import ImgFaceId from "./assets/images/face-id.png";

function Auth() {
	const navigate = useNavigate();
	const { login, ready, authenticated } = usePrivy();

	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [isRegistering, setIsRegistering] = useState(true);

	// Once authentication is successful, automatically redirect to Intro page.
	useEffect(() => {
		if (ready && authenticated) {
			navigate("/intro", { replace: true });
		}
	}, [ready, authenticated, navigate]);

	// Face ID Registration flow
	const handleRegister = async () => {
		try {
			setError("");
			setMessage("");
			const { data } = await axios.post("http://localhost:3001/api/auth/register-challenge", { email });

			// Assume we perform conversion for WebAuthn options here
			const publicKeyOptions = data.publicKeyCredentialCreationOptions;
			publicKeyOptions.challenge = base64UrlToArrayBuffer(publicKeyOptions.challenge);
			publicKeyOptions.user.id = base64UrlToArrayBuffer(publicKeyOptions.user.id);

			const credential = await navigator.credentials.create({
				publicKey: publicKeyOptions,
			});

			// Verify the credential on the server
			const verifyRes = await axios.post("http://localhost:3001/api/auth/register-verify", {
				email,
				credential,
			});

			if (verifyRes.data.success) {
				setMessage("Registration succeeded! Redirecting...");
				// Save an auth flag/user info so that Home page won't redirect to /auth
				localStorage.setItem("user", "true");
				navigate("/intro", { replace: true });
			} else {
				setError("Registration failed.");
			}
		} catch (err: any) {
			console.error("Registration Error:", err);
			setError(`Registration Error: ${err.message}`);
		}
	};

	// Face ID Login flow
	const handleLogin = async () => {
		try {
			setError("");
			setMessage("");
			await login();
		} catch (err: any) {
			console.error("Login error:", err);
			setError("Login error: " + err.message);
		}
	};

	// Choose between registration and login mode
	const handleWebAuthn = async () => {
		if (isRegistering) {
			await handleRegister();
		} else {
			await handleLogin();
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
				<img src={ImgFaceId} className="img-face-id mx-auto cursor-pointer" onClick={handleWebAuthn} alt="Face ID" />
				<p className="mt-4 mx-auto text-center">
					<button className="btn-face-id" onClick={handleWebAuthn}>
						{isRegistering ? "Sign up with Face ID" : "Login with Face ID"}
					</button>
					<button className="text-center text-blue-500 underline" onClick={() => setIsRegistering(!isRegistering)}>
						{isRegistering ? "Already have an account? Login" : "New user? Register with Face ID"}
					</button>
				</p>
				{error && <p className="error-message text-center text-red-500 mb-4">{error}</p>}
				{message && <p className="text-center text-green-500 mb-4">{message}</p>}
			</div>
		</div>
	);
}

export default Auth;
