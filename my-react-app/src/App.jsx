import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

// ============================================
// Homepage Component
// ============================================
function Homepage({ onEnter }) {
  return (
    <div className="homepage">
      <div className="homepage-particles">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="homepage-particle" style={{
            '--delay': `${Math.random() * 5}s`,
            '--duration': `${15 + Math.random() * 10}s`,
            '--x-start': `${Math.random() * 100}%`,
            '--x-end': `${Math.random() * 100}%`,
            '--size': `${2 + Math.random() * 4}px`
          }} />
        ))}
      </div>
      <div className="homepage-grid">
        <div className="grid-lines"></div>
      </div>
      <div className="homepage-stars">
        {[...Array(100)].map((_, i) => (
          <div key={i} className="star" style={{
            '--x': `${Math.random() * 100}%`,
            '--y': `${Math.random() * 100}%`,
            '--size': `${1 + Math.random() * 2}px`,
            '--duration': `${2 + Math.random() * 3}s`,
            '--delay': `${Math.random() * 3}s`
          }} />
        ))}
      </div>
      <motion.div
        className="homepage-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="homepage-welcome"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="welcome-text">Welcome</span>
        </motion.div>

        <motion.h1
          className="homepage-title"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="title-line">潘喜乐</span>
          <span className="title-divider"></span>
          <span className="title-sub">个人工作展示</span>
        </motion.h1>

        <motion.div
          className="homepage-cards"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.div
            className="homepage-card main-card"
            onClick={onEnter}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 60px rgba(79, 209, 197, 0.4)',
              borderColor: 'rgba(79, 209, 197, 0.8)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="card-glow-effect"></div>
            <div className="card-icon">📊</div>
            <h2 className="card-title">2025年终述职</h2>
            <p className="card-desc">年度履职综述报告</p>
            <div className="card-arrow">
              <span>→</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="homepage-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="footer-line"></span>
          <span className="footer-text">© 2026 All Rights Reserved</span>
          <span className="footer-line"></span>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ============================================
// Password Gate Component
// ============================================
function PasswordGate({ onUnlock, onBack }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === '20260101') {
      onUnlock()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => {
        setShake(false)
        setError(false)
      }, 600)
    }
  }

  return (
    <div className="password-gate">
      <div className="gate-particles">
        {[...Array(40)].map((_, i) => (
          <div key={i} className="gate-particle" style={{
            '--delay': `${Math.random() * 5}s`,
            '--duration': `${15 + Math.random() * 10}s`,
            '--x-start': `${Math.random() * 100}%`,
            '--x-end': `${Math.random() * 100}%`,
            '--size': `${2 + Math.random() * 4}px`
          }} />
        ))}
      </div>
      <div className="gate-grid">
        <div className="grid-lines"></div>
      </div>
      {onBack && (
        <motion.button
          className="back-button"
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="back-arrow">←</span>
          <span>返回首页</span>
        </motion.button>
      )}
      <motion.div
        className="gate-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          className="gate-logo"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', damping: 10 }}
        >
          <span className="logo-icon">🔐</span>
        </motion.div>
        <motion.h1
          className="gate-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="gate-bracket">[</span>
          2025年终述职
          <span className="gate-bracket">]</span>
        </motion.h1>
        <motion.p
          className="gate-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          请输入访问密码以继续
        </motion.p>
        <motion.form
          className={`gate-form ${shake ? 'shake' : ''}`}
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className={`gate-input-wrapper ${error ? 'error' : ''}`}>
            <input
              type="password"
              className="gate-input"
              placeholder="请输入访问密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <div className="input-glow"></div>
          </div>
          <motion.button
            type="submit"
            className="gate-button"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(79, 209, 197, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="button-text">进入</span>
            <span className="button-icon">→</span>
          </motion.button>
        </motion.form>
        {error && (
          <motion.p
            className="gate-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            密码错误，请重试
          </motion.p>
        )}
        <motion.div
          className="gate-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <span className="footer-text">© 2026 潘喜乐</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

// Slide transition variants - 3 different effects
const transitionTypes = {
  // Type 1: Original slide with 3D rotate
  slide: {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      filter: 'blur(5px)',
      rotateY: direction > 0 ? 8 : -8,
    }),
    center: {
      x: 0, opacity: 1, scale: 1, filter: 'blur(0px)', rotateY: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0, scale: 0.95, filter: 'blur(5px)', rotateY: direction < 0 ? 8 : -8,
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
    })
  },
  // Type 2: Fade with zoom
  fadeZoom: {
    enter: () => ({
      opacity: 0,
      scale: 0.8,
      filter: 'blur(10px)',
    }),
    center: {
      opacity: 1, scale: 1, filter: 'blur(0px)',
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    exit: () => ({
      opacity: 0, scale: 1.2, filter: 'blur(10px)',
      transition: { duration: 0.3, ease: 'easeIn' }
    })
  },
  // Type 3: Flip card effect
  flip: {
    enter: (direction) => ({
      rotateX: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      rotateX: 0, opacity: 1, scale: 1,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    },
    exit: (direction) => ({
      rotateX: direction < 0 ? -90 : 90,
      opacity: 0, scale: 0.9,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    })
  }
}

// Get transition type based on slide index
const getSlideVariants = (slideIndex) => {
  const types = ['slide', 'fadeZoom', 'flip']
  return transitionTypes[types[slideIndex % 3]]
}

// Content animation variants (faster)
const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.05,
      delayChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

// Glitch effect component
function GlitchText({ children, className }) {
  return (
    <span className={`glitch-text ${className || ''}`} data-text={children}>
      {children}
    </span>
  )
}

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime = null
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [end, duration])

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>
}

// Cyber Grid Background Component
function CyberGrid() {
  return (
    <div className="cyber-grid">
      <div className="grid-lines"></div>
      <div className="grid-glow"></div>
    </div>
  )
}

// Particle Background Component
function ParticleBackground() {
  return (
    <div className="particles">
      {[...Array(30)].map((_, i) => (
        <div key={i} className="particle" style={{
          '--delay': `${Math.random() * 5}s`,
          '--duration': `${15 + Math.random() * 10}s`,
          '--x-start': `${Math.random() * 100}%`,
          '--x-end': `${Math.random() * 100}%`,
          '--size': `${2 + Math.random() * 4}px`
        }} />
      ))}
    </div>
  )
}

