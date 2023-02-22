import "./App.css";
import LandingPage from "./pages/LandingPage";
import TodoPage from "./pages/TodoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="todo" element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
