import dynamic from 'next/dynamic'

const UpdateMap = dynamic(() => import('./UpdateMap'), { ssr: false })

export default UpdateMap