// Cursor Glow Effect Component
function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (target.closest('.info-card, .stat-box, .metric-card, .tech-badge, .nav-arrow, .indicator, .plan-card, .tracking-card, .decision-step, .ty-tag, button, a')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <>
      <motion.div
        className="cursor-glow"
        animate={{
          x: position.x - 150,
          y: position.y - 150,
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.4
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />
      <motion.div
        className="cursor-dot"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isClicking ? 0.5 : isHovering ? 1.8 : 1
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
      />
    </>
  )
}

// Scanning Line Effect
function ScanLine() {
  return <div className="scan-line"></div>
}

// Corner Decorations
function TechCorners() {
  return (
    <>
      <div className="tech-corner top-left"></div>
      <div className="tech-corner top-right"></div>
      <div className="tech-corner bottom-left"></div>
      <div className="tech-corner bottom-right"></div>
    </>
  )
}

// Snowflakes Background Component
function Snowflakes() {
  const snowflakeChars = ['*', '\u2744', '\u2745', '\u2746']
  return (
    <div className="snowflakes-container">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="snowflake"
          style={{
            '--delay': `${Math.random() * 10}s`,
            '--duration': `${8 + Math.random() * 12}s`,
            '--x-start': `${Math.random() * 100}%`,
            '--x-drift': `${(Math.random() - 0.5) * 100}px`,
            '--size': `${0.6 + Math.random() * 1.2}rem`,
            '--opacity': `${0.4 + Math.random() * 0.6}`,
            '--rotate': `${Math.random() * 360}deg`
          }}
        >
          {snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)]}
        </div>
      ))}
    </div>
  )
}

// ============================================
// Slide 1: 封面页
// ============================================
function CoverSlide() {
  return (
    <motion.div
      className="slide cover-slide"
      variants={contentVariants}
      initial="hidden"
      animate="visible"
    >
      <CyberGrid />
      <ParticleBackground />
      <ScanLine />
      <TechCorners />
      <div className="cover-content">
        <motion.div className="cover-badge" variants={itemVariants}>
          <span className="badge-glow"></span>
          2025 年度履职综述
        </motion.div>
        <motion.h1 className="cover-title" variants={itemVariants}>
          <GlitchText className="title-gradient">拥抱 AI 变革</GlitchText>
          <span className="title-sub">重塑核心价值</span>
        </motion.h1>
        <motion.div className="cover-author" variants={itemVariants}>
          <div className="author-name">
            <span className="cyber-bracket">[</span>
            潘喜乐
            <span className="cyber-bracket">]</span>
          </div>
          <div className="author-meta">
            <span className="meta-item"><span className="meta-label">TIME:</span> 2026年1月</span>
            <span className="meta-divider">|</span>
            <span className="meta-item"><span className="meta-label">TYPE:</span> 年度总结</span>
          </div>
        </motion.div>
        <motion.div className="cover-intro" variants={itemVariants}>
          <div className="intro-border"></div>
          <p>入职 10 个月以来，我不仅快速适应了产品经理的岗位要求，更将主要精力投入到 AI 技术的深度学习与实践中。</p>
          <p className="highlight-text">
            <strong>AI 越强大，人的主观能动性越重要。</strong>
          </p>
          <p>我始终致力于提升自驱力，坚持主动学习、主动思考、主动承担，<strong>不仅利用 AI 提升执行效率，更将其作为辅助科学决策的关键外脑。</strong></p>
        </motion.div>

      </div>
    </motion.div>
  )
}

// ============================================
// Slide 2: 核心成果概览
// ============================================
function MetricsSlide({ isActive }) {
  const metrics = [
    {
      value: 17,
      label: '项目交付',
      suffix: '个',
      icon: '📦',
      desc: '12 个已完成 (含云招商、数字员工及 10 个支撑项目)；5 个跟进中'
    },
    {
      value: 82000,
      label: '代码产出',
      suffix: '+行',
      icon: '💻',
      desc: '包含茶室小程序 (6w)、算多多 (1.8w)、云招商 (4k) 等生产环境代码'
    },
    {
      value: 762,
      label: '文件数量',
      suffix: '+个',
      icon: '📁',
      desc: '算多多 458 个 + 茶室 294 个 + 云招商 10 个'
    },
    {
      value: 470,
      label: '设计页面',
      suffix: '+页',
      icon: '🎨',
      desc: 'UI/UX 交付物 (算多多 300+，茶室 120+，云招商 50+)'
    },
    {
      value: 1500,
      label: '用户增长',
      suffix: '+',
      icon: '👥',
      desc: '通过云招商吸引用户'
    }
  ]

  return (
    <motion.div
      className="slide metrics-slide"
      variants={contentVariants}
      initial="hidden"
      animate="visible"
    >
      <CyberGrid />
      <TechCorners />
      <motion.div className="slide-header" variants={itemVariants}>
        <h2 className="slide-title">
          <span className="title-icon">◈</span>
          核心成果概览
          <span className="title-icon">◈</span>
        </h2>
        <p className="slide-subtitle">OVERALL PERFORMANCE METRICS</p>
      </motion.div>
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            className="metric-card"
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 40px rgba(79, 209, 197, 0.3)',
              borderColor: 'rgba(79, 209, 197, 0.6)'
            }}
          >
            <div className="card-glow"></div>
            <div className="metric-icon">{metric.icon}</div>
            <div className="metric-value">
              {isActive && <AnimatedCounter end={metric.value} suffix={metric.suffix} />}
            </div>
            <div className="metric-label">{metric.label}</div>
            <div className="metric-desc">{metric.desc}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// ============================================
