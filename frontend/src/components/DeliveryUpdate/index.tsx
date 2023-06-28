import { Button, Center, Flex, Stack, Text, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Input } from "../../components/Form/Input";
import { Delivery } from "../../hook/queries/useDelivers";
import { useCountDate } from "../../hook/useCountDate";
import api from "../../service/api";
import { Select } from "../Form/Select";

type UserFormData = {
  codigo: number;
  localColeta: string;
  material: string;
  peso: number;
  localDescarga: string;
  horarioColeta: Date;
  horarioEntrega: Date;
};

interface DeliveryUpdateProps {
  delivery: Delivery;
}

export function DeliveryUpdate({ delivery }: DeliveryUpdateProps) {
  const navigate = useNavigate();

  const [_, hour, minute, second] = useCountDate(delivery.horarioColeta);

  const userFormSchema = Yup.object().shape({
    codigo: Yup.number().required("Código obrigatório"),
    localColeta: Yup.string().required("Local Coleta obrigatório"),
    material: Yup.string().required("Material obrigatório"),
    peso: Yup.number()
      .typeError("Informar peso em número")
      .required("Peso obrigatório"),
    localDescarga: Yup.string().required("Local Descarga obrigatório"),
  });

  const toast = useToast();
  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(userFormSchema),
  });
  const { errors } = formState;

  const updateUser = async (data: UserFormData) => {
    await api.put(`/delivers/${delivery?.codigo}`, {
      ...data,
      horarioEntrega: new Date(),
    });

    toast({
      title: "Entrega finalizada com sucesso!",
      status: "success",
      position: "top",
      isClosable: true,
    });
  };

  const HandleUpdate: SubmitHandler<UserFormData> = async (data) => {
    try {
      await updateUser(data);

      navigate("/delivers");
    } catch (error) {
      toast({
        title: "Desculpe, ocorreu um erro interno, Tente novamente mais tarde",
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (delivery) {
      setValue("codigo", delivery.codigo);
    }
  }, [delivery]);

  return (
    <>
      <Flex
        as="form"
        w="full"
        maxW={1100}
        bg="white"
        p="2rem"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(HandleUpdate as any)}
      >
        <Text as="h3" fontSize="lg" fontWeight="light" mb="1rem">
          Tempo
        </Text>

        <Center>
          <Stack direction="row" spacing="2rem">
            <Flex align="center" flexDir="column">
              <Text
                as="span"
                bg="gray.100"
                fontWeight="bold"
                fontSize="7xl"
                borderRadius="4px"
                px="1.8rem"
                py="0.8rem"
              >
                {hour}
              </Text>
              <Text fontWeight="light" fontSize="md">
                Horas
              </Text>
            </Flex>
            <Flex align="center" flexDir="column">
              <Text
                as="span"
                bg="gray.100"
                fontWeight="bold"
                fontSize="7xl"
                borderRadius="4px"
                px="1.8rem"
                py="0.8rem"
              >
                {minute}
              </Text>
              <Text fontWeight="light" fontSize="md">
                Minutos
              </Text>
            </Flex>
            <Flex align="center" flexDir="column">
              <Text
                as="span"
                bg="gray.100"
                fontWeight="bold"
                fontSize="7xl"
                borderRadius="4px"
                px="1.8rem"
                py="0.8rem"
              >
                {second}
              </Text>
              <Text fontWeight="light" fontSize="md">
                Segundos
              </Text>
            </Flex>
          </Stack>
        </Center>

        <Text as="h3" fontSize="lg" fontWeight="light" mb="1rem" mt="1rem">
          Dados
        </Text>

        <Flex flexDir={["column", "row"]} gap="2rem" mb="0.875rem">
          <Input
            label="Código"
            isReadOnly
            error={
              errors?.codigo?.message
                ? String(errors?.codigo?.message)
                : undefined
            }
            {...register("codigo")}
          />
        </Flex>

        <Flex flexDir={["column", "row"]} gap="2rem" mb="0.875rem">
          <Input
            label="Local coleta"
            error={
              errors?.localColeta?.message
                ? String(errors?.localColeta?.message)
                : undefined
            }
            {...register("localColeta")}
          />

          <Select
            label="Material"
            error={
              errors?.material?.message
                ? String(errors?.material?.message)
                : undefined
            }
            {...register("material")}
          >
            <option value="Arame">Arame</option>
            <option value="Madeira">Madeira</option>
            <option value="Ferro">Madeira</option>
            <option value="Carepa">Carepa</option>
            <option value="Plástico">Plástico</option>
            <option value="Laminado">Laminado</option>
            <option value="Escória">Escória</option>
          </Select>
        </Flex>

        <Flex flexDir={["column", "row"]} gap="2rem" mb="0.875rem">
          <Input
            label="Peso (KG)"
            type="number"
            error={
              errors?.peso?.message ? String(errors?.peso?.message) : undefined
            }
            {...register("peso")}
          />

          <Input
            label="Local Descarga"
            error={
              errors?.localDescarga?.message
                ? String(errors?.localDescarga?.message)
                : undefined
            }
            {...register("localDescarga")}
          />
        </Flex>

        <Button
          type="submit"
          mt="3rem"
          colorScheme="red"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          CONFIRMAR
        </Button>
      </Flex>
    </>
  );
}
