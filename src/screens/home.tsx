/* eslint-disable no-empty */
/* eslint-disable react/no-children-prop */
import { useState } from 'react'
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from '@chakra-ui/react'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import axios from 'axios'
import { useRouter } from 'next/router'

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

const HomeScreen = () => {
  const [showPassword, setShowPassword] = useState(false)

  const [user, setUser] = useState<string>()

  const router = useRouter()

  const [password, setPassword] = useState<string>()

  const handleShowClick = () => setShowPassword(!showPassword)

  const login = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://52.188.201.143/api/v1/login', {
        dni_usu: user,
        password,
        tipo_usuario: 1,
      })
    } catch {}

    router.push('/dashboard')
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Bienvenido</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form onSubmit={login}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    placeholder="Ingrese DNI"
                    onChange={(e) => setUser(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Ingrese contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? 'Ocultar' : 'Mostrar'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right"></FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Ingresar
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}

export default HomeScreen
