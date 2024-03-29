import { Dispatch, SetStateAction, useState, useRef, useMemo } from 'react'
import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Update } from '../../../types'

type Props = {
  user: Update
  setUser: Dispatch<SetStateAction<Update>>
}
export default function UpdateDraggableMarker({ user, setUser }: Props) {
  const icon = L.icon({ iconUrl: '/images/marker-icon.png' })

  const [position, setPosition] = useState({ lat: user.lat, lng: user.long })
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
          setUser((prevUser) => ({
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
    >
      <Popup minWidth={90}>
        <span>
          {`Latitude: ${position.lat.toFixed(
            4
          )}°, Longitude: ${position.lng.toFixed(4)}°`}
        </span>
      </Popup>
    </Marker>
  )
}
