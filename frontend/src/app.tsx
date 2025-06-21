import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthForm } from "./pages/auth";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthForm />} />
      </Routes>
    </BrowserRouter>
  );
}
