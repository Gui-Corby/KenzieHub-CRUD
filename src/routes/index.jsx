import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { RegisterPage } from "../pages/HomePage/RegisterPage";
import { useContext } from "react";
import { userContext } from "../providers/UserContext";
import { LoginPage } from "../pages/HomePage/LoginPage";
import { Dashboard } from "../pages/HomePage/Dashboard";
import { ProtectedRoutes } from "../components/ProtectedRoutes";

export const RoutesMain = () => {
  const { user } = useContext(userContext);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={user ? <Dashboard /> : <LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<ProtectedRoutes />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
};
