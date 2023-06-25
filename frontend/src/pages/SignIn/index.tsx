import {
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaLock, FaUser } from "react-icons/fa";
import * as Yup from "yup";
import { Input } from "../../components/Form/Input";
import { useAuth } from "../../hook/useAuth";

type SignInFormData = {
  cpf: string;
  senha: string;
};

const signInFormSchema = Yup.object().shape({
  cpf: Yup.string().required("CPF obrigatório"),
  senha: Yup.string().required("Senha obrigatório"),
});

export default function SignIn() {
  const { signIn } = useAuth();
  const toast = useToast();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  const { errors } = formState;

  const HandleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    const signInResponse = await signIn(data);

    if (signInResponse) {
      const { status, title } = signInResponse;

      toast({
        title: title,
        status: status,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <Box overflow="hidden">
      <Box
        display="flex"
        w="100vw"
        h="100vh"
        alignItems="center"
        justifyContent="center"
        flexDirection={["column", "column", "column", "row"]}
      >
        <Box
          w={["95%", "80%", "80%", "full"]}
          maxW={[480, 480, 480, 380]}
          mb={["8", "8", "8", "0"]}
        >
          <Box mb="6">
            <Image w="12rem" objectFit="contain" src="/public/logo.svg" />
          </Box>
          <Text as="h1" fontSize="4xl" fontWeight="bold" lineHeight={"54px"}>
            Faça seu login na plataforma
          </Text>
        </Box>
        <Flex
          as="form"
          w={["95%", "80%", "80%", "full"]}
          maxW={480}
          bg="white"
          p={["2rem", "2rem", "2rem", "4rem"]}
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(HandleSignIn as any)}
        >
          <Stack spacing="2">
            <Input
              iconLeft={FaUser}
              placeholder="CPF"
              error={
                errors?.cpf?.message ? String(errors?.cpf?.message) : undefined
              }
              {...register("cpf")}
            />
            <Input
              iconLeft={FaLock}
              placeholder="Senha"
              isPassword
              error={
                errors?.senha?.message
                  ? String(errors?.senha?.message)
                  : undefined
              }
              {...register("senha")}
            />
          </Stack>

          <Button
            type="submit"
            mt="6"
            colorScheme="red"
            size="lg"
            isLoading={formState.isSubmitting}
          >
            ACESSAR
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
