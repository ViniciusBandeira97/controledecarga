import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { UserCreateAndUpdate } from "../../components/UserCreateAndUpdate";
import { useUserOne } from "../../hook/queries/useUsers";


export default function UsersCreate() {
  const { userId } = useParams();

  const {data} =useUserOne({userId})
  
  return (
    <Box  
      p='4' 
      overflow='auto' 
      h='100%'
      maxH= '100vh'    
      overflowY= 'scroll'
      pb='10rem'
    >
      <UserCreateAndUpdate type="update" user={data} />
    </Box>
);
}
