import {
  Box,
  Button,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { MdAddCircle } from 'react-icons/md';
import { Link, useNavigate, } from "react-router-dom";

export default function UsersList() {
  const navigate = useNavigate()

  return (
    <Box overflow="hidden" p='4'>
      <Flex align='center' mb='2rem'>
        <Text as='h1' fontSize='2xl' fontWeight='bold' >
          Lista de Usuários
        </Text>

        <Link to='/users/create'>
        <Button 
          as='div'
          leftIcon={<MdAddCircle />} 
          colorScheme='blue' 
          variant='solid'
          ml='4'
          size='sm'
        >
          Criar
        </Button>
        </Link>
      </Flex>

      <TableContainer>
      <Table variant='simple' bg='white' borderRadius='6' colorScheme='blackAlpha'>
      <TableCaption>Sem dados a serem mostrados.</TableCaption>
    <Thead>
      <Tr>
        <Th>Matricula</Th>
        <Th>Usuário</Th>
        <Th>Tipo</Th>
        <Th>Telefone</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr          
        _hover={{
            cursor:'pointer',
              bg: "gray.50",
                }}
        transition=" all 0.3s"
        onClick={()=>{
          navigate('/users/idojsaiodsja')
        }}
      >
        <Td>0392130-22</Td>
        <Td>Fulano</Td>
        <Td >Motorista</Td>
        <Td >(51) 99999-9999</Td>
      </Tr>

    </Tbody>

      </Table>
      </TableContainer>

  </Box>
  );
}
