import { Box, Button, Flex } from '@chakra-ui/react'
import { useSession } from 'src/hooks/use-session'
import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'

const MainLayout = ({ children }) => {
  const router = useRouter()

  const [session, setSession] = useSession()

  const [loading, setLoading] = React.useState(true)

  const onLogout = () => {
    setSession(null)

    router.push('/')
  }

  React.useEffect(() => {
    if (!loading) {
      return
    }

    if (!session) {
      router.push('/').then(() => setLoading(false))
    }

    setLoading(false)
  }, [loading, router, session])

  return (
    <Flex minH="100vh" direction="column">
      <Box
        mx="auto"
        flex={1}
        p={4}
        maxW={'7xl'}
        width="100%"
        display="flex"
        flexDirection="column"
      >
        {session && (
          <Box display="flex">
            <Box w="auto">
              <Link href="/dashboard">
                <a style={{ textDecoration: 'underline' }}>Listado</a>
              </Link>
            </Box>
            <Box ml="auto" w="auto">
              <Button onClick={onLogout}>Cerrar sesión</Button>
            </Box>
          </Box>
        )}
        {!loading && children}
      </Box>
    </Flex>
  )
}

export default MainLayout
