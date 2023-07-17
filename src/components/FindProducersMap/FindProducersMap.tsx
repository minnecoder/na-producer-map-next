import { Dispatch, SetStateAction } from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import styles from '@/styles/RegisterMap.module.css'
import router from 'next/router'
import L from 'leaflet'
import FindProducersDraggableMarker from './FindProducersDraggableMarker'
import { User } from '../../../types'

// This component is getting the types and styles from RegisterMap. If these change, it will change this map

type MeetupLocation = {
  lat: number
  long: number
}
type Props = {
  user: User
  setMeetupLocation: Dispatch<SetStateAction<MeetupLocation>>
  mapData: User[]
}

function FindProducersMap({ user, setMeetupLocation, mapData }: Props) {
  const icon = L.icon({ iconUrl: '/images/marker-icon.png' })

  return (
    <MapContainer
      className={styles.map}
      center={[user.lat, user.long]}
      zoom={5}
      scrollWheelZoom={true}
    >
      {mapData.map((marker: User) => (
        <Marker
          key={marker.email}
          position={[marker.lat, marker.long]}
          icon={icon}
        >
          <Popup>
            <div>
              <h3>{marker.name}</h3>
              <h4>{marker.email}</h4>
              <p>{marker.linkText}</p>
              <button
                type="button"
                onClick={() =>
                  router.push(
                    {
                      pathname: `/user/${marker.linkText}`,
                      query: { data: JSON.stringify(marker) },
                    },
                    `/user/${marker.linkText}`
                  )
                }
              >
                View Profile
              </button>
            </div>
          </Popup>
        </Marker>
      ))}

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <FindProducersDraggableMarker setMeetupLocation={setMeetupLocation} />
    </MapContainer>
  )
}

export default FindProducersMap
