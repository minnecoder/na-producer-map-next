import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import styles from '@/styles/Map.module.css'
import L from 'leaflet'
import { useRouter } from 'next/router'
import { User } from '../../../types'

function Map(data: any) {
  const icon = L.icon({ iconUrl: '/images/marker-icon.png' })
  const router = useRouter()

  return (
    <MapContainer
      className={styles.map}
      center={[39.06, -94.57]}
      zoom={5}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {data.data.map((marker: User) => (
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
    </MapContainer>
  )
}

export default Map
