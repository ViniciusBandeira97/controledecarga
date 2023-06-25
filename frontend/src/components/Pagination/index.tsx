import { Box, Button, Flex } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  onPageChange: (page: number) => void;
  currentPage?: number;
  pageSize?: number;
  totalRegisters: number;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({
  onPageChange,
  currentPage = 1,
  pageSize = 10,
  totalRegisters,
}: PaginationProps) {
  const lastPage = Math.ceil(totalRegisters / pageSize);
  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  function handleNextPage() {
    onPageChange(currentPage + 1);
    window.scrollTo(0, 0);
  }
  function handlePreviousPage() {
    onPageChange(currentPage - 1);
    window.scrollTo(0, 0);
  }

  return (
    <Flex w="full" justify="center">
      <Flex align="center" flexDirection={["column", "column", "row", "row"]}>
        {previousPages.length > 0 && (
          <Button
            w="full"
            bg="white"
            mb={["4", 0, 0, 0]}
            fontWeight="400"
            leftIcon={<IoIosArrowBack />}
            colorScheme="red"
            variant="ghost"
            color="red.500"
            onClick={handlePreviousPage}
            disabled={previousPages.length <= 0}
          >
            Anterior
          </Button>
        )}

        <Flex align="center">
          {currentPage > 1 + siblingsCount && (
            <>
              <PaginationItem onPageChange={onPageChange} number={1} />
              {currentPage > 2 + siblingsCount && (
                <Box
                  style={{
                    alignItems: "center",
                    marginLeft: "2",
                    textAlign: "center",
                    height: 32,
                    width: 32,
                  }}
                >
                  ...
                </Box>
              )}
            </>
          )}

          {previousPages.length > 0 &&
            previousPages.map((page) => (
              <PaginationItem
                onPageChange={onPageChange}
                number={page}
                key={page}
              />
            ))}

          <PaginationItem
            number={currentPage}
            isCurrent
            onPageChange={onPageChange}
          />

          {nextPages.length > 0 &&
            nextPages.map((page) => (
              <PaginationItem
                onPageChange={onPageChange}
                number={page}
                key={page}
              />
            ))}

          {currentPage + siblingsCount < lastPage && (
            <>
              {currentPage + 1 + siblingsCount < lastPage && (
                <Box
                  style={{
                    alignItems: "center",
                    marginLeft: "2",
                    textAlign: "center",
                    height: 32,
                    width: 32,
                  }}
                >
                  ...
                </Box>
              )}

              <PaginationItem onPageChange={onPageChange} number={lastPage} />
            </>
          )}
        </Flex>

        {nextPages.length > 0 && (
          <Button
            w="full"
            bg="white"
            mt={["4", 0, 0, 0]}
            fontWeight="400"
            rightIcon={<IoIosArrowForward />}
            colorScheme="red"
            variant="ghost"
            color="red.500"
            onClick={handleNextPage}
            disabled={nextPages.length <= 0}
          >
            Proximo
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
