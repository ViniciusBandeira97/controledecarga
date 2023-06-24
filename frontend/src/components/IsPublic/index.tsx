import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";

interface IsPublicProps {
  children: ReactNode;
}

export function IsPublic({ children }: IsPublicProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}
