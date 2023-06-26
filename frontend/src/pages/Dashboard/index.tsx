import { Box, Button, Flex, Icon, Text, useToast } from "@chakra-ui/react";
import { FaClipboardList, FaTruck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Delivery } from "../../hook/queries/useDelivers";
import { useAuth } from "../../hook/useAuth";
import api from "../../service/api";

export default function Dashboard() {
  const navigate = useNavigate()
  const toast = useToast();
  const {user} = useAuth()

  async function handleCreateDelivery(){
    try {
      const createDelivery = await api.post<Delivery>('/delivers',{})
      navigate(`/delivers/${createDelivery.data.codigo}`)
    } catch (error) {
      toast({
        title: 'Desculpe, ocorreu um erro interno, Tente novamente mais tarde',
        status: 'error',
        position: "top",
        isClosable: true,
      });
    }
  }

  return ( 
    <Box overflow="hidden" p='2rem'>
      <Flex justify='space-between'>
        <Text fontSize='4xl' fontWeight='bold'>Olá,{` ${user?.nome} ${user?.sobrenome}`}</Text>
        <Text fontSize='4xl' fontWeight='bold'>Matricula: {user?.matricula}</Text>
      </Flex>

      {
        user?.tipo === 'motorista' && (
          <Flex gap='2rem' mt='2rem'>
            <Button onClick={handleCreateDelivery} leftIcon={<Icon as={FaTruck} mr='1rem' />}  colorScheme="red" maxW='28rem' w='full' fontSize='4xl' fontWeight='bold' py='2rem' px='6rem'  >
              Iniciar nova rota
            </Button>
            <Link to='/delivers'>
              <Button as='div'  leftIcon={<Icon as={FaClipboardList} mr='1rem' />} colorScheme="red" maxW='28rem' w='full' fontSize='4xl' fontWeight='bold' py='2rem' px='6rem' >
                Histórico
              </Button>
            </Link>
          </Flex>
        )
      }
    </Box>
  );
}
