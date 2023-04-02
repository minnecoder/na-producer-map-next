import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import styles from "@/styles/Map.module.css";
import L from "leaflet";

function Map() {
  const icon = L.icon({ iconUrl: "/images/marker-icon.png" });

  return (
    <MapContainer
      className={styles.map}
      center={[39.06, -94.57]}
      zoom={5}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={[44.986656, -93.258133]} icon={icon}>
        <Popup>Minneapolis</Popup>
        <Tooltip>Minneapolis</Tooltip>
      </Marker>
      <Marker position={[39.7392358, -104.990251]} icon={icon}>
        <Popup>Denver</Popup>
        <Tooltip>Denver</Tooltip>
      </Marker>
      <Marker position={[41.8781136, -87.6297982]} icon={icon}>
        <Popup>Chicago</Popup>
        <Tooltip>Chicago</Tooltip>
      </Marker>
      <Marker position={[40.7127753, -74.0059728]} icon={icon}>
        <Popup>New York</Popup>
        <Tooltip>New York</Tooltip>
      </Marker>
    </MapContainer>
  );
}

export default Map;
