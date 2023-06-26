import {
  Avatar,
  Box,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaClipboardList, FaHome, FaUserFriends } from "react-icons/fa";
import { useAuth } from "../../hook/useAuth";
import { NavLink } from "./NavLink";

interface NavbarProps {
  children?: ReactNode;
}

export function Navbar({ children }: NavbarProps) {
  const { signOut } = useAuth();

  const {user} = useAuth()

  return (
    <Flex>
      <Flex
        height="100vh"
        w="23rem"
        bg="#11111d"
        display={["none", "none", "none", "flex"]}
        flexDir="column"
        align="center"
        py="6"
        px="3rem"
      >
        <HStack w="full">
          <Image w="4rem" objectFit="contain" src="/public/logo.svg" />
          <Text color="white" fontWeight="bold" fontSize="2xl">
            PH Transporte
          </Text>
        </HStack>

        <VStack mt="4rem" w="full" align="start">
          {
            user?.tipo === 'motorista' 
            ? (
              <>
                 <NavLink href="/dashboard" icon={FaHome}>
                    Inicio
                  </NavLink>
                  <NavLink href="/delivers" icon={FaClipboardList}>
                    Histórico
                  </NavLink>
              </>
            )
            :(
              <>
               <NavLink href="/dashboard" icon={FaHome}>
                  Inicio
                </NavLink>
                <NavLink href="/users" icon={FaUserFriends}>
                  Usuários
                </NavLink>
                <NavLink href="/delivers" icon={FaClipboardList}>
                  Histórico
                </NavLink>
              </>
            )
          }

        </VStack>
      </Flex>
      <Flex flexDir="column" flex={1}>
        <Flex
          width={"full"}
          height="5rem"
          bg="white"
          justify="space-between"
          px="4rem"
          boxShadow='xl'
        >
          <Box></Box>
          <Menu>
            <MenuButton>
              <Flex align={"center"}>
                <Avatar size="lg" name={`${user?.nome} ${user?.sobrenome}`} bg="#ee3239" />
                <Text fontSize="2xl" fontWeight="bold" ml="2">
                  {`${user?.nome} ${user?.sobrenome}`}
                </Text>
              </Flex>
            </MenuButton>
            <MenuList zIndex="1000">
              <MenuGroup

              // title="Perfil"
              >
                {/* <MenuItem>
                  <Link to="/conta">
                    <CharkraLink _hover={{ textDecoration: "none" }}>
                      Minha conta
                    </CharkraLink>
                  </Link>
                </MenuItem>
                <MenuDivider /> */}
                <MenuItem onClick={signOut}>Sair </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </Flex>
        {children}
      </Flex>
    </Flex>
  );
}
