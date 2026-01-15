import { useState, useEffect } from 'react'

export function MouseGlow() {
  const [position, setPosition] = useState({ x: -200, y: -200 })

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(0, 195, 255, 0.15), transparent 30vmin)`,
        transition: 'background 0.2s ease-out'
      }}
    />
  )
}
