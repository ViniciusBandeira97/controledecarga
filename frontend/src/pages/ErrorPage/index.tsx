import { Flex, Text } from "@chakra-ui/react";

export default function ErrorPage() {
  return (
    <Flex h="80vh" flexDir="column" justify="center" align="center">
      <Text as="h1" fontSize="9xl" fontWeight="bold">
        404!
      </Text>
      <Text fontSize="2xl" fontWeight="light">
        Desculpe, esta rota não existe.
      </Text>
    </Flex>
  );
}
