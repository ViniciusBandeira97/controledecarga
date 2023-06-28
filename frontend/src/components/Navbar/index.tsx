import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaClipboardList, FaHome, FaUserFriends } from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5";
import { useAuth } from "../../hook/useAuth";
import { useDateNow } from "../../hook/useDateNow";
import { NavLink } from "./NavLink";

interface NavbarProps {
  children?: ReactNode;
}

export function Navbar({ children }: NavbarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dateNow = useDateNow();
  const { signOut } = useAuth();

  const { user } = useAuth();

  const Options = () => {
    return (
      <VStack mt="4rem" w="full" align="start">
        {user?.tipo === "motorista" ? (
          <>
            <NavLink href="/dashboard" icon={FaHome}>
              Inicio
            </NavLink>
            <NavLink href="/delivers" icon={FaClipboardList}>
              Histórico
            </NavLink>
          </>
        ) : (
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
        )}
      </VStack>
    );
  };

  return (
    <>
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

          <Options />

          <Box mt="auto">
            <Text color="white" fontWeight="light" fontSize="2xl">
              {dateNow}
            </Text>
          </Box>
        </Flex>
        <Flex flexDir="column" flex={1}>
          <Flex
            width={"full"}
            height="5rem"
            bg="white"
            justify="space-between"
            pr="4rem"
            pl="0.5rem"
            boxShadow="xl"
            align="center"
          >
            <Box>
              <Button
                colorScheme="blackAlpha"
                fontSize="6xl"
                onClick={onOpen}
                variant="ghost"
                py="2rem"
                display={["flex", "flex", "flex", "none"]}
              >
                <Icon as={IoMenu} />
              </Button>
            </Box>
            <Menu>
              <MenuButton>
                <Flex align={"center"}>
                  <Avatar size="lg" bg="#11111d" color="white" />
                  <Text fontSize="2xl" fontWeight="bold" ml="2">
                    {`${user?.nome} ${user?.sobrenome}`}
                  </Text>
                </Flex>
              </MenuButton>
              <MenuList zIndex="1000">
                <MenuGroup>
                  <MenuItem onClick={signOut}>Sair </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Flex>
          <Box maxW="100vw">{children}</Box>
        </Flex>
      </Flex>

      <Drawer placement={"left"} size="sm" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="#11111d">
          <DrawerHeader>
            <Flex justify="space-between" align="center" w="full" gap="1rem">
              <HStack w="full">
                <Image w="4rem" objectFit="contain" src="/public/logo.svg" />
                <Text color="white" fontWeight="bold" fontSize="2xl">
                  PH Transporte
                </Text>
              </HStack>

              <Button
                colorScheme="whiteAlpha"
                fontSize="6xl"
                onClick={onClose}
                variant="ghost"
                py="2rem"
              >
                <Icon as={IoClose} />
              </Button>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Options />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
