import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Flex,
  Heading,
} from '@chakra-ui/react'
import axios from 'axios'

const HomeScreen = () => {
  const [incidents, setIncidents] = React.useState<any[]>([])

  React.useEffect(() => {
    axios
      .post('http://52.188.201.143/api/v1/get_reportes_all')
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

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Heading marginBottom={5} as="h4" size="md">
        Listado de incidencias
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>fecha</Th>
            <Th>descripcion</Th>
            <Th>Estado</Th>
          </Tr>
        </Thead>
        <Tbody>
          {incidents.map((incident) => {
            return (
              <Tr key={incident.id}>
                <Td>{incident.fecha_hora_creacion}</Td>
                <Td>{incident.tipo_incidencia}</Td>
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
