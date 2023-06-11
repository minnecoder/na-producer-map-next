import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
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
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/map">Map</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>

        {session?.user ? (
          <div className={styles.right}>
            <div className={styles.user} role="button" onClick={toggle}>
              <div className={styles.userInfo}>
                <p>{session?.user.name}</p>
                <span>
                  {isOpen ? (
                    <FaChevronUp color="black" />
                  ) : (
                    <FaChevronDown color="black" />
                  )}
                </span>
              </div>
              {isOpen && (
                <div className={styles.userOptions}>
                  <ul>
                    <li
                      onClick={() =>
                        router.push(`/user/${session.user.linkText}`)
                      }
                    >
                      Profile
                    </li>
                    <li>Something</li>
                    <li>Something Else</li>
                    <li onClick={() => signOut()}>Log Out</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.noUserRight}>
            <button
              type="button"
              className={styles.signInButton}
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
