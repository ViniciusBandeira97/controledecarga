import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import ErrorPage from "../pages/ErrorPage";
import SignIn from "../pages/SignIn";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SignIn />} path="/" />
        <Route
          element={
            <Navbar>
              <Dashboard />
            </Navbar>
          }
          path="/dashboard"
        />
        <Route element={<ErrorPage />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}
