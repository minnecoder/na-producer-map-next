import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

// TODO: Finish this page

interface UserData {
  name: string
  email: string
  password: string
  linkText: string
  lat: number
  long: number
}

export default function UserProfile() {
  const router = useRouter()
  const { data } = router.query

  let userData: UserData = {
    name: '',
    email: '',
    password: '',
    linkText: '',
    lat: 0,
    long: 0,
  }
  if (typeof data === 'string') {
    userData = JSON.parse(data)
  }

  const { data: session } = useSession()

  if (userData.name) {
    return (
      <div>
        <h1>THis is the user data name {userData.name}</h1>
        <h3>{userData.email}</h3>
        <p>Is this the one?</p>
      </div>
    )
  }

  return (
    <div>
      <h1>{`Hello ${session?.user.name}`}</h1>
      <h3>{session?.user.email}</h3>
      <p>Is this the one?</p>
    </div>
  )
}
