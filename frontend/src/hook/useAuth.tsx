import { destroyCookie, parseCookies, setCookie } from "nookies";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  signIn: (credential: SignCredentials) => Promise<SignResponse | void>;
  signOut: () => void;
  user?: User;
  isAuthenticated: boolean;
}

type SignCredentials = {
  cpf: string;
  senha: string;
};

type SignResponse = {
  status: "success" | "warning";
  title: string;
};

type User = {
  id: string;
  matricula: string;
  cpf: string;
  nome: string;
  sobrenome: string;
};

const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const { user: userCookie, token: tokenCookie } = parseCookies();
  const [user, setUser] = useState<User | undefined>();

  const isAuthenticated = !!tokenCookie;

  useEffect(() => {
    if (userCookie) {
      setUser(JSON.parse(userCookie) as User);
    }
  }, []);

  async function signIn(credential: SignCredentials) {
    const token = "teste";
    setCookie(undefined, "token", token, {
      path: "/",
    });

    window.location.reload();

    // const response: SignResponse = {
    //   status: "success",
    //   title: "Acesso realizado com sucesso",
    // };

    // return response;
  }

  function signOut() {
    destroyCookie(undefined, "token");
    destroyCookie(undefined, "user");
    window.location.reload();
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isAuthenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
