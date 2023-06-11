import Head from 'next/head'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { sanitize } from 'dompurify'
import TextInput from '@/components/TextInput'
import { checkLogin } from '@/utils/validation'
import styles from '@/styles/Login.module.css'
import { Login, LoginErrors } from '../../types'

export default function LoginPage() {
  const [user, setUser] = useState<Login>({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<LoginErrors>({
    email: '',
    password: '',
  })

  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const sanitizeData = (dirtyUser: Login) => {
    for (const [value] of Object.entries(dirtyUser)) {
      sanitize(value)
    }
    return dirtyUser
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()

    sanitizeData(user)
    const formErrors = checkLogin(user)
    setErrors(formErrors)
    if (Object.keys(formErrors).length > 0) return

    signIn('credentials', {
      email: user.email,
      password: user.password,
      redirect: false,
    }).then((res) => {
      if (res?.error) {
        setErrorMessage(res.error)
      }
      if (res?.ok) {
        router.push('/map')
      }
    })
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main>
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1>Login</h1>
            <p className={styles.errorMessage}>{errorMessage}</p>

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

            <input type="submit" value="Login" />
            <p>
              Dont have an account?{' '}
              <span>
                <Link href="/register">Register</Link>
              </span>
            </p>
          </form>
        </div>
      </main>
    </>
  )
}
