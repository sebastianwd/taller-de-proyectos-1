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

const HomeScreen = () => {
  const [incidents, setIncidents] = React.useState<any[]>([])

  const router = useRouter()

  React.useEffect(() => {
    axios
      .post('https://52.188.201.143/api/v1/get_reportes_all')
      .then((response) => {
        if (response.data.data) {
          setIncidents(response.data.data)
        }
      })
      .catch((e) => {
        console.error(e)

        alert('Hubo un error al cargar el listado')
      })
  }, [])

  const onRowClick = (id: any) => {
    router.push(`/incidencias/${id}`)
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Heading marginBottom={5} as="h1" size="lg">
        Listado de incidencias
      </Heading>
      <Table variant="simple" backgroundColor="gray.900">
        <Thead>
          <Tr>
            <Th>fecha</Th>
            <Th>tipo</Th>
            <Th>descripción</Th>
            <Th>Estado</Th>
          </Tr>
        </Thead>
        <Tbody>
          {incidents.map((incident) => {
            return (
              <Tr
                cursor="pointer"
                onClick={() => onRowClick(incident.id)}
                key={incident.id}
              >
                <Td>{incident.fecha_hora_creacion}</Td>
                <Td>{incident.tipo_incidencia}</Td>
                <Td>{incident.descripcion.substring(0, 50) + '...'}</Td>
                <Td>{incident.estado_reporte}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Flex>
  )
}

export default HomeScreen
