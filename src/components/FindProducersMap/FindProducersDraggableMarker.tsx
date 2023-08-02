import { Dispatch, SetStateAction, useState, useRef, useMemo } from 'react'
import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { User } from '../../../types'

type MeetupLocation = {
  lat: number
  long: number
}
type Props = {
  user: User
  setMeetupLocation: Dispatch<SetStateAction<MeetupLocation>>
}

export default function UpdateDraggableMarker({
  user,
  setMeetupLocation,
}: Props) {
  const icon = L.icon({
    iconUrl: 'images/marker-icon-green.png',
  })

  const [position, setPosition] = useState({
    lat: user.lat,
    lng: user.long,
  })
  const markerRef = useRef(null)

  const eventHandlers = useMemo(
    () => ({
      dragend: () => {
        const marker = markerRef.current
        if (marker != null) {
          const markerWithLatLng = marker as L.Marker & {
            getLatLng: () => L.LatLng
          }
          setPosition(markerWithLatLng.getLatLng())
          setMeetupLocation((prevUser) => ({
            ...prevUser,
            lat: markerWithLatLng.getLatLng().lat,
            long: markerWithLatLng.getLatLng().lng,
          }))
        }
      },
    }),
    [markerRef]
  )

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={icon}
    />
  )
}
