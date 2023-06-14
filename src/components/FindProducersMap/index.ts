import dynamic from 'next/dynamic'

const FindProducersMap = dynamic(() => import('./FindProducersMap'), {
  ssr: false,
})

export default FindProducersMap
