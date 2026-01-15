import { useEffect, useMemo, useRef, useState } from 'react'

export type SceneConfig = {
  count: number
  speed: number
  color: string
  size: number
  lineDistance: number
  drawLines: boolean
  effect: 'default' | 'streak'
}

function parseRgba(rgbaString: string) {
  const parts = rgbaString.match(/(\d+(\.\d+)?)/g)
  if (!parts || parts.length < 4) return { r: 0, g: 0, b: 0, a: 1 }
  return { r: parseFloat(parts[0]), g: parseFloat(parts[1]), b: parseFloat(parts[2]), a: parseFloat(parts[3]) }
}

function lerp(start: number, end: number, amt: number) {
  return (1 - amt) * start + amt * end
}

export function useParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0)
  const previousSceneIndexRef = useRef(0)
  const transitionProgressRef = useRef(1)
  const particlesRef = useRef<any[]>([])

  const scenes: SceneConfig[] = useMemo(
    () => [
      { count: 80, speed: 0.5, color: 'rgba(0, 195, 255, 0.7)', size: 2, lineDistance: 150, drawLines: true, effect: 'default' },
      { count: 150, speed: 4, color: 'rgba(167, 139, 250, 0.8)', size: 1.5, lineDistance: 0, drawLines: false, effect: 'streak' },
      { count: 120, speed: 0.8, color: 'rgba(56, 189, 248, 0.8)', size: 2, lineDistance: 100, drawLines: true, effect: 'default' },
      { count: 100, speed: 0.3, color: 'rgba(34, 211, 238, 0.8)', size: 2.5, lineDistance: 80, drawLines: true, effect: 'default' },
      { count: 200, speed: 1.2, color: 'rgba(192, 132, 252, 0.8)', size: 1.8, lineDistance: 120, drawLines: true, effect: 'default' },
      { count: 100, speed: 0.2, color: 'rgba(20, 255, 226, 0.7)', size: 2.5, lineDistance: 120, drawLines: true, effect: 'default' },
      { count: 90, speed: 0.4, color: 'rgba(56, 189, 248, 0.8)', size: 2.2, lineDistance: 100, drawLines: true, effect: 'default' },
      { count: 110, speed: 0.3, color: 'rgba(34, 211, 238, 0.8)', size: 2.3, lineDistance: 110, drawLines: true, effect: 'default' },
      { count: 95, speed: 0.5, color: 'rgba(192, 132, 252, 0.8)', size: 2.1, lineDistance: 105, drawLines: true, effect: 'default' },
      { count: 120, speed: 0.3, color: 'rgba(255, 215, 0, 0.8)', size: 2.2, lineDistance: 0, drawLines: false, effect: 'default' },
      { count: 130, speed: 0.4, color: 'rgba(255, 215, 0, 0.8)', size: 2.0, lineDistance: 0, drawLines: false, effect: 'default' },
    ],
    []
  )

  function startupParticles() {
    const canvas = canvasRef.current!
    const config = scenes[currentSceneIndex]
    const particles: any[] = []
    for (let i = 0; i < config.count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() - 0.5,
        vy: Math.random() - 0.5,
        baseSize: Math.random(),
        opacity: Math.random() * 0.6 + 0.4,
        isDying: false,
      })
    }
    particlesRef.current = particles
  }
  function adjustParticleCount() {
    const prevConf = scenes[previousSceneIndexRef.current]
    const currConf = scenes[currentSceneIndex]
    const diff = currConf.count - prevConf.count
    if (diff > 0) {
      const canvas = canvasRef.current!
      for (let i = 0; i < diff; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: Math.random() - 0.5,
          vy: Math.random() - 0.5,
          baseSize: Math.random(),
          opacity: Math.random() * 0.6 + 0.4,
          isDying: false,
        })
      }
    } else if (diff < 0) {
      for (let i = 0; i < Math.abs(diff); i++) {
        const particleToKill = particlesRef.current.find((p) => !p.isDying)
        if (particleToKill) particleToKill.isDying = true
      }
    }
  }
  function connectParticles(ctx: CanvasRenderingContext2D, config: any) {
    const rgba = parseRgba(config.color)
    const base = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, `
    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const p1 = particlesRef.current[i]
        const p2 = particlesRef.current[j]
        if (p1.isDying || p2.isDying) continue
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < config.lineDistance) {
          const opacity = 1 - dist / config.lineDistance
          ctx.strokeStyle = `${base}${(config.alpha * opacity).toFixed(2)})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      startupParticles()
    }
    resize()

    let raf: number
    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (transitionProgressRef.current < 1) {
        transitionProgressRef.current = Math.min(transitionProgressRef.current + 0.015, 1)
      }
      particlesRef.current = particlesRef.current.filter((p) => p.opacity > 0.01)
      const prev = scenes[previousSceneIndexRef.current]
      const curr = scenes[currentSceneIndex]
      const prevColor = parseRgba(prev.color)
      const currColor = parseRgba(curr.color)
      const interpolated = {
        effect: transitionProgressRef.current > 0.5 ? curr.effect : prev.effect,
        drawLines: transitionProgressRef.current > 0.5 ? curr.drawLines : prev.drawLines,
        lineDistance: lerp(prev.lineDistance, curr.lineDistance, transitionProgressRef.current),
        size: lerp(prev.size, curr.size, transitionProgressRef.current),
        color: {
          r: lerp(prevColor.r, currColor.r, transitionProgressRef.current),
          g: lerp(prevColor.g, currColor.g, transitionProgressRef.current),
          b: lerp(prevColor.b, currColor.b, transitionProgressRef.current),
          a: lerp(prevColor.a, currColor.a, transitionProgressRef.current),
        },
      }
      const speed = lerp(prev.speed, curr.speed, transitionProgressRef.current)
      for (const p of particlesRef.current) {
        if (p.isDying) {
          p.opacity = lerp(p.opacity, 0, 0.05)
        } else {
          p.x += p.vx * speed
          p.y += p.vy * speed
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        }
        const size = p.baseSize * interpolated.size + 1
        const color = `rgba(${interpolated.color.r}, ${interpolated.color.g}, ${interpolated.color.b}, ${p.opacity})`
        if (interpolated.effect === 'streak') {
          ctx.strokeStyle = color
          ctx.lineWidth = size
          ctx.beginPath()
          ctx.moveTo(p.x - p.vx * speed * 3, p.y - p.vy * speed * 3)
          ctx.lineTo(p.x, p.y)
          ctx.stroke()
        } else {
          ctx.fillStyle = color
          ctx.beginPath()
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      if (interpolated.drawLines && interpolated.lineDistance > 0) {
        connectParticles(ctx, { color: `rgba(${interpolated.color.r}, ${interpolated.color.g}, ${interpolated.color.b}, ${interpolated.color.a})`, alpha: interpolated.color.a, lineDistance: interpolated.lineDistance })
      }
      raf = requestAnimationFrame(frame)
    }
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [currentSceneIndex, scenes])

  const changeScene = (newIndex: number) => {
    if (newIndex !== currentSceneIndex) {
      previousSceneIndexRef.current = currentSceneIndex
      setCurrentSceneIndex(newIndex)
      transitionProgressRef.current = 0
      adjustParticleCount()
    }
  }

  return { canvasRef, changeScene }
}


