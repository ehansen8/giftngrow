import React, { useRef, useEffect, useState } from 'react'
import Tooltip from '@mui/material/Tooltip'

const OverflowTip = ({ text }: { text: string }) => {
  // Create Ref
  const textElementRef = useRef<HTMLDivElement>(null)

  const compareSize = () => {
    if (textElementRef.current) {
      const compare =
        textElementRef.current.scrollWidth > textElementRef.current.clientWidth
      setHover(compare)
    }
  }

  // compare once and add resize listener on "componentDidMount"
  useEffect(() => {
    compareSize()
    window.addEventListener('resize', compareSize)
  }, [])

  // remove resize listener again on "componentWillUnmount"
  useEffect(
    () => () => {
      window.removeEventListener('resize', compareSize)
    },
    [],
  )

  // Define state and function to update the value
  const [hoverStatus, setHover] = useState(false)

  return (
    <Tooltip
      title={text}
      disableHoverListener={!hoverStatus}
      style={{ fontSize: '2em' }}
    >
      <div
        ref={textElementRef}
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {text}
      </div>
    </Tooltip>
  )
}

export default OverflowTip
