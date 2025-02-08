import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./Intro";
import Auth from "./Auth";
import Home from "./Home";

function App() {
  console.log("App rendered");

  return (
	<Router>
	  <Routes>
		{/* イントロページ */}
		<Route path="/" element={<Intro />} />
		{/* WebAuthn 登録・ログイン画面 */}
		<Route path="/auth" element={<Auth />} />
		{/* ログイン後のダッシュボード */}
		<Route path="/home" element={<Home />} />
	  </Routes>
	</Router>
  );
}

export default App;