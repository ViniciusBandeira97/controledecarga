import { destroyCookie, parseCookies, setCookie } from "nookies";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../service/api";

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

type GetAccess = {
  "user": User,
	"token": string
}

type User = {
  id: string;
  matricula: string;
  cpf: string;
  nome: string;
  sobrenome: string;
  tipo: 
  'administrador'|
  'motorista'|
  'administrativo';
};

const AuthContext = createContext({} as AuthContextProps);

export function signOut() {
  destroyCookie(undefined, "token");
  destroyCookie(undefined, "user");
  window.location.reload();
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { user: userCookie, token: tokenCookie } = parseCookies();
  const [user, setUser] = useState<User>({} as User);

  const isAuthenticated = !!tokenCookie || !user;

  useEffect(() => {
    if (userCookie) {
      setUser(JSON.parse(userCookie) as User);
    }
  }, []);

  async function signIn(credential: SignCredentials) {


    try {
      const getAccess = await api.post<GetAccess>('/auth/sign', {
        cpf: credential.cpf,
        senha: credential.senha
      });

      
      setCookie(undefined, "user", JSON.stringify(getAccess.data.user), {
        path: "/",
      });
      setCookie(undefined, "token", getAccess.data.token, {
        path: "/",
      });
      window.location.reload();

    } catch (error) {
    
      const response: SignResponse = {
        status: "warning",
        title: "Usuário ou senha incorreto",
      };

      return response;
    }
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
