import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Heading,
} from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'

const IncidentScreen = () => {
  const router = useRouter()

  const { id } = router.query

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Heading marginBottom={5} as="h1" size="lg">
        Incidencia {id}
      </Heading>
    </Flex>
  )
}

export default IncidentScreen
