import React, { useRef } from 'react'

const Tooltip = ({ children, content }) => {
  const tooltipRef = useRef(null)
  const container = useRef(null)

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect()
        tooltipRef.current.style.left = clientX - left + "px"
      }} className='group relative inline-block'>
      {children}
      <span ref={tooltipRef} className={`
      invisible 
      group-hover:visible 
      opacity-0 
      group-hover:opacity-100 
      transition 
      bg-base-300/90
      cursor-default
      rounded 
      absolute 
      top-full 
      -translate-y-20
      -translate-x-1/2 
      p-1 
      whitespace-nowrap 
      z-50
      `}>{content}</span>
    </div>
  )
}

export default Tooltip