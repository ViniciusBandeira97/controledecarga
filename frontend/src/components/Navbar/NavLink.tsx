import {
  LinkProps as ChakraLinkProps,
  Link as CharkraLink,
  Icon,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { ActiveLink } from "./ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
  children: ReactNode;
  href: string;
  icon: IconType;
}

export function NavLink({
  href,
  children,
  icon: IconNav,
  ...rest
}: NavLinkProps) {
  return (
    <ActiveLink to={href}>
      <CharkraLink
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="2xl"
        _hover={{ textDecoration: "none" }}
        {...(rest as any)}
      >
        <Icon as={IconNav} mr="4" fontSize="3xl" />

        {children}
      </CharkraLink>
    </ActiveLink>
  );
}