// Slide 3: AI 技术栈
// ============================================
function TechStackSlide() {
  const categories = [
    {
      title: '编程模型',
      icon: '🧠',
      items: ['Gemini 3.0', 'Claude 4.5', 'GPT-5.2', 'Grok-4.1']
    },
    {
      title: '视觉/视频',
      icon: '🎬',
      items: ['Sora 2.0', 'Flux Pro', 'Minimax', '即梦 (JiMeng)', 'Nano-Banana']
    },
    {
      title: '智能终端/客户端',
      icon: '⚡',
      items: ['Kiro', 'Warp', 'Antigravity', 'Cursor']
    },
    {
      title: '研究/其他',
      icon: '🔬',
      items: ['GPT-5-Pro', 'ChatGPT']
    }
  ]

  return (
    <motion.div
      className="slide techstack-slide"
      variants={contentVariants}
      initial="hidden"
      animate="visible"
    >
      <CyberGrid />
      <TechCorners />
      <motion.div className="slide-header" variants={itemVariants}>
        <h2 className="slide-title">
          <span className="title-icon">◈</span>
          技术栈掌握
          <span className="title-icon">◈</span>
        </h2>
        <p className="slide-subtitle">AI TECHNOLOGY STACK</p>
      </motion.div>
      <motion.div className="tech-intro" variants={itemVariants}>
        已掌握 <strong className="neon-text">13+</strong> 种前沿 AI 模型与工具，构建了对AI能力边界的框架性认知：
      </motion.div>
      <div className="tech-grid">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            className="tech-category"
            variants={itemVariants}
            whileHover={{ scale: 1.02, borderColor: 'rgba(79, 209, 197, 0.6)' }}
          >
            <div className="tech-category-header">
              <span className="tech-icon">{cat.icon}</span>
              <span className="tech-title">{cat.title}</span>
            </div>
            <div className="tech-items">
              {cat.items.map((item, i) => (
                <motion.span
                  key={i}
                  className="tech-badge"
                  whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(79, 209, 197, 0.4)' }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div className="core-skill" variants={itemVariants}>
        <span className="skill-star">✨</span>
        <span>核心技能：Claude Code CLI (熟练掌握)</span>
        <span className="skill-glow"></span>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// Slide 4: 人与 AI 协同工作的思考
// ============================================
function PhilosophySlide() {
  const stages = [
    {
      phase: '01',
      title: '神化阶段',
      subtitle: 'Deification',
      desc: '认为 AI 无所不能',
      icon: '🌟'
    },
    {
      phase: '02',
      title: '祛魅阶段',
      subtitle: 'Disenchantment',
      desc: '发现 AI 存在局限性',
      icon: '🔍'
    },
    {
      phase: '03',
      title: '觉醒阶段',
      subtitle: 'Awakening',
      desc: '要发挥人的价值',
      icon: '💡'
    }
  ]

  return (
    <motion.div
      className="slide philosophy-slide"
      variants={contentVariants}
      initial="hidden"
      animate="visible"
    >
      <CyberGrid />
      <TechCorners />
      <motion.div className="slide-header" variants={itemVariants}>
        <h2 className="slide-title">
          <span className="title-icon">◈</span>
          人与 AI 协同工作的思考
          <span className="title-icon">◈</span>
        </h2>
        <p className="slide-subtitle">从"迷信"到"觉醒"的三个阶段</p>
      </motion.div>
      <div className="philosophy-timeline">
        <div className="timeline-line"></div>
        {stages.map((stage, index) => (
          <motion.div
            key={index}
            className="philosophy-stage"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="stage-icon-wrapper">
              <div className="stage-icon-ring"></div>
              <div className="stage-icon">{stage.icon}</div>
            </div>
            <div className="stage-phase">{stage.phase}</div>
            <div className="stage-content">
              <h3 className="stage-title">{stage.title}</h3>
              <span className="stage-subtitle">{stage.subtitle}</span>
              <p className="stage-desc">{stage.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="philosophy-insights">
        <motion.div className="insight-card awakening" variants={itemVariants}>
          <div className="card-border-glow"></div>
          <div className="insight-title">觉醒阶段的核心认知：</div>
          <ul className="insight-list">
            <li>人懂业务、做判断、深思考</li>
            <li>AI 提供建议、执行操作、提升效率</li>
          </ul>
        </motion.div>
        <motion.div className="insight-card logic" variants={itemVariants}>
          <div className="card-border-glow"></div>
          <div className="insight-icon">💭</div>
          <div className="insight-text">
            <strong>核心逻辑：</strong>AI 节约出的时间应留给人类进行深层思考；若思考不周全，高效的执行反而会带来更大的资源浪费。
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ============================================
// Slide 5: 重点项目 - 云招商
// ============================================
function CloudInvestmentSlide({ isActive }) {
  const [activeModal, setActiveModal] = useState(null)

  const modalContent = {
    background: {
      title: '📋 背景',
      content: '公司亟需一个线上化的招商工具以拓展客户渠道，触达更多潜在用户。'
    },
    task: {
      title: '🎯 任务',
      content: '负责"云招商" v1.0 版本的上线、运营及迭代工作。'
    },
    actions: {
      title: '⚡ 行动',
      content: [
        { label: '代码开发', text: '使用 Cursor、Gemini 产出代码文件 10+ 个，代码量 4,000+ 行' },
        { label: '设计产出', text: '使用 Figma 进行素材管理和原型设计，生成页面 50+ 页' }
      ]
    },
    results: {
      title: '🏆 结果',
      content: [
        '项目成功上线并实现平稳运营',
        '累计吸引用户近 1,000 人',
        '成功运营社群 2 个',
        '收获 7 条有效招商线索',
        '成功验证了线上招商模式的可行性'
      ]
    }
  }

  return (
    <motion.div
      className="slide suanduoduo-slide"
      variants={contentVariants}
      initial="hidden"
      animate="visible"
    >
      <CyberGrid />
      <TechCorners />
      <motion.div className="slide-header" variants={itemVariants}>
        <h2 className="slide-title">
          <span className="title-icon">◈</span>
          重点项目：云招商
          <span className="title-icon">◈</span>
        </h2>
        <p className="slide-subtitle">CLOUD INVESTMENT PROMOTION</p>
      </motion.div>

      <div className="suanduoduo-container">
        <motion.div className="project-status-bar" variants={itemVariants}>
          <span className="status-badge completed">
            <span className="status-pulse"></span>
            ✅ 已完成
          </span>
          <span className="status-percent">100%</span>
        </motion.div>

        {/* Stats Overview */}
        <motion.div className="stats-overview" variants={itemVariants}>
          <div className="stat-box">
            <span className="stat-number">{isActive ? <><AnimatedCounter end={1600} suffix="+" /></> : '1600+'}</span>
            <span className="stat-label">用户</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{isActive ? <AnimatedCounter end={186} /> : '186'}</span>
            <span className="stat-label">当日最高注册</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{isActive ? <AnimatedCounter end={7} /> : '7'}</span>
            <span className="stat-label">招商线索</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{isActive ? <><AnimatedCounter end={4} suffix="K+" /></> : '4K+'}</span>
            <span className="stat-label">代码行</span>
          </div>
        </motion.div>

        {/* Clickable Cards */}
        <div className="info-cards-grid">
          <motion.div
            className="info-card"
            variants={itemVariants}
            whileHover={{ scale: 1.03, borderColor: 'rgba(79, 209, 197, 0.6)' }}
            onClick={() => setActiveModal('background')}
          >
            <span className="card-icon">📋</span>
            <span className="card-title">背景</span>
            <span className="card-hint">点击查看</span>
          </motion.div>

          <motion.div
            className="info-card"
            variants={itemVariants}
            whileHover={{ scale: 1.03, borderColor: 'rgba(79, 209, 197, 0.6)' }}
            onClick={() => setActiveModal('task')}
          >
            <span className="card-icon">🎯</span>
            <span className="card-title">任务</span>
            <span className="card-hint">点击查看</span>
          </motion.div>

          <motion.div
            className="info-card"
            variants={itemVariants}
            whileHover={{ scale: 1.03, borderColor: 'rgba(79, 209, 197, 0.6)' }}
            onClick={() => setActiveModal('actions')}
          >
            <span className="card-icon">⚡</span>
            <span className="card-title">行动</span>
            <span className="card-hint">点击查看</span>
          </motion.div>

          <motion.div
            className="info-card"
            variants={itemVariants}
            whileHover={{ scale: 1.03, borderColor: 'rgba(79, 209, 197, 0.6)' }}
            onClick={() => setActiveModal('results')}
          >
            <span className="card-icon">🏆</span>
            <span className="card-title">结果</span>
            <span className="card-hint">点击查看</span>
          </motion.div>
        </div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setActiveModal(null)}>×</button>
              <h3 className="modal-title">{modalContent[activeModal].title}</h3>

              {(activeModal === 'background' || activeModal === 'task') && (
                <p className="modal-text">{modalContent[activeModal].content}</p>
              )}

              {activeModal === 'actions' && (
                <ul className="modal-list">
                  {modalContent[activeModal].content.map((item, index) => (
                    <li key={index}>
                      <strong>{item.label}：</strong>{item.text}
                    </li>
                  ))}
                </ul>
              )}

              {activeModal === 'results' && (
                <ul className="modal-list result">
                  {modalContent[activeModal].content.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ============================================
// Slide 6: 重点项目 - 算多多
// ============================================
function SuanduoduoSlide({ isActive }) {
  const [activeModal, setActiveModal] = useState(null)

  const tasks = [
    { name: '初版视频', progress: 100 },
    { name: '官网', progress: 100 },
    { name: '云平台业务', progress: 100 },
    { name: 'IDC 业务', progress: 80 },
    { name: 'API 业务', progress: 60 },
    { name: 'LLM 对话平台', progress: 60 }
  ]

  const modalContent = {
    background: {
      title: '📋 背景',
      content: '探索型新项目，需快速完成从 0 到 1 的产品流程梳理与初步设计。'
    },
    tasks: {
      title: '🎯 任务进度',
      content: tasks
    },
    actions: {
      title: '⚡ 行动',
      content: [
        { label: '深度分析', text: '全面拆解业务需求，梳理用户画像、功能框架' },
        { label: '全栈设计', text: '完成企业后台与官网的高保真原型设计：246 个文件夹，458 个文件，300+ 页面及弹窗' },
        { label: '代码产出', text: '累计编写 18,000+ 行代码' },
        { label: '物料优化', text: '完成算多多演示视频与 PPT 的精细化打磨' }
      ]
    },
    results: {
      title: '🏆 结果',
      content: [
        '确立了全局产品思维，确保架构具有高扩展性与易用性',
        '输出了清晰的产品流程图与完整设计稿，为研发落地奠定坚实基础'
      ]
    }
  }

  return (
    <motion.div
      className="slide suanduoduo-slide"
      variants={contentVariants}
      initial="hidden"
      animate="visible"
    >
      <CyberGrid />
      <TechCorners />
      <motion.div className="slide-header" variants={itemVariants}>
        <h2 className="slide-title">
          <span className="title-icon">◈</span>
          重点项目：算多多
          <span className="title-icon">◈</span>
        </h2>
        <p className="slide-subtitle">探索型新项目</p>
      </motion.div>

      <div className="suanduoduo-container">
        <motion.div className="project-status-bar" variants={itemVariants}>
          <span className="status-badge in-progress">
            <span className="status-pulse"></span>
            🔄 进行中
          </span>
        </motion.div>

        {/* Stats Overview */}
        <motion.div className="stats-overview" variants={itemVariants}>
          <div className="stat-box">
            <span className="stat-number">{isActive ? <AnimatedCounter end={246} /> : '246'}</span>
            <span className="stat-label">文件夹</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{isActive ? <AnimatedCounter end={458} /> : '458'}</span>
            <span className="stat-label">文件</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{isActive ? <><AnimatedCounter end={300} suffix="+" /></> : '300+'}</span>
            <span className="stat-label">页面</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{isActive ? <><AnimatedCounter end={18} suffix="K+" /></> : '18K+'}</span>
            <span className="stat-label">代码行</span>
          </div>
        </motion.div>

        {/* Clickable Cards */}
        <div className="info-cards-grid">
          <motion.div
            className="info-card"
            variants={itemVariants}
            whileHover={{ scale: 1.03, borderColor: 'rgba(79, 209, 197, 0.6)' }}
            onClick={() => setActiveModal('background')}
          >
            <span className="card-icon">📋</span>
            <span className="card-title">背景</span>
            <span className="card-hint">点击查看</span>
          </motion.div>

          <motion.div
            className="info-card"
            variants={itemVariants}
            whileHover={{ scale: 1.03, borderColor: 'rgba(79, 209, 197, 0.6)' }}
            onClick={() => setActiveModal('tasks')}
          >
            <span className="card-icon">🎯</span>
            <span className="card-title">任务进度</span>
            <span className="card-hint">点击查看</span>
          </motion.div>

          <motion.div
            className="info-card"
            variants={itemVariants}
            whileHover={{ scale: 1.03, borderColor: 'rgba(79, 209, 197, 0.6)' }}
            onClick={() => setActiveModal('actions')}
          >
            <span className="card-icon">⚡</span>
            <span className="card-title">行动</span>
            <span className="card-hint">点击查看</span>
          </motion.div>

          <motion.div
            className="info-card"
            variants={itemVariants}
            whileHover={{ scale: 1.03, borderColor: 'rgba(79, 209, 197, 0.6)' }}
            onClick={() => setActiveModal('results')}
          >
            <span className="card-icon">🏆</span>
            <span className="card-title">结果</span>
            <span className="card-hint">点击查看</span>
          </motion.div>
        </div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setActiveModal(null)}>×</button>
              <h3 className="modal-title">{modalContent[activeModal].title}</h3>

              {activeModal === 'background' && (
                <p className="modal-text">{modalContent[activeModal].content}</p>
              )}

              {activeModal === 'tasks' && (
                <div className="modal-tasks">
                  {modalContent[activeModal].content.map((task, index) => (
                    <div key={index} className="modal-task-item">
                      <div className="modal-task-info">
                        <span>{task.name}</span>
                        <span className="modal-task-percent">{task.progress}%</span>
                      </div>
                      <div className="modal-task-bar">
                        <motion.div
                          className="modal-task-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${task.progress}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeModal === 'actions' && (
                <ul className="modal-list">
                  {modalContent[activeModal].content.map((item, index) => (
                    <li key={index}>
                      <strong>{item.label}：</strong>{item.text}
                    </li>
                  ))}
                </ul>
              )}

              {activeModal === 'results' && (
                <ul className="modal-list result">
                  {modalContent[activeModal].content.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}


// ============================================
// Slide 7: 专项行动 - 数字员工
// ============================================
function DigitalEmployeeSlide() {
  const [activeModal, setActiveModal] = useState(null)

  const modalContent = {
    background: {
      title: '📋 背景',
      content: '数字员工作为热门 AI 应用方向，结合 MCP、Agent 能力不断拓展 LLM 边界。'
    },
    task: {
      title: '🎯 任务',
      content: '联合财务部、技术部推出首位数字员工——应收应付专员。'
    },
    actions: {
      title: '⚡ 行动',
      content: [
        { label: '流程梳理', text: '与伙伴云等供应商沟通合作模式，核算成本并确定实现路径' },
        { label: '三步走策略', text: '1. 先实现实收付款 → 2. 后对接电子发票接口 → 3. 最后打通收付款与合同流' }
      ]
    },
    results: {
      title: '🏆 结果',
      content: ['已投入实际使用，并在持续迭代优化中']
    }
  }

  return (
    <motion.div
      className="slide suanduoduo-slide"
      variants={contentVariants}
      initial="hidden"
      animate="visible"
    >
      <CyberGrid />
      <TechCorners />
      <motion.div className="slide-header" variants={itemVariants}>
        <h2 className="slide-title">
          <span className="title-icon">◈</span>
          专项行动：数字员工
          <span className="title-icon">◈</span>
        </h2>
        <p className="slide-subtitle">DIGITAL EMPLOYEE INITIATIVE</p>
      </motion.div>

      <div className="suanduoduo-container">
        <motion.div className="initiative-icon-large" variants={itemVariants}>
          <span className="icon-glow">🤖</span>
        </motion.div>

        <motion.div className="compact-highlight" variants={itemVariants}>
          首位数字员工：<strong className="neon-text">应收应付专员</strong> — 已投入使用
        </motion.div>

        <div className="info-cards-grid">
          <motion.div className="info-card" variants={itemVariants} whileHover={{ scale: 1.03 }} onClick={() => setActiveModal('background')}>
            <span className="card-icon">📋</span>
            <span className="card-title">背景</span>
            <span className="card-hint">点击查看</span>
          </motion.div>
          <motion.div className="info-card" variants={itemVariants} whileHover={{ scale: 1.03 }} onClick={() => setActiveModal('task')}>
            <span className="card-icon">🎯</span>
            <span className="card-title">任务</span>
            <span className="card-hint">点击查看</span>
          </motion.div>
          <motion.div className="info-card" variants={itemVariants} whileHover={{ scale: 1.03 }} onClick={() => setActiveModal('actions')}>
            <span className="card-icon">⚡</span>
            <span className="card-title">行动</span>
            <span className="card-hint">点击查看</span>
          </motion.div>
          <motion.div className="info-card" variants={itemVariants} whileHover={{ scale: 1.03 }} onClick={() => setActiveModal('results')}>
            <span className="card-icon">🏆</span>
            <span className="card-title">结果</span>
            <span className="card-hint">点击查看</span>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {activeModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveModal(null)}>
            <motion.div className="modal-content" initial={{ opacity: 0, scale: 0.8, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 50 }} onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setActiveModal(null)}>×</button>
              <h3 className="modal-title">{modalContent[activeModal].title}</h3>
              {(activeModal === 'background' || activeModal === 'task') && <p className="modal-text">{modalContent[activeModal].content}</p>}
              {activeModal === 'actions' && <ul className="modal-list">{modalContent[activeModal].content.map((item, i) => <li key={i}><strong>{item.label}：</strong>{item.text}</li>)}</ul>}
              {activeModal === 'results' && <ul className="modal-list result">{modalContent[activeModal].content.map((item, i) => <li key={i}>{item}</li>)}</ul>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ============================================
// Slide 8: 专项行动 - AI 技术学习与赋能
// ============================================
function AILearningSlide({ isActive }) {
  const [activeModal, setActiveModal] = useState(null)

  const modalContent = {
    background: {
      title: '📋 背景',
      content: '传统工作流 (原型→设计→开发) 链路长、效率低 (典型耗时：3 人 10 天)'
    },
    task: {
      title: '🎯 任务',
      content: '引入 AI 技术重塑工作流，并赋能团队。'
    },
    actions: {
      title: '⚡ 行动',
      content: [
        { label: '系统评测', text: '掌握不同 AI 模型的差异点与适用场景' },
        { label: '实践开发', text: '实践"一端多云"开发模式，独立完成"茶室小程序"全栈开发' },
        { label: '团队分享', text: '多次分享高效 AI 工具，手把手指导同事入门 AI' }
      ]
    },
    results: {
      title: '🏆 结果',
      content: ['思考深度 +50%', '思考广度 +100%', '设计美观度 +200%', '掌握图片优化、视频制作等新技能', '有效激发团队对 AI 的兴趣']
    }
  }

  return (
    <motion.div className="slide suanduoduo-slide" variants={contentVariants} initial="hidden" animate="visible">
      <CyberGrid />
      <TechCorners />
      <motion.div className="slide-header" variants={itemVariants}>
        <h2 className="slide-title"><span className="title-icon">◈</span>专项行动：AI 技术学习与赋能<span className="title-icon">◈</span></h2>
        <p className="slide-subtitle">AI LEARNING & EMPOWERMENT</p>
      </motion.div>

      <div className="suanduoduo-container">
        <motion.div className="initiative-icon-large" variants={itemVariants}><span className="icon-glow">📚</span></motion.div>

        <motion.div className="stats-overview" variants={itemVariants}>
          <div className="stat-box"><span className="stat-number">{isActive ? <><AnimatedCounter end={50} prefix="+" suffix="%" /></> : '+50%'}</span><span className="stat-label">思考深度</span></div>
          <div className="stat-box"><span className="stat-number">{isActive ? <><AnimatedCounter end={100} prefix="+" suffix="%" /></> : '+100%'}</span><span className="stat-label">思考广度</span></div>
          <div className="stat-box"><span className="stat-number">{isActive ? <><AnimatedCounter end={200} prefix="+" suffix="%" /></> : '+200%'}</span><span className="stat-label">设计美观</span></div>
          <div className="stat-box"><span className="stat-number">{isActive ? <><AnimatedCounter end={60} suffix="K+" /></> : '60K+'}</span><span className="stat-label">茶室代码</span></div>
        </motion.div>

        <div className="info-cards-grid">
          <motion.div className="info-card" variants={itemVariants} whileHover={{ scale: 1.03 }} onClick={() => setActiveModal('background')}>
            <span className="card-icon">📋</span><span className="card-title">背景</span><span className="card-hint">点击查看</span>
          </motion.div>
          <motion.div className="info-card" variants={itemVariants} whileHover={{ scale: 1.03 }} onClick={() => setActiveModal('task')}>
            <span className="card-icon">🎯</span><span className="card-title">任务</span><span className="card-hint">点击查看</span>
          </motion.div>
          <motion.div className="info-card" variants={itemVariants} whileHover={{ scale: 1.03 }} onClick={() => setActiveModal('actions')}>
            <span className="card-icon">⚡</span><span className="card-title">行动</span><span className="card-hint">点击查看</span>
          </motion.div>
          <motion.div className="info-card" variants={itemVariants} whileHover={{ scale: 1.03 }} onClick={() => setActiveModal('results')}>
            <span className="card-icon">🏆</span><span className="card-title">结果</span><span className="card-hint">点击查看</span>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {activeModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveModal(null)}>
            <motion.div className="modal-content" initial={{ opacity: 0, scale: 0.8, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 50 }} onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setActiveModal(null)}>×</button>
              <h3 className="modal-title">{modalContent[activeModal].title}</h3>
              {(activeModal === 'background' || activeModal === 'task') && <p className="modal-text">{modalContent[activeModal].content}</p>}
              {activeModal === 'actions' && <ul className="modal-list">{modalContent[activeModal].content.map((item, i) => <li key={i}><strong>{item.label}：</strong>{item.text}</li>)}</ul>}
              {activeModal === 'results' && <ul className="modal-list result">{modalContent[activeModal].content.map((item, i) => <li key={i}>{item}</li>)}</ul>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ============================================
// Slide 9: 其他业务支撑
// ============================================
function OtherProjectsSlide() {
  const completedProjects = [
    '浦发 B2B 项目',
    <>将台乡视频剪辑 (<span className="num-highlight">300+</span> 图片, <span className="num-highlight">200+</span> 视频片段)</>,
    <>茶室小程序 (<span className="num-highlight">45</span> 个文件夹, <span className="num-highlight">294</span> 个文件, <span className="num-highlight">120+</span> 页面, <span className="num-highlight">60,000+</span> 行代码)</>,
    'UI 设计支持',
    'HICOOL 创业大赛 BP',
    '金融数据 AI 产品',
    '发改委项目 PPT 修改',
    '加密货币数据 AI 产品 CryptoX',
    'MultiAlpha 网站设计',
    '成龙币项目'
  ]

  const ongoingProjects = [
    '伙伴云财务应收应付',
    '星地通 UI 改版',
    '园区介绍完善',
    '星地官网改版',
    '算多多 - 详见重点项目'
  ]

  return (
    <motion.div
      className="slide other-projects-slide"
      variants={contentVariants}
      initial="hidden"
      animate="visible"
    >
      <CyberGrid />
      <TechCorners />
      <motion.div className="slide-header" variants={itemVariants}>
        <h2 className="slide-title">
          <span className="title-icon">◈</span>
          其他业务支撑
          <span className="title-icon">◈</span>
        </h2>
        <p className="slide-subtitle">OTHER BUSINESS SUPPORT</p>
      </motion.div>
      <div className="projects-two-col">
        <motion.div className="projects-col completed-col" variants={itemVariants}>
          <h3 className="col-title">
            <span className="col-icon">✅</span>
            已完成项目 (10 项)
          </h3>
          <ul className="projects-list">
            {completedProjects.map((project, index) => (
              <motion.li
                key={index}
                className="project-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <span className="item-num">{index + 1}.</span>
                <span className="item-text">{project}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
        <motion.div className="projects-col ongoing-col" variants={itemVariants}>
          <h3 className="col-title">
            <span className="col-icon">🔄</span>
            跟进中项目 (5 项)
          </h3>
          <ul className="projects-list">
            {ongoingProjects.map((project, index) => (
              <motion.li
                key={index}
                className="project-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <span className="item-num">{index + 1}.</span>
                <span className="item-text">{project}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ============================================
// Slide 10: 年度复盘 - 不足与反思
// ============================================
function ReflectionSlide() {
  return (
    <motion.div
      className="slide reflection-slide"
      variants={contentVariants}
      initial="hidden"
      animate="visible"
    >
      <CyberGrid />
      <TechCorners />
      <Snowflakes />
      <motion.div className="slide-header" variants={itemVariants}>
        <h2 className="slide-title">
          <span className="title-icon">◈</span>
          年度复盘：不足与反思
          <span className="title-icon">◈</span>
        </h2>
        <p className="slide-subtitle">ROOT CAUSE ANALYSIS</p>
      </motion.div>
      <div className="reflection-container">
        <motion.div className="reflection-issue" variants={itemVariants}>
          <h3 className="issue-title">
            <span className="issue-icon">⚠️</span>
            早期过度依赖 AI (Early Over-reliance on AI)
          </h3>
          <div className="issue-content">
            <div className="phenomenon">
              <strong>现象 1：</strong>在产出早期云招商 SOP 文档及把控算多多功能时，缺乏全局思维。
            </div>
            <div className="root-cause">
              <strong>根源：</strong><span className="cause-highlight">盲目相信 AI</span>。在业务架构和逻辑构建上过于依赖 AI 自动生成，导致缺乏人对业务全局的主动思考与把控。
            </div>
          </div>
        </motion.div>

        <motion.div className="reflection-issue" variants={itemVariants}>
          <h3 className="issue-title">
            <span className="issue-icon">⚠️</span>
            资源整合与效率意识 (Resource Efficiency)
          </h3>
          <div className="issue-content">
            <div className="phenomenon">
              <strong>现象 2：</strong>在准备团队培训素材时，投入过多精力自行录制基础课程。
            </div>
            <div className="root-cause">
              <strong>根源：</strong><span className="cause-highlight">重复造轮子 (Reinventing the Wheel)</span>。网络上已有大量优质 AI 课程，应优先筛选并分享，避免低效的重复劳动。
            </div>
          </div>
        </motion.div>

        <motion.div className="improvement-direction" variants={itemVariants}>
          <h3 className="direction-title">📈 改进方向</h3>
          <ul className="direction-list">
            <li>强化"人是核心"的理念，将 AI 视为参谋而非决策者</li>
            <li>获取 AI 建议后，强制进行二次逻辑校验和业务适配性思考</li>
            <li>提升资源整合能力，优先复用现有优质资产，将精力聚焦于高价值的业务创新</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ============================================
// Slide 11: 2026 年度规划
// ============================================
function PlanningSlide() {
  const plans = [
    { icon: '📖', title: '知识共享', text: '建立团队内部 AI 知识库，及时分享优质课程与工具，带动全员进步' },
    { icon: '🎯', title: '深化应用', text: '将 AI 从"代码/设计辅助"推向"业务决策辅助"' },
    { icon: '🔄', title: '项目优化', text: '持续迭代"云招商"及"数字员工"，挖掘数据价值，提升转化率' },
    { icon: '🚀', title: '新产品上线', text: '全力保障"算多多"从 MVP 向正式版演进，实现全面推广' },
    { icon: '🤖', title: '新数字员工', text: '开发"电子发票专员"与"合同专员"，打通财法业务闭环' },
    { icon: '⚡', title: '全面提效', text: '挖掘更多 AI 落地场景，助力公司全业务环节降本增效' }
  ]

  return (
    <motion.div
      className="slide planning-2026-slide"
      variants={contentVariants}
      initial="hidden"
      animate="visible"
    >
      <CyberGrid />
      <TechCorners />
      <motion.div className="slide-header" variants={itemVariants}>
        <h2 className="slide-title">
          <span className="title-icon">◈</span>
          2026 年度规划
          <span className="title-icon">◈</span>
        </h2>
        <p className="slide-subtitle">ANNUAL PLANNING (LONG-TERM)</p>
      </motion.div>
      <div className="planning-grid">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className="plan-card"
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              borderColor: 'rgba(79, 209, 197, 0.6)',
              boxShadow: '0 0 30px rgba(79, 209, 197, 0.2)'
            }}
          >
            <div className="plan-icon">{plan.icon}</div>
            <div className="plan-content">
              <h4 className="plan-title">{plan.title}</h4>
              <p className="plan-text">{plan.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// ============================================
// Slide 12: 前沿技术追踪与转化
// ============================================
function TechTrackingSlide() {
  const trackingItems = [
    {
      icon: '🔭',
      title: '深度追踪',
      text: '持续跟进 多模态交互、推理型模型 (Reasoning Models) 及 自主智能体 (Autonomous Agents) 的最新进展'
    },
    {
      icon: '⏱️',
      title: '快速验证',
      text: '建立"24 小时评测机制"，第一时间评估新技术在业务场景中的落地可行性'
    },
    {
      icon: '💎',
      title: '价值转化',
      text: '不止于"看"，更重于"用"，避免技术与业务脱节，将前沿技术转化为实际生产力'
    }
  ]

  return (
    <motion.div
      className="slide tech-tracking-slide"
      variants={contentVariants}
      initial="hidden"
      animate="visible"
    >
      <CyberGrid />
      <TechCorners />
      <motion.div className="slide-header" variants={itemVariants}>
        <h2 className="slide-title">
          <span className="title-icon">◈</span>
          前沿技术追踪与转化
          <span className="title-icon">◈</span>
        </h2>
        <p className="slide-subtitle">FRONTIER TECH TRACKING & CONVERSION</p>
      </motion.div>
      <div className="tracking-grid">
        {trackingItems.map((item, index) => (
          <motion.div
            key={index}
            className="tracking-card"
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              borderColor: 'rgba(246, 173, 85, 0.6)',
              boxShadow: '0 0 40px rgba(246, 173, 85, 0.2)'
            }}
          >
            <div className="tracking-icon">{item.icon}</div>
            <h4 className="tracking-title">{item.title}</h4>
            <p className="tracking-text">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// ============================================
// Slide 13: AI 助力决策 - 双模博弈决策法
// ============================================
function DecisionMethodSlide() {
  const steps = [
    { num: '1', title: '多源咨询', text: '针对同一问题，同时询问两个不同架构或性格的 AI (如 Claude vs GPT)' },
    { num: '2', title: '差异分析', text: '对比两者的观点、论据来源及底层逻辑差异' },
    { num: '3', title: '标准提炼', text: '从"辩论"中总结出评判问题的核心标准与关键维度' },
    { num: '4', title: '科学取舍', text: '依据标准，结合公司实际资源做取舍' },
    { num: '5', title: '最终产出', text: '实现科学决策，找到兼顾效率与质量的最佳方案' }
  ]

  return (
    <motion.div
      className="slide decision-slide"
      variants={contentVariants}
      initial="hidden"
      animate="visible"
    >
      <CyberGrid />
      <TechCorners />
      <motion.div className="slide-header" variants={itemVariants}>
        <h2 className="slide-title">
          <span className="title-icon">◈</span>
          AI 助力决策
          <span className="title-icon">◈</span>
        </h2>
        <p className="slide-subtitle">AI-ASSISTED DECISION MAKING</p>
      </motion.div>
      <div className="decision-container">
        <motion.div className="method-title" variants={itemVariants}>
          <span className="method-icon">🎯</span>
          核心工作流：<strong className="neon-text">"双模博弈"决策法</strong>
          <span className="method-eng">(Dual-Model Game Decision Method)</span>
        </motion.div>
        <div className="decision-steps">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="decision-step"
              variants={itemVariants}
              whileHover={{ scale: 1.02, borderColor: 'rgba(102, 126, 234, 0.6)' }}
            >
              <div className="step-number">{step.num}</div>
              <div className="step-content">
                <h4 className="step-title">{step.title}</h4>
                <p className="step-text">{step.text}</p>
              </div>
              {index < steps.length - 1 && <div className="step-connector">
                <span className="connector-line"></span>
                <span className="connector-arrow">↓</span>
              </div>}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// Slide 14: 总结与致谢
// ============================================
function Fireworks() {
  const colors = ['#f6ad55', '#4fd1c5', '#667eea', '#fc8181', '#68d391', '#f687b3']
  const emojis = ['🎉', '✨', '🎊', '🌟', '💫', '🎆']

  return (
    <div className="fireworks-container">
      {/* Confetti particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`confetti-${i}`}
          className="confetti"
          style={{
            left: `${Math.random() * 100}%`,
            background: colors[Math.floor(Math.random() * colors.length)],
            width: `${5 + Math.random() * 10}px`,
            height: `${5 + Math.random() * 10}px`,
          }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{
            y: ['0vh', '100vh'],
            opacity: [0, 1, 1, 0],
            rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
            x: [0, (Math.random() - 0.5) * 200]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
      {/* Floating emojis */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`emoji-${i}`}
          className="floating-emoji"
          style={{ left: `${5 + Math.random() * 90}%` }}
          initial={{ y: '100vh', opacity: 0, scale: 0.5 }}
          animate={{
            y: [null, '-20vh'],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1.2, 0.8],
            rotate: [0, Math.random() > 0.5 ? 20 : -20]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: i * 0.3 + Math.random(),
            repeat: Infinity,
            ease: 'easeOut'
          }}
        >
          {emojis[Math.floor(Math.random() * emojis.length)]}
        </motion.div>
      ))}
      {/* Firework bursts */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`burst-${i}`}
          className="firework-burst"
          style={{
            left: `${15 + i * 18}%`,
            top: `${20 + Math.random() * 30}%`
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.8 + 1,
            repeat: Infinity,
            repeatDelay: 3
          }}
        />
      ))}
    </div>
  )
}

function ThankYouSlide() {
  const keywords = ['AI赋能', '效率跨越', '深度思考', '驾驭工具', '决策判断', '认知升级']

  return (
    <motion.div className="slide thankyou-final" variants={contentVariants} initial="hidden" animate="visible">
      <CyberGrid />
      <TechCorners />
      <Fireworks />
      <div className="thankyou-final-content">
        <motion.div className="thankyou-top" variants={itemVariants}>
          <span className="ty-emoji">🙏</span>
          <h2 className="ty-title"><GlitchText>总结与致谢</GlitchText></h2>
        </motion.div>

        <motion.div className="ty-main" variants={itemVariants}>
          <div className="ty-col">
            <div className="ty-block">
              <span className="ty-icon">💭</span>
              <div className="ty-text">
                <strong>感悟：</strong>从<span className="ty-hl">大刀长矛</span>到<span className="ty-hl">坚船利炮</span>，效率提升更是维度跨越
              </div>
            </div>
            <div className="ty-block">
              <span className="ty-icon">✨</span>
              <div className="ty-text">
                <strong>蜕变：</strong>AI接管执行，人的价值在<span className="ty-hl">驾驭工具</span>、<span className="ty-hl">深度思考</span>、<span className="ty-hl">决策判断</span>
              </div>
            </div>
          </div>
          <div className="ty-col">
            <div className="ty-block">
              <span className="ty-icon">🚀</span>
              <div className="ty-text">
                <strong>展望：</strong>比拼<span className="ty-hl">认知与智慧</span>，将AI探索进行到底，创造更大价值！
              </div>
            </div>
            <div className="ty-block">
              <span className="ty-icon">❤️</span>
              <div className="ty-text">
                <strong>感谢：</strong>公司、领导和同事们的信任与支持！
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="ty-tags" variants={itemVariants}>
          {keywords.map((tag, i) => (
            <span key={i} className="ty-tag">{tag}</span>
          ))}
        </motion.div>

        <motion.div className="ty-sig" variants={itemVariants}>
          <span className="cyber-bracket">[</span> 潘喜乐 <span className="cyber-bracket">]</span>
          <span className="ty-date">2026年1月</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ============================================
// Main App Component
// ============================================
function App() {
  // Start with password gate - user must enter password first
  const [currentPage, setCurrentPage] = useState('password') // 'password', 'home', 'presentation'
  const [[currentSlide, direction], setSlide] = useState([0, 0])
  const slides = [
    CoverSlide,           // 1. 封面
    MetricsSlide,         // 2. 核心成果概览
    TechStackSlide,       // 3. 技术栈掌握
    PhilosophySlide,      // 4. 人与AI协同思考
    SuanduoduoSlide,      // 5. 算多多
    CloudInvestmentSlide, // 6. 云招商
    DigitalEmployeeSlide, // 7. 数字员工
    AILearningSlide,      // 8. AI技术学习与赋能
    OtherProjectsSlide,   // 9. 其他业务支撑
    ReflectionSlide,      // 10. 不足与反思
    PlanningSlide,        // 11. 2026规划
    TechTrackingSlide,    // 12. 前沿技术追踪
    DecisionMethodSlide,  // 13. 双模博弈决策法
    ThankYouSlide         // 14. 总结与致谢
  ]
  const totalSlides = slides.length

  const goToSlide = useCallback((index) => {
    if (index >= 0 && index < totalSlides) {
      setSlide([index, index > currentSlide ? 1 : -1])
    }
  }, [currentSlide, totalSlides])

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setSlide([currentSlide + 1, 1])
    }
  }, [currentSlide, totalSlides])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setSlide([currentSlide - 1, -1])
    }
  }, [currentSlide])

  useEffect(() => {
    if (currentPage !== 'presentation') return

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        nextSlide()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        prevSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide, currentPage])

  // Show password gate first when entering the site
  if (currentPage === 'password') {
    return (
      <PasswordGate
        onUnlock={() => setCurrentPage('home')}
        onBack={null}
      />
    )
  }

  // After password, show homepage
  if (currentPage === 'home') {
    return <Homepage onEnter={() => setCurrentPage('presentation')} />
  }

  const SlideComponent = slides[currentSlide]

  return (
    <div className="presentation">
      {/* Cursor Glow Effect */}
      <CursorGlow />

      {/* Transition Progress Bar */}
      <div className="progress-indicator">
        <motion.div
          className="progress-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Slide Content with AnimatePresence */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={getSlideVariants(currentSlide)}
          initial="enter"
          animate="center"
          exit="exit"
          className="slide-wrapper"
          style={{ perspective: '1200px' }}
        >
          <SlideComponent isActive={true} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="nav-arrows">
        <motion.button
          className={`nav-arrow prev ${currentSlide === 0 ? 'disabled' : ''}`}
          onClick={prevSlide}
          disabled={currentSlide === 0}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="arrow-icon">‹</span>
        </motion.button>
        <motion.button
          className={`nav-arrow next ${currentSlide === totalSlides - 1 ? 'disabled' : ''}`}
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="arrow-icon">›</span>
        </motion.button>
      </div>

      {/* Slide Indicators */}
      <div className="slide-indicators">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            className={`indicator ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="slide-counter">
        <span className="current">{String(currentSlide + 1).padStart(2, '0')}</span>
        <span className="separator">/</span>
        <span className="total">{String(totalSlides).padStart(2, '0')}</span>
      </div>

      {/* Keyboard Hints */}
      <div className="keyboard-hints">
        <span className="hint-key">←</span>
        <span className="hint-key">→</span>
      </div>
    </div>
  )
}

export default App
