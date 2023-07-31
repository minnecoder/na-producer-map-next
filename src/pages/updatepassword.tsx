import Header from '@/components/Header'
import TextInput from '@/components/TextInput'
import { sanitize } from 'dompurify'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import router from 'next/router'
import { useEffect, useState } from 'react'
import bcrypt from 'bcryptjs'
import { checkUpdatePassword } from '@/utils/validation'
import styles from '../styles/UpdatePassword.module.css'
import { UpdatePasswords, UpdatePasswordsErrors } from '../../types'

// TODO: Check current password against the password that is in the session

export default function UpdatePassword() {
  const { data: session } = useSession()

  const [user, setUser] = useState({
    email: session?.user.email || '',
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  })

  const [errors, setErrors] = useState<UpdatePasswordsErrors>({
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  })

  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const sanitizeData = (dirtyUser: UpdatePasswords) => {
    for (const [value] of Object.entries(dirtyUser)) {
      sanitize(value)
    }
    return dirtyUser
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()

    sanitizeData(user)
    const formErrors = checkUpdatePassword(user)
    setErrors(formErrors)
    if (Object.keys(formErrors).length > 0) return

    // verify that the current password matches what is in the database
    const userData = await fetch(`/api/user/${session?.user.email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())

    const isValidPassword = await bcrypt.compare(
      user.password,
      userData.password
    )
    if (!isValidPassword) {
      setErrorMessage('There was a problem with the current password')
      return
    }
    console.log(isValidPassword)

    const response = await fetch(`/api/user/updatepassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
        newPassword: user.newPassword,
        confirmNewPassword: user.confirmNewPassword,
      }),
    }).then((res) => res.json())

    console.log(response)

    if (response.error) {
      setErrorMessage(response.error)
    }

    if (response.modifiedCount > 0) {
      router.push('/map')
    }
  }

  return (
    <>
      <Head>
        <title>Update Password</title>
      </Head>
      <Header />

      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.title}>Update Password</h1>
          <p className={styles.errorMessage}>{errorMessage}</p>
          <TextInput
            label="Current Password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            error={errors.password}
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
    </>
  )
}
