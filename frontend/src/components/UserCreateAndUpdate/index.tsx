import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Input } from "../../components/Form/Input";
import { Select } from "../../components/Form/Select";

type SignInFormData = {
  matricula: string
  cpf: string
  nome: string
  sobrenome: string
  genero: string
  dataNascimento: Date
  telefone: string
  endereco: string
  estado: string
  cidade: string
  cep: string
  tipo: string
  senha: string
};

const signInFormSchema = Yup.object().shape({
  cpf: Yup.string().required("CPF obrigatório"),
  matricula: Yup.string().required("Matricula obrigatório"),
  nome: Yup.string().required("Nome obrigatório"),
  sobrenome: Yup.string().required("Sobrenome obrigatório"),
  genero: Yup.string().required("Gênero obrigatório"),
  dataNascimento: Yup.string().required("DataNascimento obrigatório"),
  telefone: Yup.string().required("Telefone obrigatório"),
  endereco: Yup.string().required("Endereço obrigatório"),
  estado: Yup.string().required("Estado obrigatório"),
  cidade: Yup.string().required("Cidade obrigatório"),
  cep: Yup.string().required("Cep obrigatório"),
  tipo: Yup.string().required("Tipo obrigatório"),
  senha: Yup.string().required("Senha obrigatório"),
});

interface UserCreateAndUpdateProps {
  type: 'update'|'create'
}

export function UserCreateAndUpdate({type}: UserCreateAndUpdateProps) {

  const toast = useToast();
  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  const { errors } = formState;

  const HandleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    
    toast({
      title: 'submit',
      status: 'error',
      position: "top",
      isClosable: true,
    });
  };

  useEffect(()=>{
    if(type ==='update'){
      console.log('editar');
      setValue('nome', 'Fulano')
      setValue('tipo', 'administrador')
      
    }
  }, [type])

  return(
    <>
      <Flex  align='center' mb='2rem'>

      <Link to={'/users'}>
        <Button 
          as='div'
          leftIcon={<MdKeyboardBackspace />} 
          colorScheme='blackAlpha' 
          variant='ghost'
          color='black'
          fontSize='3xl'
          mr='2'
        >
        </Button>
      </Link>

      <Text as='h1' fontSize='2xl' fontWeight='bold'>
        {type==='create' ?'Criar':'Alterar'} Usuário
      </Text>
      </Flex>

      <Flex
        as="form"
        w='full'
        maxW={1100}
        bg="white"
        p='2rem'
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(HandleSignIn as any)}
      >
        <Text as='h3' fontSize='lg' fontWeight='light' mb='1rem'>
          Dados pessoais
        </Text>

        <Flex flexDir={['column', 'row']} gap="2rem" >
          <Input
            label="Nome"
            error={
              errors?.nome?.message ? String(errors?.nome?.message) : undefined
            }
            {...register("nome")}
          />
          <Input
            label="Sobrenome"
            error={
              errors?.sobrenome?.message ? String(errors?.sobrenome?.message) : undefined
            }
            {...register("sobrenome")}
          />
        </Flex>
        <Flex flexDir={['column', 'row']} gap="2rem" mt='0.875rem'>
          <Input
            label="Gênero"
            error={
              errors?.genero?.message ? String(errors?.genero?.message) : undefined
            }
            {...register("genero")}
          />
          <Input
            label="Data Nascimento"
            type="date"
            error={
              errors?.dataNascimento?.message ? String(errors?.dataNascimento?.message) : undefined
            }
            {...register("dataNascimento")}
          />
        </Flex>
        <Flex flexDir={['column', 'row']} gap="2rem" mt='0.875rem'>
          <Input
            label="CPF"
            error={
              errors?.cpf?.message ? String(errors?.cpf?.message) : undefined
            }
            {...register("cpf")}
          />
          <Input
            label="Telefone"
            error={
              errors?.telefone?.message ? String(errors?.telefone?.message) : undefined
            }
            {...register("telefone")}
          />
        </Flex>

        <Text as='h3' fontSize='lg' fontWeight='light' mt='1rem'>
          Localidade
        </Text>

        <Flex flexDir={['column', 'row']} gap="2rem" mt='0.875rem'>
          <Input
            label="Endereço"
            error={
              errors?.endereco?.message ? String(errors?.endereco?.message) : undefined
            }
            {...register("endereco")}
          />
          <Input
            label="Estado"
            error={
              errors?.estado?.message ? String(errors?.estado?.message) : undefined
            }
            {...register("estado")}
          />
        </Flex>
        <Flex flexDir={['column', 'row']} gap="2rem" mt='0.875rem'>
          <Input
            label="Cidade"
            error={
              errors?.cidade?.message ? String(errors?.cidade?.message) : undefined
            }
            {...register("cidade")}
          />
          <Input
            label="CEP"
            error={
              errors?.cep?.message ? String(errors?.cep?.message) : undefined
            }
            {...register("cep")}
          />
        </Flex>

        <Text as='h3' fontSize='lg' fontWeight='light' my='1rem'>
          Dados acesso
        </Text>
        
        <Flex flexDir={['column', 'row']} gap="2rem" >
          <Input
              label="Senha"
              isPassword
              error={
                errors?.senha?.message
                  ? String(errors?.senha?.message)
                  : undefined
              }
              {...register("senha")}
            />
            <Select 
              label="Tipo"
              error={
                errors?.tipo?.message
                  ? String(errors?.tipo?.message)
                  : undefined
              }
              {...register("tipo")}
            >
              <option value='administrador'>Administrador</option>
              <option value='motorista'>Motorista</option>
              <option value='administrativo'>Administrativo</option>
            </Select>
          </Flex>


        <Button
          type="submit"
          mt="3rem"
          colorScheme="red"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          {type ==='update' ?'ALTERAR':'CADASTRAR'}
        </Button>
      </Flex>
  
    </>
  )
  
}