import {
  Box,
  Button,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
} from "@chakra-ui/react";
import { ForwardRefRenderFunction, forwardRef, useState } from "react";
import { IconType } from "react-icons";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: string;

  isPassword?: boolean;
  iconLeft?: IconType;
  iconRight?: IconType;
}

export const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = (
  { name, label, error = null, iconLeft, iconRight, isPassword, ...rest },
  ref
) => {
  const restAny = rest as any;

  const [hidePassword, setHidePassword] = useState(true);

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
          pr={isPassword || iconRight ? "2.5rem" : undefined}
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
          type={
            isPassword ? (hidePassword ? "password" : "text") : restAny.type
          }
          {...restAny}
        />

        {iconRight && !isPassword && (
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

        {isPassword && (
          <Flex position="absolute" h="full" top="0" right="0" align="center">
            <Button
              onClick={() => setHidePassword((s) => !s)}
              variant="unstyled"
              display="flex"
              alignItems="center"
            >
              {hidePassword ? (
                <Icon as={IoMdEye} fontSize="22" color="gray.500" />
              ) : (
                <Icon as={IoMdEyeOff} fontSize="22" color="gray.500" />
              )}
            </Button>
          </Flex>
        )}
      </Box>

      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
