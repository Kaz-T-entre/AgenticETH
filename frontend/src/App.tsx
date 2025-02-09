import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { PrivyProvider } from "@privy-io/react-auth";
import Intro from "./Intro";
import Auth from "./Auth";
import Home from "./Home";

function App() {
	return (
		<PrivyProvider appId="cm6t6svwm063qgvcrv656hbxp">
			<Router>
				<Routes>
					<Route path="/" element={<Navigate to="/auth" replace />} />
					<Route path="/auth" element={<Auth />} />
					<Route path="/intro" element={<Intro />} />
					<Route path="/home" element={<Home />} />
					{/* Fallback route: redirect to the auth page */}
					<Route path="*" element={<Navigate to="/auth" replace />} />
				</Routes>
			</Router>
		</PrivyProvider>
	);
}

export default App;
