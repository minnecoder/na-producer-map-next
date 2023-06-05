import Link from 'next/link'
import { signIn } from 'next-auth/react'
import styles from './Header.module.css'

function Header() {
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
        <div className={styles.right}>
          <button
            className={styles.loginButton}
            type="button"
            onClick={() => signIn()}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Header
