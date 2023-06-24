import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import { Navbar } from "../Navbar";

interface IsPriveProps {
  children: ReactNode;
}

export function IsPrive({ children }: IsPriveProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Navbar>{children}</Navbar>;
}
