import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import SignIn from "./Components/SignIn/SignIn";
import Home from "./Components/Home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/sign-in" element={<SignIn />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
