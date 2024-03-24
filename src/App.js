import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import SignIn from "./Components/SignIn/SignIn";
import Home from "./Components/Home/Home";
import * as routes from "./Constants/routes";
import Cabinet from "./Components/Cabinet/Cabinet";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={routes.CABINET + "/*"} element={<Cabinet />} />
        <Route path={routes.SIGN_IN} element={<SignIn />} />
        <Route path={routes.HOME} element={<Home />} />
        <Route path="*" element={<Navigate to={routes.HOME} replace />} />
      </Routes>
    </div>
  );
}

export default App;
