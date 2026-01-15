import { useRef, useEffect, useState } from 'react'

export function useTilt() {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMouseMove = (e: MouseEvent) => {
      if (!isHovered) return
      const { left, top, width, height } = el.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height

      const rotateX = (y - 0.5) * -40 // Max rotation 20deg
      const rotateY = (x - 0.5) * 40  // Max rotation 20deg
      
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.08, 1.08, 1.08)`
    }
    
    const onMouseEnter = () => {
      setIsHovered(true)
      el.style.transition = 'transform 0.1s ease'
    }

    const onMouseLeave = () => {
      setIsHovered(false)
      el.style.transition = 'transform 0.5s ease'
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }

    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseenter', onMouseEnter)
    el.addEventListener('mouseleave', onMouseLeave)

    return () => {
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseenter', onMouseEnter)
      el.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [isHovered])

  return ref
}
