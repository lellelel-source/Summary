import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import 'aos/dist/aos.css'
import AOS from 'aos'
import './index.css'
import Popup from './components/Popup'
import ImageViewer from './components/ImageViewer'
import { useParticles } from './hooks/useParticles'
import { useTilt } from './hooks/useTilt'
import { MouseGlow } from './components/MouseGlow'
import { TypeWriter } from './components/TypeWriter'
import { ScrollProgress } from './components/ScrollProgress'
import { MorphingBlob } from './components/MorphingBlob'
import { StatsGrid } from './components/StatsCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'

export default function ReportApp() {
  const { canvasRef, changeScene } = useParticles()
  const [modalContent, setModalContent] = useState<null | { key: string; scene: number; returnScene: number; title: string; icon: React.ReactNode; color: 'sky' | 'violet'; content?: string | string[] }>(null)
  const [imageViewer, setImageViewer] = useState<null | { src: string; alt: string }>(null)
  const [hoveredModel, setHoveredModel] = useState<string | null>(null)
  const [tooltipTimeout, setTooltipTimeout] = useState<ReturnType<typeof setTimeout> | null>(null)

  const tiltRef1 = useTilt()
  const tiltRef2 = useTilt()
  const tiltRef3 = useTilt()
  const tiltRef4 = useTilt()
  const tiltRef5 = useTilt()
  const tiltRefs = [tiltRef1, tiltRef2, tiltRef3]

  const handleModelHover = (modelName: string) => {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout)
    }
    setHoveredModel(modelName)
  }

  const handleModelLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredModel(null)
    }, 3000)
    setTooltipTimeout(timeout)
  }

  useEffect(() => {
    AOS.init({ duration: 800, once: true })
  }, [])

  // Handle image clicks in popups
  useEffect(() => {
    const handleImageClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const imageContainer = target.closest('[data-image]') as HTMLElement
      if (imageContainer) {
        const src = imageContainer.getAttribute('data-image')
        const alt = imageContainer.getAttribute('data-alt')
        if (src && alt) {
          setImageViewer({ src, alt })
        }
      }
    }

    document.addEventListener('click', handleImageClick)
    return () => document.removeEventListener('click', handleImageClick)
  }, [])

  // Sync background particle scene with visible section like in the original HTML
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('.full-page-section'))
    if (sections.length === 0) return
    const sceneMapping: Record<number, number> = {
      0: 0, // Intro
      1: 1, // Achievements summary
      2: 5, // Plan summary
      3: 6, // Summary
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (modalContent) return // keep detail scene while modal open
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target as HTMLElement)
            const next = sceneMapping[idx]
            if (typeof next === 'number') changeScene(next)
          }
        }
      },
      { threshold: 0.7 }
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [modalContent, changeScene])

  return (
    <div className="antialiased">
      <ScrollProgress />
      <MouseGlow />
      <canvas id="particle-canvas" ref={canvasRef} />

      {/* Morphing blobs for visual interest */}
      <MorphingBlob color="rgba(0, 195, 255, 0.2)" size={600} className="top-10 left-[-200px] blur-3xl pointer-events-none" />
      <MorphingBlob color="rgba(167, 139, 250, 0.2)" size={500} className="top-1/3 right-[-150px] blur-3xl pointer-events-none" />
      <MorphingBlob color="rgba(192, 132, 252, 0.15)" size={450} className="bottom-1/4 left-[-100px] blur-3xl pointer-events-none" />

      <section className="full-page-section text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-black text-white hero-title"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          >
            潘喜乐
          </motion.h1>
          <TypeWriter
            text="转正述职报告"
            className="text-3xl md:text-5xl font-bold mt-4 section-title inline-block"
            delay={0.5}
          />
          <motion.h3
            className="text-xl md:text-2xl font-medium mt-4 text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            October 2025
          </motion.h3>
        </motion.div>
        <motion.p
          className="mt-8 text-xl md:text-2xl max-w-4xl text-gray-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          在过去的半年里，我不仅快速适应了产品经理的工作要求，更将主要精力投入到AI技术的学习与实践中，积极探索如何利用AI深度赋能我的工作，为团队创造新的价值。
        </motion.p>
        <motion.div
          className="absolute bottom-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 2 },
            y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <svg className="w-8 h-8 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </section>

      {/* Enhanced Stats Section with shadcn UI */}
      <section className="full-page-section">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
              Overall Performance Metrics
            </h2>
            <p className="text-xl text-gray-400">Using shadcn UI components for enhanced visualization</p>
          </motion.div>

          <StatsGrid
            stats={[
              {
                title: "Code Files Generated",
                value: "10+",
                description: "Across multiple projects",
                progress: 85,
                badge: "High Impact",
                badgeVariant: "success",
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                )
              },
              {
                title: "Lines of Code",
                value: "14,000+",
                description: "Production-ready code",
                progress: 92,
                badge: "Excellent",
                badgeVariant: "default",
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )
              },
              {
                title: "Design Pages",
                value: "170+",
                description: "UI/UX deliverables",
                progress: 78,
                badge: "Creative",
                badgeVariant: "secondary",
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                )
              },
              {
                title: "Users Attracted",
                value: "1,000+",
                description: "Via cloud recruitment",
                progress: 95,
                badge: "Growing",
                badgeVariant: "warning",
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              }
            ]}
          />

          <motion.div
            className="mt-16 grid md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-sky-400">AI Technology Stack</CardTitle>
                  <Badge variant="success">13 Models</Badge>
                </div>
                <CardDescription>Mastered cutting-edge AI models and tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {['Gemini', 'Claude', 'GPT-5', 'Grok-4', 'Cursor', 'Sora', 'Flux', 'Minimax'].map((tech) => (
                    <Badge key={tech} variant="outline" className="hover:bg-sky-900/30 transition-colors cursor-default">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="pt-4">
                  <Button className="w-full" variant="default">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    View Full Tech Stack
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-violet-400">Project Portfolio</CardTitle>
                  <Badge variant="secondary">15 Projects</Badge>
                </div>
                <CardDescription>Completed and ongoing business initiatives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Completed</span>
                    <span className="text-green-400 font-medium">10 projects</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">In Progress</span>
                    <span className="text-amber-400 font-medium">5 projects</span>
                  </div>
                </div>
                <div className="pt-4">
                  <Button className="w-full" variant="secondary">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Explore Projects
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="full-page-section">
        <div className="achievement-view view-visible">
          <div className="container mx-auto max-w-7xl text-center">
            <motion.h2
              className="text-5xl md:text-6xl font-bold mb-12 section-title"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              工作回顾 & 核心成果
            </motion.h2>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
            >
              {[
                {
                  key: 'yun',
                  title: '主导“云招商”项目',
                  scene: 2,
                  content:
                    '<div class="space-y-6 text-gray-300 text-xl">\
                      <div class="mb-6 p-4 bg-gray-800/50 rounded-lg">\
                        <h4 class="text-white font-semibold mb-3 text-2xl">📊 数据成果</h4>\
                        <div class="grid grid-cols-2 gap-4">\
                          <div class="text-center p-3 bg-sky-900/30 rounded">\
                            <div class="text-3xl font-bold text-sky-400">10+</div>\
                            <div class="text-sm text-gray-400 mt-1">代码文件</div>\
                          </div>\
                          <div class="text-center p-3 bg-sky-900/30 rounded">\
                            <div class="text-3xl font-bold text-sky-400">4000+</div>\
                            <div class="text-sm text-gray-400 mt-1">代码行数</div>\
                          </div>\
                          <div class="text-center p-3 bg-sky-900/30 rounded">\
                            <div class="text-3xl font-bold text-sky-400">50+</div>\
                            <div class="text-sm text-gray-400 mt-1">设计页面</div>\
                          </div>\
                          <div class="text-center p-3 bg-sky-900/30 rounded">\
                            <div class="text-3xl font-bold text-sky-400">1000</div>\
                            <div class="text-sm text-gray-400 mt-1">吸引用户</div>\
                          </div>\
                        </div>\
                      </div>\
                      <p><strong class="text-white">背景(S):</strong> 公司需要一个线上化的招商工具来拓展客户渠道，触达更多潜在用户。</p>\
                      <p><strong class="text-white">任务(T):</strong> 负责"云招商"v1.0版本的上线、运营和迭代工作。</p>\
                      <p><strong class="text-white">行动(A):</strong> 使用Cursor、Gemini产出代码文件10多份，代码4000+行；使用Figma进行素材管理和原型设计，生成页面数50+（计算上中间文件）。</p>\
                      <div class="grid grid-cols-2 gap-4 my-4">\
                        <div class="bg-gray-800/40 rounded-lg p-4 border border-gray-700/50 hover:border-sky-500/50 transition-all cursor-pointer" data-image="/src/assets/统计.png" data-alt="代码统计">\
                          <div class="bg-gray-900/50 rounded overflow-hidden mb-3">\
                            <img src="/src/assets/统计.png" alt="代码统计" class="w-full rounded" />\
                          </div>\
                          <p class="text-center text-sm text-gray-400">代码统计</p>\
                        </div>\
                        <div class="bg-gray-800/40 rounded-lg p-4 border border-gray-700/50 hover:border-sky-500/50 transition-all cursor-pointer" data-image="/src/assets/figma.png" data-alt="Figma设计">\
                          <div class="bg-gray-900/50 rounded overflow-hidden mb-3">\
                            <img src="/src/assets/figma.png" alt="Figma设计" class="w-full rounded" />\
                          </div>\
                          <p class="text-center text-sm text-gray-400">Figma设计</p>\
                        </div>\
                      </div>\
                      <p><strong class="text-white">结果(R):</strong> 项目成功上线并平稳运营，累计吸引用户近1000人，成功拉群两个，并收获了7条有效招商线索，验证了线上招商模式的可行性。</p>\
                    </div>',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                  ),
                },
                {
                  key: 'sdd',
                  title: '负责"算多多"项目',
                  scene: 3,
                  content:
                    '<div class="space-y-6 text-gray-300 text-xl">\
                      <div class="mb-6 p-4 bg-gray-800/50 rounded-lg">\
                        <h4 class="text-white font-semibold mb-3 text-2xl">📊 数据成果</h4>\
                        <div class="grid grid-cols-2 gap-4">\
                          <div class="text-center p-3 bg-sky-900/30 rounded">\
                            <div class="text-3xl font-bold text-sky-400">20</div>\
                            <div class="text-sm text-gray-400 mt-1">文件夹</div>\
                          </div>\
                          <div class="text-center p-3 bg-sky-900/30 rounded">\
                            <div class="text-3xl font-bold text-sky-400">48</div>\
                            <div class="text-sm text-gray-400 mt-1">文件</div>\
                          </div>\
                            <div class="text-center p-3 bg-sky-900/30 rounded">\
                            <div class="text-3xl font-bold text-sky-400">120</div>\
                            <div class="text-sm text-gray-400 mt-1">页面及弹窗</div>\
                          </div>\
                          <div class="text-center p-3 bg-sky-900/30 rounded">\
                          <div class="text-3xl font-bold text-sky-400">10000+</div>\
                          <div class="text-sm text-gray-400 mt-1">代码行数</div>\
                          </div>\
                        </div>\
                      </div>\
                      <p><strong class="text-white">背景(S):</strong> 作为公司的一个新探索项目，"算多多"需要快速完成从0到1的产品流程梳理和初步设计，以验证市场可行性。</p>\
                      <p><strong class="text-white">任务(T):</strong> 负责梳理"算多多"的核心产品流程，并完成企业后台和官网的初版UI设计。</p>\
                      <p><strong class="text-white">行动(A):</strong> 我深入分析了业务需求，通过不断地取舍与完善，独立完成了整个产品的功能流程图。在此基础上，我运用设计工具，完成了企业后台与官网的高保真原型设计。</p>\
                      <div class="my-4 bg-gray-800/40 rounded-lg p-4 border border-gray-700/50 hover:border-sky-500/50 transition-all cursor-pointer" data-image="/src/assets/算多多代码.png" data-alt="算多多代码统计">\
                        <div class="bg-gray-900/50 rounded overflow-hidden mb-3">\
                          <img src="/src/assets/算多多代码.png" alt="算多多代码统计" class="w-full rounded" />\
                        </div>\
                        <p class="text-center text-sm text-gray-400">算多多代码统计</p>\
                      </div>\
                      <p><strong class="text-white">结果(R):</strong> 成功在规定时间内输出了清晰的产品流程和一套完整的初版设计稿，为项目的下一步研发奠定了坚实的基础。</p>\
                    </div>',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h3m-3-10h.01M9 17h.01M9 14h.01M12 7a1 1 0 110-2 1 1 0 010 2zM5 7a1 1 0 110-2 1 1 0 010 2zm0 10a1 1 0 110-2 1 1 0 010 2zm0-5a1 1 0 110-2 1 1 0 010 2zm14-5a1 1 0 110-2 1 1 0 010 2zm0 10a1 1 0 110-2 1 1 0 010 2zm0-5a1 1 0 110-2 1 1 0 010 2z" /></svg>
                  ),
                },
                {
                  key: 'ai',
                  title: '深化AI学习与培训',
                  scene: 4,
                  content:
                    '<div class="space-y-6 text-gray-300 text-xl">\
                      <div class="mb-6 p-4 bg-gray-800/50 rounded-lg">\
                        <h4 class="text-white font-semibold mb-3 text-2xl">🤖 AI技术栈掌握</h4>\
                        <div class="grid grid-cols-2 gap-6 mb-4">\
                          <div class="bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-lg p-4">\
                            <div class="text-2xl font-bold text-purple-300 mb-2">顶级编程模型 (5)</div>\
                            <div class="flex flex-wrap gap-2">\
                              <span class="bg-purple-700/50 text-white px-3 py-1 rounded-full text-sm">Gemini</span>\
                              <span class="bg-purple-700/50 text-white px-3 py-1 rounded-full text-sm">Claude</span>\
                              <span class="bg-purple-700/50 text-white px-3 py-1 rounded-full text-sm">GPT-5</span>\
                              <span class="bg-purple-700/50 text-white px-3 py-1 rounded-full text-sm">Grok-4</span>\
                              <span class="bg-purple-700/50 text-white px-3 py-1 rounded-full text-sm">Cursor</span>\
                            </div>\
                          </div>\
                          <div class="bg-gradient-to-br from-pink-900/40 to-orange-900/40 rounded-lg p-4">\
                            <div class="text-2xl font-bold text-pink-300 mb-2">生图模型 (3)</div>\
                            <div class="flex flex-wrap gap-2">\
                              <span class="bg-pink-700/50 text-white px-3 py-1 rounded-full text-sm">Nano-Banana</span>\
                              <span class="bg-pink-700/50 text-white px-3 py-1 rounded-full text-sm">Flux</span>\
                              <span class="bg-pink-700/50 text-white px-3 py-1 rounded-full text-sm">即梦</span>\
                            </div>\
                          </div>\
                          <div class="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-lg p-4">\
                            <div class="text-2xl font-bold text-blue-300 mb-2">顶级视频模型 (3)</div>\
                            <div class="flex flex-wrap gap-2">\
                              <span class="bg-blue-700/50 text-white px-3 py-1 rounded-full text-sm">Sora</span>\
                              <span class="bg-blue-700/50 text-white px-3 py-1 rounded-full text-sm">即梦</span>\
                              <span class="bg-blue-700/50 text-white px-3 py-1 rounded-full text-sm">Minimax</span>\
                            </div>\
                          </div>\
                          <div class="bg-gradient-to-br from-green-900/40 to-teal-900/40 rounded-lg p-4">\
                            <div class="text-2xl font-bold text-green-300 mb-2">顶级研究模型 (2)</div>\
                            <div class="flex flex-wrap gap-2">\
                              <span class="bg-green-700/50 text-white px-3 py-1 rounded-full text-sm">GPT-5-pro</span>\
                              <span class="bg-green-700/50 text-white px-3 py-1 rounded-full text-sm">Gemini</span>\
                            </div>\
                          </div>\
                        </div>\
                        <div class="bg-amber-900/30 border-l-4 border-amber-500 p-3 rounded">\
                          <p class="text-amber-200 font-semibold">✨ 目前已基本掌握 <span class="text-amber-400 font-bold">Claude Code CLI</span></p>\
                        </div>\
                      </div>\
                      <div class="grid grid-cols-2 gap-6 my-6">\
                        <div class="bg-gray-800/40 rounded-lg p-4 border border-gray-700/50 hover:border-sky-500/50 transition-all cursor-pointer" data-image="/src/assets/claude.png" data-alt="Claude">\
                          <div class="aspect-video bg-gray-900/50 rounded overflow-hidden mb-3">\
                            <img src="/src/assets/claude.png" alt="Claude" class="w-full h-full object-contain" />\
                          </div>\
                          <p class="text-center text-base font-medium text-gray-300">Claude</p>\
                        </div>\
                        <div class="bg-gray-800/40 rounded-lg p-4 border border-gray-700/50 hover:border-sky-500/50 transition-all cursor-pointer" data-image="/src/assets/gemini.png" data-alt="Gemini">\
                          <div class="aspect-video bg-gray-900/50 rounded overflow-hidden mb-3">\
                            <img src="/src/assets/gemini.png" alt="Gemini" class="w-full h-full object-contain" />\
                          </div>\
                          <p class="text-center text-base font-medium text-gray-300">Gemini</p>\
                        </div>\
                        <div class="bg-gray-800/40 rounded-lg p-4 border border-gray-700/50 hover:border-sky-500/50 transition-all cursor-pointer" data-image="/src/assets/gpt.png" data-alt="GPT">\
                          <div class="aspect-video bg-gray-900/50 rounded overflow-hidden mb-3">\
                            <img src="/src/assets/gpt.png" alt="GPT" class="w-full h-full object-contain" />\
                          </div>\
                          <p class="text-center text-base font-medium text-gray-300">GPT</p>\
                        </div>\
                        <div class="bg-gray-800/40 rounded-lg p-4 border border-gray-700/50 hover:border-sky-500/50 transition-all cursor-pointer" data-image="/src/assets/codex.png" data-alt="Codex">\
                          <div class="aspect-video bg-gray-900/50 rounded overflow-hidden mb-3">\
                            <img src="/src/assets/codex.png" alt="Codex" class="w-full h-full object-contain" />\
                          </div>\
                          <p class="text-center text-base font-medium text-gray-300">Codex</p>\
                        </div>\
                      </div>\
                      <p><strong class="text-white">背景(S):</strong> 过去，一个常规需求需要经历"原型图 → UI设计 → 前端开发"的漫长链路，通常需要3名同事协作10天才能完成，流程繁琐、效率低下。</p>\
                      <p><strong class="text-white">任务(T):</strong> 我的核心任务是学习并引入AI技术，彻底重塑并优化这一传统工作流，并将成功经验赋能团队。</p>\
                      <p><strong class="text-white">行动(A):</strong> 我系统学习了包括Gemini、Cursor、Midjourney在内的多种AI模型与工具。在"茶室小程序"等项目中，我成功实践了全新的工作模式：直接通过AI进行页面设计和前端代码生成，独立完成了核心页面的设计与开发。</p>\
                      <p><strong class="text-white">结果(R):</strong> 成功将原本3人10天的工作流，压缩至我1人2天即可完成，极大提升了项目敏捷性。同时，我将AI知识整理成体系，进行了1次线下培训和1次录播课分享，协助多位同事解决了工作难题，激发了团队对AI的广泛兴趣。</p>\
                    </div>',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                  ),
                },
              ].map((card, i) => (
                <motion.div
                  key={card.key}
                  ref={tiltRefs[i]}
                  className="glass-card rounded-xl p-8 text-left cursor-pointer"
                  variants={{
                    hidden: { opacity: 0, y: 50, scale: 0.9 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        bounce: 0.4,
                        duration: 0.8
                      }
                    }
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(0, 195, 255, 0.3)",
                    transition: { duration: 0.2 }
                  }}
                  onClick={() => {
                    setModalContent({ key: card.key, scene: card.scene, returnScene: 1, title: card.title, icon: card.icon, color: 'sky', content: card.content })
                    changeScene(card.scene)
                  }}
                >
                  <div className="flex items-center mb-4">
                    {card.icon}
                    <h3 className="text-3xl font-bold text-sky-400">{card.title}</h3>
                  </div>
                  {card.key === 'sdd' ? (
                    <p className="text-xl text-amber-400 font-semibold">算多多视频脚本已完成，制作中</p>
                  ) : (
                    <p className="text-xl text-gray-300">点击查看详情</p>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-10 w-full max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.2
                    }
                  }
                }}
              >
                <motion.div
                  ref={tiltRef4}
                  className="glass-card rounded-xl p-8 text-left cursor-pointer"
                  variants={{
                    hidden: { opacity: 0, x: -50 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { type: "spring", bounce: 0.4 }
                    }
                  }}
                  whileHover={{ scale: 1.02, boxShadow: "0 15px 30px rgba(0, 195, 255, 0.2)" }}
                  onClick={() => setModalContent({
                    key: 'completed', scene: 1, returnScene: 1, title: '其他业务支撑 (已完成)', icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    ), color: 'sky', content: ['将台乡视频剪辑', '茶室小程序', '浦发B2B项目', 'UI设计', 'HICOOL创业大赛BP', '金融数据AI产品', '发改委项目PPT修改', '加密货币数据AI产品cryptoX', 'MultiAlpha网站设计', '成龙币']
                  })}>
                  <div className="flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <h5 className="text-2xl font-semibold text-sky-400">其他业务支撑 (已完成)（10）</h5>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {['将台乡视频剪辑', '茶室小程序', '浦发B2B项目', 'UI设计', 'HICOOL创业大赛BP', '金融数据AI产品', '发改委项目PPT修改', '加密货币数据AI产品cryptoX', 'MultiAlpha网站设计', '成龙币'].map((item) => (
                      <span
                        key={item}
                        className="bg-gray-700 text-gray-300 text-lg font-medium px-3 py-1.5 rounded-full hover:bg-gray-600 cursor-pointer transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item === '将台乡视频剪辑') {
                            setModalContent({
                              key: 'jiangtaixiang',
                              scene: 1,
                              returnScene: 1,
                              title: '将台乡视频剪辑',
                              icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              ),
                              color: 'sky',
                              content: '<div class="space-y-6 text-gray-300 text-xl">\
                                <div class="mb-6 p-4 bg-gray-800/50 rounded-lg">\
                                  <h4 class="text-white font-semibold mb-3 text-2xl">📊 项目数据</h4>\
                                  <div class="grid grid-cols-2 gap-4">\
                                    <div class="text-center p-3 bg-sky-900/30 rounded">\
                                      <div class="text-3xl font-bold text-sky-400">4</div>\
                                      <div class="text-sm text-gray-400 mt-1">迭代版本</div>\
                                    </div>\
                                    <div class="text-center p-3 bg-sky-900/30 rounded">\
                                      <div class="text-3xl font-bold text-sky-400">300</div>\
                                      <div class="text-sm text-gray-400 mt-1">图片（算上废稿）</div>\
                                    </div>\
                                    <div class="text-center p-3 bg-sky-900/30 rounded">\
                                      <div class="text-3xl font-bold text-sky-400">200</div>\
                                      <div class="text-sm text-gray-400 mt-1">视频片段</div>\
                                    </div>\
                                    <div class="text-center p-3 bg-sky-900/30 rounded">\
                                      <div class="text-3xl font-bold text-sky-400">30次</div>\
                                      <div class="text-sm text-gray-400 mt-1">人工微调</div>\
                                    </div>\
                                  </div>\
                                </div>\
                                <div class="my-4 bg-gray-800/40 rounded-lg p-4 border border-gray-700/50 hover:border-sky-500/50 transition-all cursor-pointer" data-image="/src/assets/剪映.png" data-alt="将台乡视频剪辑">\
                                  <div class="bg-gray-900/50 rounded overflow-hidden mb-3">\
                                    <img src="/src/assets/剪映.png" alt="将台乡视频剪辑" class="w-full rounded" />\
                                  </div>\
                                  <p class="text-center text-sm text-gray-400">将台乡视频剪辑</p>\
                                </div>\
                              </div>'
                            });
                          } else if (item === '茶室小程序') {
                            setModalContent({
                              key: 'chashi',
                              scene: 1,
                              returnScene: 1,
                              title: '茶室小程序',
                              icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                              ),
                              color: 'sky',
                              content: '<div class="space-y-6 text-gray-300 text-xl">\
                                <div class="mb-6 p-4 bg-gray-800/50 rounded-lg">\
                                  <h4 class="text-white font-semibold mb-3 text-2xl">📊 项目数据</h4>\
                                  <div class="grid grid-cols-2 gap-4">\
                                    <div class="text-center p-3 bg-sky-900/30 rounded">\
                                      <div class="text-3xl font-bold text-sky-400">45</div>\
                                      <div class="text-sm text-gray-400 mt-1">文件夹</div>\
                                    </div>\
                                    <div class="text-center p-3 bg-sky-900/30 rounded">\
                                      <div class="text-3xl font-bold text-sky-400">294</div>\
                                      <div class="text-sm text-gray-400 mt-1">文件</div>\
                                    </div>\
                                    <div class="text-center p-3 bg-sky-900/30 rounded">\
                                      <div class="text-3xl font-bold text-sky-400">120</div>\
                                      <div class="text-sm text-gray-400 mt-1">页面数</div>\
                                    </div>\
                                    <div class="text-center p-3 bg-sky-900/30 rounded">\
                                      <div class="text-3xl font-bold text-sky-400">60000</div>\
                                      <div class="text-sm text-gray-400 mt-1">代码行数</div>\
                                    </div>\
                                  </div>\
                                </div>\
                                <div class="my-4 bg-gray-800/40 rounded-lg p-4 border border-gray-700/50 hover:border-sky-500/50 transition-all cursor-pointer" data-image="/src/assets/mini app.png" data-alt="茶室小程序">\
                                  <div class="bg-gray-900/50 rounded overflow-hidden mb-3">\
                                    <img src="/src/assets/mini app.png" alt="茶室小程序" class="w-full rounded" />\
                                  </div>\
                                  <p class="text-center text-sm text-gray-400">茶室小程序</p>\
                                </div>\
                              </div>'
                            });
                          }
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
                <motion.div
                  ref={tiltRef5}
                  className="glass-card rounded-xl p-8 text-left cursor-pointer"
                  variants={{
                    hidden: { opacity: 0, x: 50 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { type: "spring", bounce: 0.4 }
                    }
                  }}
                  whileHover={{ scale: 1.02, boxShadow: "0 15px 30px rgba(167, 139, 250, 0.2)" }}
                  onClick={() => setModalContent({
                    key: 'inprogress', scene: 1, returnScene: 1, title: '其他业务支撑 (跟进中)', icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    ), color: 'violet', content: ['伙伴云财务应收应付', '星地通UI改版', '园区介绍完善', '星地官网改版', '数字员工']
                  })}>
                  <div className="flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <h5 className="text-2xl font-semibold text-violet-400">其他业务支撑 (跟进中)（5）</h5>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {['伙伴云财务应收应付', '星地通UI改版', '园区介绍完善', '星地官网改版', '数字员工'].map((i) => (
                      <span key={i} className="bg-gray-700 text-gray-300 text-lg font-medium px-3 py-1.5 rounded-full">{i}</span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="full-page-section">
        <div className="plan-view view-visible">
          <div className="container mx-auto max-w-6xl">
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-center mb-16 section-title"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
            >
              复盘反思 & 成长规划
            </motion.h2>
            <motion.div
              className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
            >
              {[
                {
                  key: 'plan1',
                  title: '不足与反思',
                  scene: 7,
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  ),
                  content:
                    '<div class="space-y-4">\
                      <p><strong class="text-white">UI设计瓶颈:</strong> 在对接设计师的过程中，我发现纯粹的外部沟通难以保证设计质量和效率，这促使我下决心深入学习AI设计与编程，力求自己掌握从创意到落地的能力，打通"最后一公里"。</p>\
                      <p><strong class="text-sky-300">改进计划:</strong> 我将继续提升自己的UI审美和工程能力，实现更高质量的"AI独立开发"，减少外部依赖。</p>\
                    </div>',
                },
                {
                  key: 'plan2',
                  title: '短期规划 (3个月)',
                  scene: 8,
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  ),
                  content:
                    '<div class="space-y-4">\
                      <div class="mb-4 p-4 bg-amber-900/30 border-l-4 border-amber-500 rounded">\
                        <p class="text-amber-200 font-bold text-2xl">✨ 掌握workflow自动化流程搭建</p>\
                      </div>\
                      <p><strong class="text-white">深化AI编程能力:</strong> 掌握"一端多云"的程序开发流程，将AI应用从"辅助"变为"主导"，能够独立负责更复杂的项目模块。</p>\
                    </div>',
                },
                {
                  key: 'plan3',
                  title: '长期规划 (1年)',
                  scene: 9,
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                  ),
                  content:
                    '<div class="space-y-4">\
                      <p><strong class="text-white">成为团队的AI赋能者:</strong> 我希望能在团队中牵头，深入研究AI技术与我们核心业务的结合点，将已验证的AI工作流标准化，并赋能给更多同事，帮助整个团队实现效率革命。</p>\
                    </div>',
                },
                {
                  key: 'plan4',
                  title: '前沿追踪与未来探索',
                  scene: 10,
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.884 16.033A9 9 0 1021 12h-3.055m-12 0H3" /></svg>
                  ),
                  content:
                    '<div class="space-y-4">\
                      <p>AI技术日新月异，为了保持团队的技术领先性，我将持续追踪行业前沿动态，包括最新的多模态大模型、AI Agent技术以及创新的开源工具。我计划定期进行技术预研，并以内部报告或小型Demo的形式，向团队分享有潜力应用于我们业务场景的新技术，将外部的创新快速转化为公司的竞争优势。</p>\
                    </div>',
                },
              ].map((card, i) => (
                <motion.div
                  key={card.key}
                  ref={i < 2 ? (i === 0 ? tiltRef1 : tiltRef2) : (i === 2 ? tiltRef3 : tiltRef4)}
                  className="glass-card rounded-xl p-8 text-left cursor-pointer"
                  variants={{
                    hidden: { opacity: 0, rotateY: -15, z: -100 },
                    visible: {
                      opacity: 1,
                      rotateY: 0,
                      z: 0,
                      transition: {
                        type: "spring",
                        bounce: 3,
                        duration: 3
                      }
                    }
                  }}
                  whileHover={{
                    scale: 1.03,
                    rotateY: 2,
                    boxShadow: "0 20px 40px rgba(0, 195, 255, 0.3)"
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  onClick={() => {
                    setModalContent({ key: card.key, scene: card.scene, returnScene: 5, title: card.title, icon: card.icon, color: 'sky', content: card.content })
                    changeScene(card.scene)
                  }}
                >
                  <div className="flex items-center mb-4">
                    {card.icon}
                    <h3 className="text-3xl font-bold text-sky-400">{card.title}</h3>
                  </div>
                  {card.key === 'plan2' ? (
                    <p className="text-xl text-amber-400 font-bold bg-amber-900/30 px-4 py-2 rounded border-l-4 border-amber-500">✨ workflow automation</p>
                  ) : (
                    <p className="text-xl text-gray-300">点击查看详情</p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="full-page-section">
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-center mb-16 section-title"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
          >
            最近半年大模型进化史
          </motion.h2>

          <motion.div
            className="space-y-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {/* Timeline Chart */}
            <motion.div
              className="glass-card rounded-xl p-8 overflow-hidden relative"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", bounce: 0.3 }
                }
              }}
            >
              {/* Background gradient effects */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              </div>

              <motion.h3
                className="text-3xl font-bold text-center text-white mb-4 relative z-10"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                AI 模型发布时间图
              </motion.h3>
              <motion.p
                className="text-center text-gray-400 mb-8 relative z-10"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                以时间为轴，直观展示 Claude、GPT 和 Gemini 系列模型的发布节点与演进速度
              </motion.p>

              {/* Legend with animated indicators */}
              <div className="flex justify-center gap-6 mb-8 relative z-10">
                {[
                  { color: 'bg-purple-500', label: 'Claude', shadow: 'shadow-purple-500/50' },
                  { color: 'bg-green-500', label: 'GPT', shadow: 'shadow-green-500/50' },
                  { color: 'bg-blue-500', label: 'Gemini', shadow: 'shadow-blue-500/50' }
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.div
                      className={`w-4 h-4 rounded-full ${item.color} mr-2 ${item.shadow}`}
                      animate={{
                        boxShadow: [
                          `0 0 0 0 ${item.color.replace('bg-', 'rgba(')}`,
                          `0 0 0 8px rgba(0, 0, 0, 0)`,
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>
                    <span className="text-gray-300 font-medium">{item.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Timeline Chart */}
              <div className="relative overflow-x-auto relative z-10">
                <div className="min-w-[800px]">
                  {/* Grid Lines with animation */}
                  <div className="absolute inset-0 flex">
                    {[...Array(9)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 border-r border-gray-700/30"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.5 }}
                        style={{ transformOrigin: 'top' }}
                      ></motion.div>
                    ))}
                  </div>

                  {/* Series Rows */}
                  <div className="relative space-y-16 py-8">
                    {/* Claude Row */}
                    <div className="relative h-12">
                      <motion.div
                        className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 font-semibold"
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                      >
                        Claude
                      </motion.div>
                      <div className="ml-24 relative h-full">
                        <motion.div
                          className="absolute inset-0 border-t-2 border-purple-500/30"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          style={{ transformOrigin: 'left' }}
                        ></motion.div>
                        {[
                          { name: 'Claude 3.7 Sonnet', pos: '5%', date: '2025年2月24日' },
                          { name: 'Claude 4 (Opus 4, Sonnet 4)', pos: '32%', date: '2025年5月22日' },
                          { name: 'Claude 4.1', pos: '62%', date: '2025年8月5日' },
                          { name: 'Claude Sonnet 4.5', pos: '80%', date: '2025年9月29日' },
                          { name: 'Claude Haiku 4.5', pos: '88%', date: '2025年10月15日' },
                        ].map((item, idx) => (
                          <motion.div
                            key={idx}
                            className="absolute top-1/2 -translate-y-1/2 group"
                            style={{ left: item.pos }}
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 + 0.5, type: "spring", bounce: 0.5 }}
                            onMouseEnter={() => setHoveredModel(item.name)}
                            onMouseLeave={() => setHoveredModel(null)}
                          >
                            <div className="relative">
                              <motion.div
                                className="w-4 h-4 rounded-full bg-purple-500 border-2 border-purple-300 cursor-pointer relative z-10"
                                whileHover={{ scale: 1.5, boxShadow: "0 0 20px rgba(168, 85, 247, 0.8)" }}
                                animate={hoveredModel === item.name ? {
                                  scale: [1, 1.3, 1],
                                  boxShadow: ["0 0 0 0 rgba(168, 85, 247, 0.7)", "0 0 0 15px rgba(168, 85, 247, 0)", "0 0 0 0 rgba(168, 85, 247, 0)"]
                                } : {}}
                                transition={{ duration: 1.5, repeat: hoveredModel === item.name ? Infinity : 0 }}
                              >
                                <motion.div
                                  className="absolute inset-0 rounded-full bg-purple-400"
                                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                ></motion.div>
                              </motion.div>
                              <motion.div
                                className="absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gradient-to-r from-purple-900/95 to-purple-800/95 px-4 py-2 rounded-lg text-sm text-purple-200 pointer-events-none backdrop-blur-sm border border-purple-500/30"
                                initial={{ opacity: 0, y: 10 }}
                                animate={hoveredModel === item.name ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                              >
                                <div className="font-semibold">{item.name} - {item.date}</div>
                              </motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* GPT Row */}
                    <div className="relative h-12">
                      <motion.div
                        className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 font-semibold"
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                      >
                        GPT
                      </motion.div>
                      <div className="ml-24 relative h-full">
                        <motion.div
                          className="absolute inset-0 border-t-2 border-green-500/30"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          style={{ transformOrigin: 'left' }}
                        ></motion.div>
                        {[
                          { name: 'GPT-image-1', pos: '18%', date: '2025年4月15日' },
                          { name: 'GPT-5', pos: '62%', date: '2025年8月7日' },
                          { name: 'gpt5-codex', pos: '80%', date: '2025年9月29日' },
                        ].map((item, idx) => (
                          <motion.div
                            key={idx}
                            className="absolute top-1/2 -translate-y-1/2 group"
                            style={{ left: item.pos }}
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 + 0.5, type: "spring", bounce: 0.5 }}
                            onMouseEnter={() => handleModelHover(item.name)}
                            onMouseLeave={handleModelLeave}
                          >
                            <div className="relative">
                              <motion.div
                                className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-300 cursor-pointer relative z-10"
                                whileHover={{ scale: 1.5, boxShadow: "0 0 20px rgba(34, 197, 94, 0.8)" }}
                                animate={hoveredModel === item.name ? {
                                  scale: [1, 1.3, 1],
                                  boxShadow: ["0 0 0 0 rgba(34, 197, 94, 0.7)", "0 0 0 15px rgba(34, 197, 94, 0)", "0 0 0 0 rgba(34, 197, 94, 0)"]
                                } : {}}
                                transition={{ duration: 1.5, repeat: hoveredModel === item.name ? Infinity : 0 }}
                              >
                                <motion.div
                                  className="absolute inset-0 rounded-full bg-green-400"
                                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                ></motion.div>
                              </motion.div>
                              <motion.div
                                className="absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gradient-to-r from-green-900/95 to-green-800/95 px-4 py-2 rounded-lg text-sm text-green-200 pointer-events-none backdrop-blur-sm border border-green-500/30"
                                initial={{ opacity: 0, y: 10 }}
                                animate={hoveredModel === item.name ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                              >
                                <div className="font-semibold">{item.name}</div>
                                <div className="text-xs text-green-300 mt-1">{item.date}</div>
                              </motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Gemini Row */}
                    <div className="relative h-12">
                      <motion.div
                        className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 font-semibold"
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                      >
                        Gemini
                      </motion.div>
                      <div className="ml-24 relative h-full">
                        <motion.div
                          className="absolute inset-0 border-t-2 border-blue-500/30"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          style={{ transformOrigin: 'left' }}
                        ></motion.div>
                        {[
                          { name: 'Gemini 2.0 Flash', pos: '5%', date: '2025年2月5日' },
                          { name: 'Gemini 2.5 Pro', pos: '45%', date: '2025年6月17日' },
                          { name: 'Gemini 2.5 Flash', pos: '45%', offset: true, date: '2025年6月17日' },
                          { name: 'Gemini 2.5 Flash-Lite', pos: '58%', date: '2025年7月22日' },
                          { name: 'Gemini 2.5 Flash Image', pos: '88%', date: '2025年10月2日' },
                        ].map((item, idx) => (
                          <motion.div
                            key={idx}
                            className="absolute top-1/2 -translate-y-1/2 group"
                            style={{ left: item.pos, top: item.offset ? '70%' : '50%' }}
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 + 0.5, type: "spring", bounce: 0.5 }}
                            onMouseEnter={() => handleModelHover(item.name)}
                            onMouseLeave={handleModelLeave}
                          >
                            <div className="relative">
                              <motion.div
                                className="w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-300 cursor-pointer relative z-10"
                                whileHover={{ scale: 1.5, boxShadow: "0 0 20px rgba(59, 130, 246, 0.8)" }}
                                animate={hoveredModel === item.name ? {
                                  scale: [1, 1.3, 1],
                                  boxShadow: ["0 0 0 0 rgba(59, 130, 246, 0.7)", "0 0 0 15px rgba(59, 130, 246, 0)", "0 0 0 0 rgba(59, 130, 246, 0)"]
                                } : {}}
                                transition={{ duration: 1.5, repeat: hoveredModel === item.name ? Infinity : 0 }}
                              >
                                <motion.div
                                  className="absolute inset-0 rounded-full bg-blue-400"
                                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                ></motion.div>
                              </motion.div>
                              <motion.div
                                className="absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gradient-to-r from-blue-900/95 to-blue-800/95 px-4 py-2 rounded-lg text-sm text-blue-200 pointer-events-none backdrop-blur-sm border border-blue-500/30 z-20"
                                initial={{ opacity: 0, y: 10 }}
                                animate={hoveredModel === item.name ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                              >
                                <div className="font-semibold">{item.name}</div>
                                <div className="text-xs text-blue-300 mt-1">{item.date}</div>
                              </motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Time Axis */}
                  <div className="flex justify-between mt-4 text-sm text-gray-400 ml-24">
                    {['2025年3月', '2025年4月', '2025年5月', '2025年6月', '2025年7月', '2025年8月', '2025年9月', '2025年10月'].map((month, idx) => (
                      <div key={idx} className="flex-1 text-center">{month}</div>
                    ))}
                  </div>
                  <div className="text-center mt-2 text-gray-500 text-sm">发布时间</div>
                </div>
              </div>

              <p className="text-center text-gray-500 text-sm mt-6">💡 将鼠标悬停在数据点上可查看模型名称和具体发布日期</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="full-page-section text-center">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="flex justify-center items-center mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mr-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-14l-3 3m0 0l-3-3m3 3V4m0 12v3m0 0l3 3m-3-3l-3 3m12-3h-4m4 0v4m-4-2h4" /></svg>
            <h2 className="text-5xl md:text-6xl font-bold section-title">总结 & 致谢</h2>
          </motion.div>
          <div className="space-y-8 text-left">
            {[
              '首先，我由衷地感谢公司和领导的信任与认可，特别是在AI浪潮席卷而来的当下，能给予我充分的空间和机会去学习和探索这项颠覆性的技术。',
              '这半年的经历，对我而言收获巨大。我不仅完成了从0到1的项目历练，更重要的是，我成功地将AI融入了日常工作流，将过去需要多人多天才能完成的任务，压缩到了个人在短时间内即可交付。这不仅是个人效率的飞跃，也为团队探索出了一条全新的、高效率的工作范式。',
              '在此，也要感谢所有同事在我探索过程中的支持与帮助。我渴望能继续作为团队的一员，将AI探索进行到底，为公司创造更大的价值！',
            ].map((txt, idx) => (
              <motion.div
                key={idx}
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6, type: "spring" }}
              >
                <div className="flex-shrink-0">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-sky-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </motion.svg>
                </div>
                <p className="text-xl md:text-2xl text-gray-300">{txt}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {modalContent && (
        <Popup
          title={modalContent.title}
          icon={modalContent.icon}
          themeColor={modalContent.color}
          content={modalContent.content}
          onShow={() => changeScene(modalContent.scene)}
          onHide={() => changeScene(1)}
          onClose={() => {
            setModalContent(null)
            changeScene(1)
          }}
        />
      )}

      {imageViewer && (
        <ImageViewer
          src={imageViewer.src}
          alt={imageViewer.alt}
          onClose={() => setImageViewer(null)}
        />
      )}
    </div>
  )
}


