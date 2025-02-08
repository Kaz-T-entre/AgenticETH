import { Route, Routes } from "react-router-dom";
import { PrivyProviderWrapper } from "./privyClient";
import Auth from "./Auth";
import Intro from "./Intro";
import Home from "./Home";

function App() {
	return (
		<PrivyProviderWrapper>
			<Routes>
				<Route path="/auth" element={<Auth />} />
				<Route path="/intro" element={<Intro />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</PrivyProviderWrapper>
	);
}

export default App;
