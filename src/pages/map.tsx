import Head from 'next/head'
import Map from '@/components/Map'
import Header from '@/components/Header'

function MapPage() {
  return (
    <>
      <Head>
        <title>Map</title>
      </Head>
      <Header />
      <Map />
    </>
  )
}

export default MapPage
