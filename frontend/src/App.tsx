<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
=======
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
>>>>>>> 2c81f68eb28c4661b4873a567d59b6c89428f720
import Intro from "./Intro";
import Auth from "./Auth";
import Home from "./Home";
import { PrivyProvider } from "@privy-io/react-auth";

function App() {
	console.log("App rendered");

<<<<<<< HEAD
	return (
		<PrivyProvider appId="cm6t6svwm063qgvcrv656hbxp">
			<Router>
				<Routes>
					<Route path="/" element={<Intro />} />
					<Route path="/auth" element={<Auth />} />
					<Route path="/home" element={<Home />} />
				</Routes>
			</Router>
		</PrivyProvider>
	);
=======
  return (
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
  );
>>>>>>> 2c81f68eb28c4661b4873a567d59b6c89428f720
}

export default App;
