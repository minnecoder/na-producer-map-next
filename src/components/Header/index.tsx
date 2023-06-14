import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/react'
import styles from './Header.module.css'

function Header() {
  const router = useRouter()
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav>
      <div className={styles.container}>
        <div className={styles.left}>
          <h3>No Agenda Producer Map</h3>
        </div>
        <div className={styles.middle}>
          <ul>
            <li>
              <Link href="/map">Map</Link>
            </li>
            <li>
              <Link href="/findproducers">Find Producers</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>

        {session?.user ? (
          <div className={styles.right}>
            <div className={styles.user} role="button" onClick={toggle}>
              <button
                type="button"
                className={styles.headerButton}
                onClick={() => router.push(`/user/${session?.user.linkText}`)}
              >
                My Profile
              </button>
              <button
                type="button"
                className={styles.headerButton}
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.noUserRight}>
            <button
              type="button"
              className={styles.headerButton}
              onClick={() => router.push('/register')}
            >
              Register
            </button>
            <button
              type="button"
              className={styles.headerButton}
              onClick={() => signIn()}
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Header
