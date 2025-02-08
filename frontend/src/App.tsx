import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./Intro";
import Auth from "./Auth";
import Home from "./Home";
import { PrivyProvider } from "@privy-io/react-auth";

function App() {
	console.log("App rendered");

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
}

export default App;
