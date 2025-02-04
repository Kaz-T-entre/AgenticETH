import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Intro from "./Intro";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/intro" element={<Intro />} />
		</Routes>
	);
}

export default App;
