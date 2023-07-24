import dynamic from 'next/dynamic'

const UserMap = dynamic(() => import('./UserMap'), { ssr: false })

export default UserMap
