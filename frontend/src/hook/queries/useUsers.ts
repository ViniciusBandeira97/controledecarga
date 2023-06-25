import { useQuery } from "react-query";
import api from "../../service/api";

export type User = {
  id: string;
  matricula: string;
  cpf: string;
  nome: string;
  sobrenome: string;
  genero: string;
  dataNascimento: Date;
  telefone: string;
  endereco: string;
  estado: string;
  cidade: string;
  cep: string;
  tipo: string;
};

type GetUsersResponse = {
  users: User[];
  page: number;
  pagesize: number;
  total: number;
};

interface useUsersProps {
  page: number;
  pagesize: number;
  search?: string;
}

interface useUserOneProps {
  userId?: string;
}

export async function getUsers({
  page = 0,
  pagesize = 10,
  search,
}: useUsersProps): Promise<GetUsersResponse> {
  const { data } = await api.get<GetUsersResponse>("/users", {
    params: {
      page: page - 1,
      pagesize,
      search,
    },
  });

  return data;
}

export function useUsers({ page, pagesize, search }: useUsersProps) {
  return useQuery(["users", page, pagesize, search], () =>
    getUsers({
      page,
      pagesize,
      search,
    })
  );
}
export async function getUserOne({
  userId,
}: useUserOneProps): Promise<User | undefined> {
  if (!userId) return undefined;

  const { data } = await api.get<User>(`/users/${userId}`, {});

  return data;
}

export function useUserOne({ userId }: useUserOneProps) {
  return useQuery(["user", userId], () =>
    getUserOne({
      userId,
    })
  );
}
