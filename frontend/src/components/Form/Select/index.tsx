import {
  Box,
  Select as ChakraInput,
  SelectFieldProps as ChakraInputProps,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon
} from "@chakra-ui/react";
import { ForwardRefRenderFunction, ReactNode, forwardRef } from "react";
import { IconType } from "react-icons";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: string;

  children: ReactNode

  iconLeft?: IconType;
  iconRight?: IconType;
}

export const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = (
  { name, label, error = null, iconLeft, iconRight, children, ...rest },
  ref
) => {
  const restAny = rest as any;


  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <Box position="relative">
        {iconLeft && (
          <Flex
            w="40px"
            h="34px"
            align="center"
            justify="center"
            position="absolute"
            top="1.5"
            left="0"
            zIndex={1}
          >
            <Icon as={iconLeft} color="gray.500" />
          </Flex>
        )}

        <ChakraInput
          id={name}
          name={name}
          pl={iconLeft ? "2.5rem" : undefined}
          pr={ iconRight ? "2.5rem" : undefined}
          focusBorderColor="gray.900"
          borderColor="gray.100"
          bgColor="gray.50"
          variant="filled"
          _hover={{
            bgColor: "gray.50",
          }}
          color="gray.900"
          size="lg"
          ref={ref}
          
          {...restAny}
        >
          <option value='' selected disabled>Selecionar...</option>
          {children}
        </ChakraInput>

        {iconRight && (
          <Flex
            w="40px"
            h="34px"
            align="center"
            justify="center"
            position="absolute"
            top="1.5"
            right="0"
            zIndex={1}
          >
            <Icon as={iconRight} color="gray.500" />
          </Flex>
        )}

 
      </Box>

      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export const Select = forwardRef(InputBase);
