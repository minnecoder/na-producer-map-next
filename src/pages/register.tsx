import Head from 'next/head'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { sanitize } from 'dompurify'
import TextInput from '@/components/TextInput'
// @ts-ignore
import RegisterMap from '@/components/RegisterMap'
import { checkRegister } from '@/utils/validation'
import styles from '@/styles/Register.module.css'
import { Register, RegisterErrors } from '../../types'

// TODO: Finish design
// TODO: Complete handleSubmit function

export default function RegisterPage() {
  const router = useRouter()
  const [user, setUser] = useState<Register>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    lat: 0,
    long: 0,
  })
  const [errors, setErrors] = useState<RegisterErrors>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    lat: '',
    long: '',
  })
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const sanitizeData = (dirtyUser: Register) => {
    for (const [value] of Object.entries(dirtyUser)) {
      sanitize(value)
    }
    return dirtyUser
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()

    if (user.password !== user.confirmPassword) {
      setErrorMessage("Passwords don't match")
    }

    sanitizeData(user)
    if (user.lat === 0 && user.long === 0) {
      setErrorMessage('Please set marker')
    }
    const formErrors = checkRegister(user)
    setErrors(formErrors)
    if (Object.keys(formErrors).length > 0) return

    console.log('registering user')
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        role: 'user',
        password: user.password,
        lat: user.lat,
        long: user.long,
      }),
    })

    console.log(response)

    // TODO: figure out better error message before going into prod
    if (response.status === 400) {
      setErrorMessage('Email is already in use')
    }

    if (response.status === 200) {
      router.push('/jobposts')
    }
  }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <main>
        <div className={styles.container}>
          <div className={styles.left}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <h1>Register</h1>
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
              <TextInput
                label="Password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
                error={errors.password}
              />
              <TextInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={user.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />
              <input type="submit" value="Register" />
              <p>
                Already have an account?{' '}
                <span>
                  <Link href="/login">Login</Link>
                </span>
              </p>
            </form>
          </div>
          <div className={styles.right}>
            <p>Please place the marker to mark where you are located</p>
            <RegisterMap user={user} setUser={setUser} />
          </div>
        </div>
      </main>
    </>
  )
}
