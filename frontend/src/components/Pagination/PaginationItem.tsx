import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  isCurrent?: boolean;
  number: number;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  number,
  onPageChange,
  isCurrent,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        _hover={{ cursor: "auto" }}
        colorScheme="blue"
        bg="red.500"
        variant="solid"
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      mx="2"
      onClick={() => {
        window.scrollTo(0, 0);
        onPageChange(number);
      }}
    >
      {number}
    </Button>
  );
}
