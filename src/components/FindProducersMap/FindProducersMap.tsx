import { Dispatch, SetStateAction } from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import styles from '@/styles/RegisterMap.module.css'
import FindProducersDraggableMarker from './FindProducersDraggableMarker'
import { User } from '../../../types'

// This component is getting the types and styles from RegisterMap. If these change, it will change this map

type Props = {
  data: any
  user: User
  setUser: Dispatch<SetStateAction<User>>
}

function FindProducersMap({ data, user, setUser }: Props) {
  return (
    <MapContainer
      className={styles.map}
      center={[user.lat, user.long]}
      zoom={5}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <FindProducersDraggableMarker setUser={setUser} />
    </MapContainer>
  )
}

export default FindProducersMap
