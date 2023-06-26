import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../components/Pagination";
import { useDelivers } from "../../hook/queries/useDelivers";
import { useAuth } from "../../hook/useAuth";

export default function UsersList() {
  const navigate = useNavigate()

  const [page, setPage]=useState(1)

  const {data} = useDelivers({
    page: page,
    pagesize: 10
  })

  const {user} = useAuth()

  return (
    <Box overflow="hidden" p='2rem'>
      <Flex align='center' mb='2rem'>
        <Text as='h1' fontSize='2xl' fontWeight='bold' >
         Histórico de Entregas
        </Text>
      </Flex>

      {
        data?.delivers && data?.delivers.length > 0 && (
          <>
          <TableContainer mb='2rem  '>
              <Table variant='simple' bg='white' borderRadius='6' colorScheme='blackAlpha'>
            
            <Thead>
              <Tr>
                <Th>Código</Th>
                {user?.tipo !== 'motorista' && <Th>Motorista</Th>}
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
              {
                data?.delivers?.map(delivery => (
                  <Tr          
                    key={delivery.codigo}
             
                >
                  <Td>{delivery.codigo || '-'}</Td>
                  {user?.tipo !== 'motorista' && <Td>{`${delivery.usuario.nome} ${delivery.usuario.sobrenome}` || '-'}</Td>}
                  <Td>{delivery.material || '-'}</Td>
                  <Td >{delivery.peso || '-'}</Td>
                  <Td >{delivery.localColeta || '-'}</Td>
                  <Td >{delivery?.horarioColetaToString || '-'}</Td>
                  <Td >{delivery.localDescarga || '-'}</Td>
                  <Td >{delivery?.horarioEntregaToString || '-'}</Td>
                  <Td >{delivery?.diffTimesToString || '-'}</Td>
                </Tr>
                ))
              }
          
        
            </Tbody>
        
              </Table>
          </TableContainer>
            
          <Pagination onPageChange={setPage} totalRegisters={data.total} pageSize={data.pagesize} currentPage={page} />
          </>
        ) 
      }
      {
        !data?.delivers||  data?.delivers.length < 1 && 
          <Text textAlign='center' fontSize='lg' fontWeight='light'>
            Sem dados a serem mostrados.
          </Text>
      }
  </Box>
  );
}
