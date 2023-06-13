import { BrowserRouter, Route, Routes } from "react-router-dom";

import ErrorPage from "../pages/ErrorPage";
import SignIn from "../pages/SignIn";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SignIn />} path="/" />
        <Route element={<ErrorPage />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}
