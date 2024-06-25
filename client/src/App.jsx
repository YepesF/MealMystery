// React Router DOM
import { Routes, Route } from "react-router-dom";

// Components
import LandingPage from "./layouts/LandingPage";

import "./App.css";

function App() {
  return (
    <div className="w-screen font-Kanit">
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
