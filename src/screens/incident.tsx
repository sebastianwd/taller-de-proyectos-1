import React from 'react'
import Image from 'next/image'
import qs from 'querystring'
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Select,
  Button,
  Icon,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { incidentStates } from 'src/constants'
import { map, size } from 'lodash'
import { WhatsappIcon } from 'src/components/icons/whatsapp'
import { format } from 'date-fns'
import { Marker, StaticGoogleMap } from 'react-static-google-map'

interface Options {
  phone: string
  message: string
}

const getWhatsappUrl = ({ phone, message }: Options) => {
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
    message
  )}`
}

const IncidentScreen = () => {
  const router = useRouter()

  const [incident, setIncident] = React.useState<any>({})

  const [user, setUser] = React.useState<any>({})

  const [images, setImages] = React.useState<any>({})

  const [incidentState, setIncidentState] = React.useState<any>()

  const { id } = router.query

  React.useEffect(() => {
    axios
      .post('http://52.188.201.143/api/v1/get_reportes_all')
      .then((response) => {
        if (response.data.data) {
          const incident = response.data.data.find(
            (item) => item.id === Number(id)
          )

          if (incident) {
            setIncident(incident)

            setIncidentState(
              Object.keys(incidentStates).find(
                (incidentState) => incidentState === incident.estado_reporte
              )
            )

            axios
              .post('http://52.188.201.143/api/v1/get_user', {
                dni_usu: incident.dni_usuario,
              })
              .then((response) => {
                if (response.data.data) {
                  if (incident) {
                    setUser(response.data.data)
                  }
                }
              })
              .catch()
          }
        }
      })
      .catch((e) => {
        console.error(e)

        alert('Hubo un error al cargar el incidente')
      })

    axios
      .post('http://52.188.201.143/api/v1/get_imagenes_reportes', {
        fk_reporte: id,
      })
      .then((response) => {
        if (response.data.data) {
          setImages(response.data.data)
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }, [id])

  const onUpdateState = () => {
    axios
      .post('http://52.188.201.143/api/v1/update_reporte', {
        id_reporte: incident.id,
        estado_reporte: incidentStates[incidentState],
      })
      .then((response) => {
        if (response.data.data) {
          axios.post(
            'https://script.google.com/macros/s/AKfycbxQBqQoDnj-Nu_gt9xP_JIl8GhLBBjnq-vJNbt66iyUghQ8h1u0zi8sF-DJktTqbb-W/exec',
            qs.stringify({
              mensaje: `Tu reporte de incidente ha pasado a estado ${incidentState}`,
              formGoogleSendEmail: user.correo,
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          )

          alert('Registro actualizado correctamente')
        }
      })
      .catch((e) => {
        console.error(e)

        alert('Hubo un error al actualizar el incidente')
      })
  }

  const date =
    incident.fecha_hora_creacion &&
    format(new Date(incident.fecha_hora_creacion), 'dd/MM/yyyy hh:mmaaa')

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
      <Box w="100%" py={6}>
        <Box display="flex" alignItems="center">
          <Select
            placeholder="Estado"
            w="20%"
            value={incidentState}
            onChange={(e) => {
              const { value } = e.currentTarget

              setIncidentState(value)
            }}
          >
            {Object.keys(incidentStates).map((incidentState) => {
              return (
                <option key={incidentState} value={incidentState}>
                  {incidentState}
                </option>
              )
            })}
          </Select>
          <Button h="1.75rem" size="sm" onClick={onUpdateState}>
            Actualizar estado
          </Button>
        </Box>
        <Box
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'md'}
          p={6}
          overflow={'hidden'}
        >
          <Stack mb={6} direction={'row'} spacing={4} align={'center'}>
            <Avatar
              src={incident.img_perfil || '/placeholder.jpg'}
              alt={'Author'}
            />

            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
              <Text fontWeight={400}> Reportado por:</Text>
              <Text fontWeight={600}>{incident.nombres}</Text>
              <Text fontWeight={400}>
                Correo: {user.correo} - DNI: {user.dni_usuario}
              </Text>
              <Text color={'gray.500'}>{date}</Text>
            </Stack>
            <a
              href={getWhatsappUrl({
                phone: user.celular,
                message: `Hola, nos comunicamos por el incidente registrado en la fecha ${date}`,
              })}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button
                leftIcon={<Icon viewBox="0 0 200 200">{<WhatsappIcon />}</Icon>}
                colorScheme="whatsapp"
                variant="solid"
              >
                {user.celular}
              </Button>
            </a>
          </Stack>
          <Stack spacing={2}>
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'lg'}
              fontFamily={'body'}
            >
              {incident.tipo_incidencia}
            </Heading>
            <Text color={'gray.200'}>{incident.descripcion}</Text>
            <br />
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'md'}
              fontFamily={'body'}
            >
              Ubicación
            </Heading>
            <br />
            <Image
              width="600"
              height="300"
              layout="fixed"
              src={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/pin-m-triangle-stroked+f50505(${incident.longitud},${incident.latitud})/${incident.longitud},${incident.latitud},13,0/600x300@2x?access_token=pk.eyJ1IjoieXVhbjIxMzIxIiwiYSI6ImNremtqYW1pbDBpZjgybnFyNGhjNjlhdXYifQ.XJ9YgRS1hZmRZcuP1BVYyA`}
              alt="Mapbox Map"
            />
            <br />
            {size(images) > 0 && (
              <>
                <Heading fontSize={'md'} fontFamily={'body'}>
                  Fotos
                </Heading>
                <Box
                  height="500px"
                  display="grid"
                  gridAutoFlow="column"
                  gridGap={10}
                >
                  {map(images, (image) => {
                    return (
                      <Image
                        key={image.id}
                        src={`http://52.188.201.143/api/v1/display_image/${image.imagen}`}
                        width="100%"
                        height="20%"
                        layout="responsive"
                        objectFit="contain"
                        alt="prueba"
                      />
                    )
                  })}
                </Box>
              </>
            )}
          </Stack>
        </Box>
      </Box>
    </Flex>
  )
}

export default IncidentScreen
