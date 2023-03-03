import "./App.css";
import LandingPage from "./pages/LandingPage";
import TodoPage from "./pages/TodoPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignUpPage from "./pages/SignUpPage";
import { history } from "./helpers/history.js";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter history={history}>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/todos" element={<TodoPage />} />
        <Route path="/reset" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
