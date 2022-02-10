import React, { useEffect } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Heading,
  Select,
} from '@chakra-ui/react'
import { compareDesc } from 'date-fns'
import axios from 'axios'
import { useRouter } from 'next/router'
import { incidentTypes } from 'src/constants'
import { filter } from 'lodash'

const HomeScreen = () => {
  const [incidents, setIncidents] = React.useState<any[]>([])

  const initialIncidentsRef = React.useRef<any[]>([])

  const [incidentTypeFilter, setIncidentTypeFilter] = React.useState<string>()

  const router = useRouter()

  React.useEffect(() => {
    axios
      .post('http://52.188.201.143/api/v1/get_reportes_all')
      .then((response) => {
        if (response.data.data) {
          const sorted = response.data.data.sort((a, b) =>
            compareDesc(
              new Date(a.fecha_hora_creacion),
              new Date(b.fecha_hora_creacion)
            )
          )
          setIncidents(sorted)

          initialIncidentsRef.current = sorted
        }
      })
      .catch((e) => {
        console.error(e)

        alert('Hubo un error al cargar el listado')
      })
  }, [])

  useEffect(() => {
    if (incidentTypeFilter) {
      setIncidents(
        filter(initialIncidentsRef.current, {
          tipo_incidencia: incidentTypeFilter,
        })
      )

      return
    }

    setIncidents(initialIncidentsRef.current)
  }, [incidentTypeFilter])

  const onRowClick = (id: any) => {
    router.push(`/incidencias/${id}`)
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="flex-start"
      pt="10"
      alignItems="center"
    >
      <Heading marginBottom={5} as="h1" size="lg">
        Listado de incidencias
      </Heading>
      <Select
        placeholder="Tipo"
        w="20%"
        mr="auto"
        value={incidentTypeFilter}
        onChange={(e) => {
          const { value } = e.currentTarget

          console.log('value', value)

          setIncidentTypeFilter(value)
        }}
      >
        {Object.keys(incidentTypes).map((incidentType) => {
          return (
            <option key={incidentType} value={incidentType}>
              {incidentType}
            </option>
          )
        })}
      </Select>
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
