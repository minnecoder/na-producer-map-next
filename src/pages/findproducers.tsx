import Head from 'next/head'
import Header from '@/components/Header'
import FindProducersMap from '@/components/FindProducersMap'
import { ChangeEvent, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { User } from '../../types'
import styles from '../styles/FindProducers.module.css'

// Map where the location of the meetup would be
// Ability to choose distances for search area
// Displays list of producers

type MeetupLocation = {
  lat: number
  long: number
}

export default function FindProducersPage() {
  const { data: session } = useSession()
  const [allProducers, setAllProducers] = useState<User[]>([])
  const [selectedProducers, setSelectedProducers] = useState<User[]>([])
  const [user] = useState<User>({
    name: session?.user.name || '',
    email: session?.user.email || '',
    password: '',
    linkText: session?.user.linkText || '',
    lat: Number(session?.user.lat || 0),
    long: Number(session?.user.long || 0),
  })
  const [targetRange, setTargetRange] = useState<number>(25)
  const [meetupLocation, setMeetupLocation] = useState({
    lat: user.lat,
    long: user.long,
  })

  function findProducers(
    targetRange: number,
    allProducers: User[],
    meetupLocation: MeetupLocation
  ) {
    const earthRadiusInMiles = 3958.8 // Earth radius in miles

    function degreesToRadians(degrees: number): number {
      return (degrees * Math.PI) / 180
    }

    const filteredItems = allProducers.filter((item) => {
      const dLat = degreesToRadians(item.lat - meetupLocation.lat)
      const dLon = degreesToRadians(item.long - meetupLocation.long)

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreesToRadians(meetupLocation.lat)) *
          Math.cos(degreesToRadians(item.lat)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distance = earthRadiusInMiles * c

      return distance <= targetRange
    })
    setSelectedProducers(filteredItems)
  }

  const selectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setTargetRange(Number(value))
  }

  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => {
        setAllProducers(data.data)
      })
  }, [])
  return (
    <>
      <Head>
        <title>Find Producers</title>
      </Head>
      <Header />
      <div className={styles.container}>
        <h1>Find Producers</h1>
        <div className={styles.main}>
          <div className={styles.left}>
            <h3 className={styles.stepTitle}>
              Step 2: Choose the distance to search for producers
            </h3>
            <div>
              <select
                className={styles.selectbox}
                name="meetupDistance"
                id="meetupDistance"
                onChange={selectChange}
              >
                <option value="25">25 Miles</option>
                <option value="50">50 miles</option>
                <option value="100">100 miles</option>
                <option value="200">200 miles</option>
                <option value="300">300 miles</option>
              </select>

              <button
                type="button"
                className={styles.button}
                onClick={(e) =>
                  findProducers(targetRange, allProducers, meetupLocation)
                }
              >
                Find Producers
              </button>
            </div>
            <div className={styles.selectedProducers}>
              <h3>Producers within the area</h3>
              {selectedProducers.map((item) => (
                <div className={styles.selectedList}>
                  <h3>{item.name}</h3>
                  <p>{item.email}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.right}>
            <h3 className={styles.stepTitle}>
              Step 1: Choose the location of the meetup
              <span>(The green marker is the location of the meetup)</span>
            </h3>

            <FindProducersMap
              user={user}
              setMeetupLocation={setMeetupLocation}
              mapData={allProducers}
            />
          </div>
        </div>
      </div>
    </>
  )
}
