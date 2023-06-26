import { Box } from "@chakra-ui/react";
import { UserCreateAndUpdate } from "../../components/UserCreateAndUpdate";


export default function UsersCreate() {

  return (
    <Box  
      p='2rem'
      overflow='auto' 
      h='100%'
      maxH= '100vh'    
      overflowY= 'scroll'
      pb='10rem'
    >
      <UserCreateAndUpdate type="create" />
    </Box>
);
}
