import { getANewTokenLink } from '@/services/helpers'
import Banner from './Banner'

type ErrorBannerProps = {
  message: string
  staticPosition?: boolean
}

export default function ErrorBanner({
  message,
  staticPosition,
}: ErrorBannerProps) {
  return (
    <Banner status='error' staticPosition={staticPosition}>
      <strong className='font-semibold'>Key Invalid</strong>: {message} Download
      a new key from [
      <a
        href={getANewTokenLink}
        target='_blank'
        rel='noreferrer'
        className='text-rose-200 underline'
      >
        {getANewTokenLink}
      </a>
      ].
    </Banner>
  )
}
