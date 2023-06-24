import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./hook/useAuth";
import { Router } from "./routes";
import { theme } from "./styles/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
