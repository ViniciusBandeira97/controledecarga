import {
  Box,
  Button,
  Flex,
  Icon,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Chart from "react-apexcharts";
import { FaClipboardList, FaTruck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Delivery } from "../../hook/queries/useDelivers";
import { useDeliveryAnalytic } from "../../hook/queries/useDeliveryAnalytic";
import { useAuth } from "../../hook/useAuth";
import api from "../../service/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();

  const { data } = useDeliveryAnalytic();

  async function handleCreateDelivery() {
    try {
      const createDelivery = await api.post<Delivery>("/delivers", {});
      navigate(`/delivers/${createDelivery.data.codigo}`);
    } catch (error) {
      toast({
        title: "Desculpe, ocorreu um erro interno, Tente novamente mais tarde",
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
  }

  return (
    <Box overflow="auto" p="2rem" maxH="100vh" pb="10rem">
      <Flex
        justify="space-between"
        flexDir={["column", "column", "column", "row"]}
      >
        <Text fontSize={["3xl", "3xl", "3xl", "4xl"]} fontWeight="bold">
          Olá,{` ${user?.nome} ${user?.sobrenome}`}
        </Text>
        <Text
          fontSize={["3xl", "3xl", "3xl", "4xl"]}
          fontWeight="bold"
          mt={["1rem", "1rem", "1rem", 0]}
          mb="3rem"
        >
          Matricula: {user?.matricula}
        </Text>
      </Flex>

      <Flex
        gap="1rem"
        mt="1rem"
        flexDir={["column", "column", "column", "row"]}
      >
        <Flex
          bg="white"
          borderRadius="8px"
          w="full"
          p="1rem"
          boxShadow="lg"
          flexDir="column"
        >
          <Text as="span" fontWeight="bold" fontSize="lg">
            Primeira Entrega do Dia
          </Text>
          <Text as="span" fontWeight="light" fontSize="2xl">
            {data?.timeFirstDeliveryToday}
          </Text>
        </Flex>
        <Flex
          bg="white"
          borderRadius="8px"
          w="full"
          p="1rem"
          boxShadow="lg"
          flexDir="column"
        >
          <Text as="span" fontWeight="bold" fontSize="lg">
            Total de Entregas do Dia
          </Text>
          <Text as="span" fontWeight="light" fontSize="2xl">
            {data?.totalToday}
          </Text>
        </Flex>
        <Flex
          bg="white"
          borderRadius="8px"
          w="full"
          p="1rem"
          boxShadow="lg"
          flexDir="column"
        >
          <Text as="span" fontWeight="bold" fontSize="lg">
            Total Entregas
          </Text>
          <Text as="span" fontWeight="light" fontSize="2xl">
            {data?.total}
          </Text>
        </Flex>
      </Flex>

      {user?.tipo !== "motorista" && (
        <>
          <Flex
            gap="1rem"
            mt="1rem"
            flexDir={["column", "column", "column", "row"]}
          >
            <Box
              bg="white"
              borderRadius="8px"
              minW="465px"
              w="full"
              p="1rem"
              boxShadow="lg"
            >
              <Text as="h3" fontWeight="bold" fontSize="2xl">
                Cargas
              </Text>

              <Chart
                type="donut"
                height={260}
                width="100%"
                series={data?.materials.map((driver) => driver.quantity) ?? []}
                options={{
                  series:
                    data?.materials.map((driver) => driver.quantity) ?? [],
                  labels: data?.materials.map((driver) => driver.name) ?? [],
                }}
              />
            </Box>
            <Box
              bg="white"
              borderRadius="8px"
              minW="465px"
              w="full"
              p="1rem"
              boxShadow="lg"
            >
              <Text as="h3" fontWeight="bold" fontSize="2xl">
                Motoristas
              </Text>

              <Chart
                type="bar"
                height={260}
                width="100%"
                options={{
                  chart: {
                    toolbar: {
                      show: false,
                    },
                  },

                  plotOptions: {
                    bar: {
                      distributed: true,
                      borderRadius: 4,
                      horizontal: false,
                    },
                  },
                  dataLabels: {
                    enabled: false,
                  },

                  xaxis: {
                    categories: data?.drivers.map((driver) => driver.name),
                  },
                }}
                series={[
                  {
                    name: "Qtd",
                    data: data?.drivers.map((driver) => driver.quantity) ?? [],
                  },
                ]}
              />
            </Box>
          </Flex>
        </>
      )}

      {user?.tipo === "motorista" && (
        <Stack direction={["column", "column", "column", "row"]} mt="2rem">
          <Button
            onClick={handleCreateDelivery}
            leftIcon={<Icon as={FaTruck} mr="1rem" />}
            colorScheme="red"
            w="100%"
            fontSize="4xl"
            fontWeight="bold"
            py="3rem"
            px="6rem"
          >
            Iniciar nova rota
          </Button>
          <Button
            onClick={() => navigate("/delivers")}
            leftIcon={<Icon as={FaClipboardList} mr="1rem" />}
            colorScheme="red"
            w="full"
            fontSize="4xl"
            fontWeight="bold"
            py="3rem"
            px="6rem"
          >
            Histórico
          </Button>
        </Stack>
      )}
    </Box>
  );
}
