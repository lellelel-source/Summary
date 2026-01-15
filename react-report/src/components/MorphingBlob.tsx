import { motion } from 'framer-motion'

interface MorphingBlobProps {
  color?: string
  size?: number
  className?: string
}

export function MorphingBlob({ color = 'rgba(139, 92, 246, 0.3)', size = 400, className = '' }: MorphingBlobProps) {
  const pathVariants = {
    start: {
      d: "M37.5,-65.9C48.5,-58.3,57.5,-47.3,64.6,-34.8C71.7,-22.4,76.9,-8.5,76.8,5.3C76.7,19.1,71.3,32.8,62.8,43.9C54.3,55,42.6,63.5,29.8,68.8C17,74.1,3.1,76.2,-11.1,75.3C-25.3,74.4,-39.8,70.5,-51.5,62.5C-63.2,54.5,-72.1,42.4,-76.4,28.8C-80.7,15.2,-80.4,0.1,-76.9,-14.1C-73.4,-28.3,-66.7,-41.6,-56.5,-50.2C-46.3,-58.8,-32.6,-62.7,-19.8,-69.1C-7,-75.5,4.9,-84.4,16.7,-86.6C28.5,-88.8,40.2,-84.3,37.5,-65.9Z",
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut' as const
      }
    },
    end: {
      d: "M44.3,-76.6C56.9,-70.2,66.4,-57.6,71.8,-43.5C77.2,-29.4,78.5,-13.8,75.6,0.7C72.7,15.2,65.6,28.7,57.1,40.6C48.6,52.5,38.7,62.8,26.6,68.9C14.5,75,0.2,76.9,-13.6,75.8C-27.4,74.7,-40.7,70.6,-52.2,63.1C-63.7,55.6,-73.4,44.7,-78.8,31.8C-84.2,18.9,-85.3,4,-81.7,-9.5C-78.1,-23,-69.8,-35.1,-59.4,-42.5C-49,-49.9,-36.5,-52.6,-24.5,-59.5C-12.5,-66.4,-0.9,-77.5,11.4,-81.2C23.7,-84.9,31.7,-83,44.3,-76.6Z",
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut' as const
      }
    }
  }

  return (
    <div className={`absolute ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.3 }} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <motion.path
          fill="url(#blob-gradient)"
          filter="url(#glow)"
          transform="translate(100 100)"
          initial="start"
          animate="end"
          variants={pathVariants}
        />
      </svg>
    </div>
  )
}
