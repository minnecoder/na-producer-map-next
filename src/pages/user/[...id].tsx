import { useSession } from 'next-auth/react'
import Head from 'next/head'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { sanitize } from 'dompurify'
import TextInput from '@/components/TextInput'
import styles from '@/styles/UserProfile.module.css'
import UpdateMap from '../../components/UpdateMap'
import { Update } from '../../../types'

export default function UserProfile() {
  const router = useRouter()
  const { data: session } = useSession()
  if (!session) {
    throw new Error('No session data')
  }
  const [user, setUser] = useState<Update>({
    name: session?.user.name,
    email: session?.user.email,
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    linkText: session?.user.linkText,
    lat: Number(session?.user.lat),
    long: Number(session?.user.long),
  })
  const errors = {
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  }
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const sanitizeData = (dirtyUser: Update) => {
    for (const [value] of Object.entries(dirtyUser)) {
      sanitize(value)
    }
    return dirtyUser
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()

    if (user.newPassword !== user.confirmNewPassword) {
      setErrorMessage('New Passwords are different')
      return
    }

    sanitizeData(user)

    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        currentPassword: user.currentPassword,
        newPassword: user.newPassword,
        confirmNewPassword: user.confirmNewPassword,
        linkText: user.linkText,
        lat: user.lat,
        long: user.long,
      }),
    }).then((res) => res.json())

    if (response.error) {
      setErrorMessage(response.error)
    }

    if (response.success) {
      router.push('/map')
    }
  }

  return (
    <>
      <Head>
        <title>User Profile</title>
      </Head>
      <main>
        <div className={styles.container}>
          <div className={styles.left}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <h1>User Profile</h1>
              <p className={styles.errorMessage}>{errorMessage}</p>
              <TextInput
                label="Display Name"
                name="name"
                value={user.name}
                placeholder='e.g. "Sir Rounded by Liberals" or "John Doe"`'
                onChange={handleChange}
                error={errors.name}
              />
              <TextInput
                label="Email"
                name="email"
                value={user.email}
                onChange={handleChange}
                error={errors.email}
              />

              <h3>
                Only fill out the information below if you want to change your
                password
              </h3>
              <TextInput
                label="Current Password"
                name="currentPassword"
                type="password"
                value={user.currentPassword}
                onChange={handleChange}
                error={errors.currentPassword}
              />
              <TextInput
                label="New Password"
                name="newPassword"
                type="password"
                value={user.newPassword}
                onChange={handleChange}
                error={errors.newPassword}
              />
              <TextInput
                label="Confirm New Password"
                name="confirmNewPassword"
                type="password"
                value={user.confirmNewPassword}
                onChange={handleChange}
                error={errors.confirmNewPassword}
              />
              <input type="submit" value="Update" />
            </form>
          </div>
          <div className={styles.right}>
            <p>Please place the marker to mark where you are located</p>
            <UpdateMap user={user} setUser={setUser} />
          </div>
        </div>
      </main>
    </>
  )
}
