import { BrowserRouter, Route, Routes } from "react-router-dom";

import { IsPrive } from "../components/IsPrive";
import { IsPublic } from "../components/IsPublic";
import Dashboard from "../pages/Dashboard";
import ErrorPage from "../pages/ErrorPage";
import SignIn from "../pages/SignIn";
import UsersCreate from "../pages/Users/UsersCreate";
import UsersList from "../pages/Users/UsersList";
import UsersUpdate from "../pages/Users/UsersUpdate";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <IsPublic>
              <SignIn />
            </IsPublic>
          }
          path="/"
        />
        <Route
          element={
            <IsPrive>
              <Dashboard />
            </IsPrive>
          }
          path="/dashboard"
        />
        <Route
          element={
            <IsPrive>
              <UsersList />
            </IsPrive>
          }
          path="/users"
        />
        <Route
          element={
            <IsPrive>
              <UsersCreate />
            </IsPrive>
          }
          path="/users/create"
        />
        <Route
          element={
            <IsPrive>
              <UsersUpdate />
            </IsPrive>
          }
          path="/users/:id"
        />
        <Route element={<ErrorPage />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}
