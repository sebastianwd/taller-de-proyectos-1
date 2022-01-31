import React from 'react'
import Image from 'next/image'
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import axios from 'axios'

const IncidentScreen = () => {
  const router = useRouter()

  const [incident, setIncident] = React.useState<any>({})

  const { id } = router.query

  React.useEffect(() => {
    axios
      .post('https://52.188.201.143/api/v1/get_reportes_all')
      .then((response) => {
        if (response.data.data) {
          const incident = response.data.data.find(
            (item) => item.id === Number(id)
          )

          if (incident) {
            setIncident(incident)
          }
        }
      })
      .catch((e) => {
        console.error(e)

        alert('Hubo un error al cargar el incidente')
      })
  }, [id])

  return (
    <Flex
      paddingTop={10}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading marginBottom={5} as="h1" size="lg">
        Incidencia #{incident.id}
      </Heading>
      <Box w="90%" py={6}>
        <Box
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'md'}
          p={6}
          overflow={'hidden'}
        >
          <Stack>
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'xl'}
              fontFamily={'body'}
            >
              {incident.tipo_incidencia}
            </Heading>
            <Text color={'gray.200'}>{incident.descripcion}</Text>
            <Box
              paddingTop={10}
              height="500px"
              display="grid"
              gridAutoFlow="column"
              gridGap={10}
            >
              <Image
                src={
                  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                }
                width="100%"
                height="20%"
                layout="responsive"
                objectFit="contain"
                alt="prueba"
              />
              <Image
                src={
                  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                }
                width="100%"
                height="20%"
                layout="responsive"
                objectFit="contain"
                alt="prueba"
              />
            </Box>
          </Stack>
          <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
            <Avatar
              src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
              alt={'Author'}
            />
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
              <Text fontWeight={400}> Reportado por:</Text>
              <Text fontWeight={600}>{incident.nombres}</Text>
              <Text color={'gray.500'}>{incident.fecha_hora_creacion}</Text>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Flex>
  )
}

export default IncidentScreen
