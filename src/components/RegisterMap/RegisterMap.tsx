import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import styles from '@/styles/RegisterMap.module.css'
import DraggableMarker from '../DraggableMarker'
import { Dispatch, SetStateAction } from 'react'
import { Register } from '../../../types'

type Props = {
  user: Register
  setUser: Dispatch<SetStateAction<Register>>
}

function RegisterMap({ user, setUser }: Props) {
  return (
    <MapContainer
      className={styles.map}
      center={[39.06, -94.57]}
      zoom={5}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <DraggableMarker user={user} setUser={setUser} />
    </MapContainer>
  )
}

export default RegisterMap
