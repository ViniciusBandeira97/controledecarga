import {
  Box,
  Button,
  Flex,
  Icon,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { IoBook } from "react-icons/io5";
import { SiMicrosoftexcel } from "react-icons/si";
import { Pagination } from "../../components/Pagination";
import { getDelivers, useDelivers } from "../../hook/queries/useDelivers";
import { useAuth } from "../../hook/useAuth";
import { exportXlsx } from "../../utils/exportXlsx";

export default function UsersList() {
  const toast = useToast();
  const toastIdRef = useRef();
  const { user } = useAuth();

  const [page, setPage] = useState(1);
  const { data } = useDelivers({
    page: page,
    pagesize: 10,
  });

  async function handleExportList() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    toastIdRef.current = toast({
      position: "top-right",
      duration: 100000,
      render: () => (
        <Box
          bg="blue.400"
          p="3"
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center" justifyContent="start">
            <Icon as={IoBook} color="white" mr="3" fontSize="20px" />
            <Text as="span" color="white" fontSize="md">
              Gerando relatório
            </Text>
          </Box>
          <Spinner ml="3" size="md" color="white" />
        </Box>
      ),
    });

    try {
      const responseProducts = await getDelivers({
        page: 1,
        pagesize: 100000,
      });

      const now = new Date().toLocaleString("pt-br", {
        dateStyle: "short",
      });

      await exportXlsx({
        filename: `Histórico de Entregas - ${now}`,
        data: responseProducts.delivers.map((delivery) => ({
          CÓDIGO: delivery.codigo ?? "-",
          MOTORISTA:
            `${delivery.usuario.nome} ${delivery.usuario.sobrenome}` ?? "-",
          MATERIAL: delivery.material ?? "-",
          "PESO (KG)": delivery.peso ?? "-",
          "LOCAL COLETA": delivery.localColeta ?? "-",
          "HORÁRIO COLETA": delivery.horarioColeta ?? "-",
          "LOCAL DESCARGA": delivery.localDescarga ?? "-",
          "HORÁRIO DESCARGA": delivery.horarioEntrega ?? "-",
          "TEMPO ENTREGA": delivery.diffTimesToString ?? "-",
        })),
      });

      if (toastIdRef.current) {
        toast.update(toastIdRef.current, {
          description: "relatório gerado!",
          status: "success",
          isClosable: true,
          duration: 3000,
        });
      }
    } catch (error) {
      console.log(error);

      if (toastIdRef.current) {
        toast.update(toastIdRef.current, {
          description: "Ocorreu um erro ao gerar Catálogo.",
          status: "error",
          isClosable: true,
          duration: 3000,
        });
      }
    }
  }

  return (
    <Box overflow="hidden" p="2rem">
      <Flex align="center" mb="2rem">
        <Text as="h1" fontSize="2xl" fontWeight="bold">
          Histórico de Entregas
        </Text>

        <Button
          leftIcon={<Icon fontSize="lg" as={SiMicrosoftexcel} />}
          colorScheme="green"
          variant="solid"
          ml="4"
          size="sm"
          onClick={handleExportList}
        >
          Exportar
        </Button>
      </Flex>

      {data?.delivers && data?.delivers.length > 0 && (
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
                  <Th>Código</Th>
                  {user?.tipo !== "motorista" && <Th>Motorista</Th>}
                  <Th>Material</Th>
                  <Th>Peso (KG)</Th>
                  <Th>Local Coleta</Th>
                  <Th>Horário Coleta</Th>
                  <Th>Local Descarga</Th>
                  <Th>Horário Descarga</Th>
                  <Th>Tempo Entrega</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.delivers?.map((delivery) => (
                  <Tr key={delivery.codigo}>
                    <Td>{delivery.codigo || "-"}</Td>
                    {user?.tipo !== "motorista" && (
                      <Td>
                        {`${delivery.usuario.nome} ${delivery.usuario.sobrenome}` ||
                          "-"}
                      </Td>
                    )}
                    <Td>{delivery.material || "-"}</Td>
                    <Td>{delivery.peso || "-"}</Td>
                    <Td>{delivery.localColeta || "-"}</Td>
                    <Td>{delivery?.horarioColetaToString || "-"}</Td>
                    <Td>{delivery.localDescarga || "-"}</Td>
                    <Td>{delivery?.horarioEntregaToString || "-"}</Td>
                    <Td>{delivery?.diffTimesToString || "-"}</Td>
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
      {!data?.delivers ||
        (data?.delivers.length < 1 && (
          <Text textAlign="center" fontSize="lg" fontWeight="light">
            Sem dados a serem mostrados.
          </Text>
        ))}
    </Box>
  );
}
