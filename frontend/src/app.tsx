import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthForm, DashBoard } from "./pages";
import { ProtectedRoute } from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
