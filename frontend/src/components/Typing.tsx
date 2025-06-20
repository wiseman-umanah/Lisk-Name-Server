import { useEffect, useState } from "react"

const commands = [
	"pip install lisk-name-service",
	"npm install lisk-name-service"
]

export const TypingText = () => {
  const [text, setText] = useState("")
  const [commandIndex, setCommandIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)


  const TYPING_SPEED = 120
  const DELETING_SPEED = 60
  const TYPED_PAUSE = 1500
  const DELETED_PAUSE = 700

  useEffect(() => {
    const current = commands[commandIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIndex))
        setCharIndex(charIndex + 1)
      }, TYPING_SPEED)
    } else if (isDeleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIndex))
        setCharIndex(charIndex - 1)
      }, DELETING_SPEED)
    }

    if (charIndex === current.length + 1) {
      // Finished typing
      timeout = setTimeout(() => setIsDeleting(true), TYPED_PAUSE)
    }

    if (charIndex === -1) {
      // Finished deleting
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setCommandIndex((prev) => (prev + 1) % commands.length)
        setCharIndex(0)
      }, DELETED_PAUSE)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, commandIndex])

  return (
    <div className="text-3xl md:text-5xl lg:text-6xl text-green-400 font-bold mb-6 tracking-wider">
      <span className="inline-block">{`> ${text}`}</span>
      <span className="inline-block w-2 h-6 md:h-14 bg-green-400 ml-1 animate-pulse rounded-sm" />
    </div>
  )
}
