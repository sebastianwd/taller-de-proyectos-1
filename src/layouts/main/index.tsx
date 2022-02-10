import { Box, Button, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const MainLayout = ({ children }) => {
  const router = useRouter()

  const onLogout = () => {
    localStorage.removeItem('session')

    router.push('/')
  }

  return (
    <Flex minH="100vh" direction="column">
      <Box mx="auto" flex={1} p={4} maxW={'7xl'} width="100%">
        <Button onClick={onLogout}>Cerrar sesión</Button>
        {children}
      </Box>
    </Flex>
  )
}

export default MainLayout
