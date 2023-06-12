import dynamic from 'next/dynamic'

const RegisterMap = dynamic(() => import('./UpdateMap'), { ssr: false })

export default RegisterMap
