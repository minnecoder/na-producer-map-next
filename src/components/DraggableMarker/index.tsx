import { useState, useRef, useMemo } from 'react'
import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Dispatch, SetStateAction } from 'react'
import { Register } from '../../../types'

type Props = {
  user: Register
  setUser: Dispatch<SetStateAction<Register>>
}

export default function DraggableMarker({ user, setUser }: Props) {
  const icon = L.icon({ iconUrl: '/images/marker-icon.png' })

  const [position, setPosition] = useState({ lat: 43.0, lng: -96.0 })
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
          setUser({
            ...user,
            lat: markerWithLatLng.getLatLng().lat,
            long: markerWithLatLng.getLatLng().lng,
          })
        }
      },
    }),
    []
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
