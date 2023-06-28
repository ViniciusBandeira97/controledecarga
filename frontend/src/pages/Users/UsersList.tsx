import {
  Box,
  Button,
  Flex,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Pagination } from "../../components/Pagination";
import { useUsers } from "../../hook/queries/useUsers";
import { useAuth } from "../../hook/useAuth";

export default function UsersList() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const { data } = useUsers({
    page: page,
    pagesize: 10,
  });

  const { user } = useAuth();

  return (
    <Box overflow="hidden" p="2rem">
      <Flex align="center" mb="2rem">
        <Text as="h1" fontSize="2xl" fontWeight="bold">
          Lista de Usuários
        </Text>

        {user?.tipo === "administrador" && (
          <Link to="/users/create">
            <Button
              as="div"
              leftIcon={<Icon fontSize="lg" as={MdAddCircle} />}
              colorScheme="blue"
              variant="solid"
              ml="4"
              size="sm"
            >
              Criar
            </Button>
          </Link>
        )}
      </Flex>

      {data?.users && data?.users.length > 0 && (
        <>
          <TableContainer mb="2rem  ">
            <Table
              variant="simple"
              bg="white"
              borderRadius="6"
              colorScheme="blackAlpha"
            >
              <Thead>
                <Tr>
                  <Th>Matricula</Th>
                  <Th>Usuário</Th>
                  <Th>Tipo</Th>
                  <Th>Telefone</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.users?.map((user) => (
                  <Tr
                    key={user.id}
                    _hover={{
                      cursor: "pointer",
                      bg: "gray.50",
                    }}
                    transition=" all 0.3s"
                    onClick={() => {
                      navigate(`/users/${user.id}`);
                    }}
                  >
                    <Td>{user.matricula}</Td>
                    <Td>{user.nome}</Td>
                    <Td>{user.tipo}</Td>
                    <Td>{user.telefone}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <Pagination
            onPageChange={setPage}
            totalRegisters={data.total}
            pageSize={data.pagesize}
            currentPage={page}
          />
        </>
      )}
      {!data?.users ||
        (data?.users.length < 1 && (
          <Text textAlign="center" fontSize="lg" fontWeight="light">
            Sem dados a serem mostrados.
          </Text>
        ))}
    </Box>
  );
}
