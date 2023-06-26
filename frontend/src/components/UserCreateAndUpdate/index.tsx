import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Input } from "../../components/Form/Input";
import { Select } from "../../components/Form/Select";
import { User } from "../../hook/queries/useUsers";
import { useAuth } from "../../hook/useAuth";
import api from "../../service/api";

type UserFormData = {
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



interface UserCreateAndUpdateProps {
  type: 'update'|'create'
  user?:User
}

export function UserCreateAndUpdate({type,user}: UserCreateAndUpdateProps) {
  const navigate = useNavigate()

  const userFormSchema = Yup.object().shape({
    cpf: Yup.string().required("CPF obrigatório"),
    matricula: Yup.string().required("Matricula obrigatório"),
    nome: Yup.string().required("Nome obrigatório"),
    sobrenome: Yup.string().required("Sobrenome obrigatório"),
    genero: Yup.string().required("Gênero obrigatório"),
    dataNascimento: Yup.string().required("Data Nascimento obrigatório"),
    telefone: Yup.string().required("Telefone obrigatório"),
    endereco: Yup.string().required("Endereço obrigatório"),
    estado: Yup.string().required("Estado obrigatório"),
    cidade: Yup.string().required("Cidade obrigatório"),
    cep: Yup.string().required("Cep obrigatório"),
    tipo: Yup.string().required("Tipo obrigatório"),
    senha: type === 'create'?Yup.string().required("Senha obrigatório"): Yup.string(),
  });

  const toast = useToast();
  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(userFormSchema),
  });
  const { errors } = formState;

  const {user: userAuth} = useAuth()

  const createUser = async (data:UserFormData)  => {
    await api.post('/users', {...data, dataNascimento: new Date(data.dataNascimento)})

    toast({
      title: 'Usuário criado com sucesso!',
      status: 'success',
      position: "top",
      isClosable: true,
    });
    
  };
  
  const updateUser = async (data:UserFormData) => {
    
    await api.put(`/users/${user?.id}`, {...data, dataNascimento: new Date(data.dataNascimento)})

    toast({
      title: 'Usuário alterado com sucesso!',
      status: 'success',
      position: "top",
      isClosable: true,
    });
  };

  const HandleCreateOrUpdate: SubmitHandler<UserFormData> = async (data) => {
    try {   
      if(type==='create'){
        await createUser(data)
      }else {
        await updateUser(data)
      }

      navigate('/users')
    } catch (error) {
      toast({
        title: 'Desculpe, ocorreu um erro interno, Tente novamente mais tarde',
        status: 'error',
        position: "top",
        isClosable: true,
      });
    }
  };

  useEffect(()=>{
    if(type ==='update' && user){    

      
      const dataNascimento = new Date(user.dataNascimento);

      const day = ("00" + Number(dataNascimento.getDate() + 1)).slice(-2)
      const month = ("00" + Number(dataNascimento.getMonth() + 1)).slice(-2)
      const year = dataNascimento.getFullYear()
      
      setValue('cpf', user.cpf)
      setValue('matricula', user.matricula)
      setValue('nome', user.nome)
      setValue('sobrenome', user.sobrenome)
      setValue('genero', user.genero)
      setValue('dataNascimento', `${year}-${month}-${day}`)
      setValue('telefone', user.telefone)
      setValue('endereco', user.endereco)
      setValue('estado', user.estado)
      setValue('cidade', user.cidade)
      setValue('cep', user.cep)
      setValue('tipo', user.tipo)
    }
  }, [type, user])

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
        onSubmit={handleSubmit(userAuth?.tipo === 'administrador' ?HandleCreateOrUpdate as any: () => null)}
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
           <Select 
              label="Gênero"
              error={
                errors?.genero?.message
                  ? String(errors?.genero?.message)
                  : undefined
              }
              {...register("genero")}
            >
              <option value='masculino'>Masculino</option>
              <option value='feminino'>Feminino</option>
              <option value='outro'>Outro</option>
            </Select>
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
              label="Matricula"
              error={
                errors?.matricula?.message ? String(errors?.matricula?.message) : undefined
              }
              {...register("matricula")}
            />
        </Flex>
        
        <Flex flexDir={['column', 'row']} gap="2rem" mt='0.875rem' >
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

        {
          userAuth?.tipo === 'administrador' && (
            <Button
              type="submit"
              mt="3rem"
              colorScheme="red"
              size="lg"
              isLoading={formState.isSubmitting}
            >
              {type ==='update' ?'ALTERAR':'CADASTRAR'}
            </Button>
          )
        }

    
      </Flex>
  
    </>
  )
  
}