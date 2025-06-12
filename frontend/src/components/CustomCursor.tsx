import React, { useEffect, useRef } from "react"

const CustomCursor: React.FC = () => {
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (followerRef.current) {
        followerRef.current.style.left = `${e.clientX}px`
        followerRef.current.style.top = `${e.clientY}px`
      }
    }
    document.addEventListener("mousemove", moveCursor)
    return () => document.removeEventListener("mousemove", moveCursor)
  }, [])

  return (
    <div id="follower" ref={followerRef}>
      <div id="circle1" />
      <div id="circle2" />
    </div>
  )
}

export default CustomCursor
