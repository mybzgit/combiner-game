import { AnimationEvent } from 'react'

type Props = {
  time: number
  className?: string
  onEnd: () => void
}

export default function CircularProgress({
  time,
  className = '',
  onEnd,
}: Props) {

  const handleEnd = (e: AnimationEvent<HTMLDivElement>) => {
    if (e.animationName == 'spin') onEnd()
  }

  return (
    <div className={'timer ' + className}>
      <div
        className='progress'
        style={{
          animation: `spin ${time / 2}s linear 2, bg ${time}s step-end 1`,
        }}
        onAnimationEnd={handleEnd}
      ></div>
    </div>
  )
}
