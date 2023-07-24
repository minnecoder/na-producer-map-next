import { Dispatch, SetStateAction } from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import styles from '@/styles/RegisterMap.module.css'

import L from 'leaflet'
import { User } from '../../../types'

const icon = L.icon({ iconUrl: '/images/marker-icon.png' })
// This component is getting the types and styles from RegisterMap. If these change, it will change this map

type Props = {
  user: User
}

function UserMap({ user }: Props) {
  return (
    <MapContainer
      className={styles.map}
      center={[user.lat, user.long]}
      zoom={5}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[user.lat, user.long]} icon={icon} />
    </MapContainer>
  )
}

export default UserMap
