import {
  LinkProps as ChakraLinkProps,
  Link as CharkraLink,
} from "@chakra-ui/react";
import { ActiveLink } from "./ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
  children: string;
  href: string;
}

export function NavLink({ href, children, ...rest }: NavLinkProps) {
  return (
    <ActiveLink to={href}>
      <CharkraLink
        h="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        fontSize="large"
        _hover={{ textDecoration: "none" }}
        {...(rest as any)}
      >
        {children}
      </CharkraLink>
    </ActiveLink>
  );
}
