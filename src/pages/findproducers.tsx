import Head from 'next/head'
import Header from '@/components/Header'
import FindProducersMap from '@/components/FindProducersMap'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { User } from '../../types'
import styles from '../styles/FindProducers.module.css'

// Map where the location of the meetup would be
// Ability to choose distances for search area
// Displays list of producers

export default function FindProducersPage() {
  const { data: session } = useSession()
  const [mapData, setMapData] = useState<User[]>([])
  const [user, setUser] = useState<User>({
    name: session?.user.name || '',
    email: session?.user.email || '',
    password: '',
    linkText: session?.user.linkText || '',
    lat: Number(session?.user.lat || ''),
    long: Number(session?.user.long || ''),
  })
  console.log(session)

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
        <title>Find Producers</title>
      </Head>
      <Header />
      <div className={styles.container}>
        <div className={styles.left}>
          <h1>Find Producers Map</h1>
          <div>
            <label htmlFor="meetupDistance">
              Choose the distance to search for producers
              <select name="meetupDistance" id="meetupDistance">
                <option value="25miles">25 Miles</option>
                <option value="50miles">50 miles</option>
                <option value="100miles">100 miles</option>
                <option value="200miles">200 miles</option>
                <option value="300miles">300 miles</option>
              </select>
            </label>
          </div>
        </div>
        <div className={styles.right}>
          <FindProducersMap user={user} setUser={setUser} mapData={mapData} />
        </div>
      </div>
    </>
  )
}
