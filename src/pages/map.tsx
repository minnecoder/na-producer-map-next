import Head from 'next/head'
import Map from '@/components/Map'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import { User } from '../../types'

function MapPage() {
  const [mapData, setMapData] = useState<User[]>([])
  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => {
        setMapData(data.data)
      })
  }, [])
  return (
    <>
      <Head>
        <title>Map</title>
      </Head>
      <Header />
      <Map data={mapData} />
    </>
  )
}

export default MapPage
