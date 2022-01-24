import { Box, Flex } from '@chakra-ui/react'

const MainLayout = ({ children }) => {
  return (
    <Flex minH="100vh" direction="column">
      <Box mx="auto" flex={1} p={4} maxW={'7xl'} width="100%">
        {children}
      </Box>
    </Flex>
  )
}

export default MainLayout
