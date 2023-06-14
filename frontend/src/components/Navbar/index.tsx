import {
  Avatar,
  Box,
  Link as CharkraLink,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "./NavLink";

interface NavbarProps {
  children?: ReactNode;
}

export function Navbar({ children }: NavbarProps) {
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
      >
        <HStack>
          <Image w="4rem" objectFit="contain" src="/public/logo.svg" />
          <Text color="white" fontWeight="bold" fontSize="2xl">
            PH Transporte
          </Text>
        </HStack>

        <VStack mt="4rem">
          <NavLink href="/dashboard">dashboard</NavLink>
          <NavLink href="/users">usuarios</NavLink>
        </VStack>
      </Flex>
      <Flex flexDir="column" flex={1}>
        <Flex
          width={"full"}
          height="5rem"
          bg="white"
          justify="space-between"
          px="4rem"
        >
          <Box></Box>
          <Menu>
            <MenuButton>
              <Flex align={"center"}>
                <Avatar size="lg" name={"Fulano"} bg="#ee3239" />
                <Text fontSize="2xl" fontWeight="bold" ml="2">
                  {"Fulano"}
                </Text>
              </Flex>
            </MenuButton>
            <MenuList zIndex="1000">
              <MenuGroup title="Perfil">
                <MenuItem>
                  <Link to="/conta">
                    <CharkraLink _hover={{ textDecoration: "none" }}>
                      Minha conta
                    </CharkraLink>
                  </Link>
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    alert("sair");
                  }}
                >
                  Sair{" "}
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </Flex>
        {children}
      </Flex>
    </Flex>
  );
}
