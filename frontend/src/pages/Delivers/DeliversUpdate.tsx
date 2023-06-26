import { Box, Flex, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { DeliveryUpdate } from "../../components/DeliveryUpdate";
import { useDeliveryOne } from "../../hook/queries/useDelivers";


export default function UsersCreate() {
  const { cod } = useParams();

  const {data} =useDeliveryOne({cod:cod?Number(cod):undefined})
  
  return (
    <Box  
      p='2rem'
      overflow='auto' 
      h='100%'
      maxH= '100vh'    
      overflowY= 'scroll'
      pb='10rem'
    >
      <Flex  align='center' mb='2rem'>
        <Text as='h1' fontSize='2xl' fontWeight='bold'>
          Finalizar Entrega
        </Text>
      </Flex>

      {data && <DeliveryUpdate delivery={data} />}
    </Box>
);
}
