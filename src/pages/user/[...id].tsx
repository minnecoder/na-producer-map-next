import Head from 'next/head'
import React from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/UserProfile.module.css'
import UserMap from '../../components/UserMap'
import Header from '@/components/Header'

export default function UserProfile() {
  const router = useRouter()
  const { data } = router.query

  let userData
  if (!data) {
    userData = {}
  } else {
    userData = JSON.parse(data as string)
  }

  return (
    <>
      <Head>
        <title>User Profile</title>
      </Head>
      <Header />
      <main>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.infoTitles}>
              <p>Name</p>
              <p>Email</p>
              <p>Peerage</p>
              <p>Phone number</p>
              <p>Facebook</p>
              <p>Twitter</p>
              <p>Instagram</p>
              <p>LinkedIn</p>
              <p>YouTube</p>
              <p>NA Social</p>
              <p>Website</p>
            </div>
            <div className={styles.infoItems}>
              <p>{userData.name}</p>
              <p>{userData.email}</p>
              <p>{userData.peerage || 'Not Available'}</p>
              <p>{userData.phone || 'Not Available'}</p>
              <p>{userData.facebook || 'Not Available'}</p>
              <p>{userData.twitter || 'Not Available'}</p>
              <p>{userData.instagram || 'Not Available'}</p>
              <p>{userData.linkedin || 'Not Available'}</p>
              <p>{userData.youtube || 'Not Available'}</p>
              <p>{userData.nasocial || 'Not Available'}</p>
              <p>{userData.website || 'Not Available'}</p>
            </div>
          </div>
          <div className={styles.right}>
            <UserMap user={userData} />
          </div>
        </div>
      </main>
    </>
  )
}
