import { css, keyframes } from '@emotion/react'
import { Loader } from 'lucide-react'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const spinningStyle = css`
  animation: ${spin} 1s linear infinite;
  width: 24px;
  height: 24px;
`

export default function Loading() {
  return <Loader css={spinningStyle} />
}
