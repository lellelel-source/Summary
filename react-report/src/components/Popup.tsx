import React, { useEffect } from 'react'

type ThemeColor = 'sky' | 'violet'

export default function Popup({
  title,
  icon,
  themeColor,
  onClose,
  children,
  content,
  onShow,
  onHide,
}: {
  title: string
  icon: React.ReactNode
  themeColor: ThemeColor
  onClose: () => void
  children?: React.ReactNode
  content?: string | string[]
  onShow?: () => void
  onHide?: () => void
}) {
  const titleColorClass = themeColor === 'sky' ? 'text-sky-400' : 'text-violet-400'
  const dotColorClass = themeColor === 'sky' ? 'bg-sky-400' : 'bg-violet-400'

  useEffect(() => {
    onShow && onShow()
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
      onHide && onHide()
    }
  }, [onClose, onShow, onHide])

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300"
      onMouseDown={onBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 w-full max-w-3xl rounded-xl shadow-2xl flex flex-col max-h-[90vh] transform transition-transform duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-700 flex-shrink-0">
          <div className="flex items-center min-w-0">
            {icon}
            <h3 className={`text-3xl font-bold ${titleColorClass} truncate`}>{title}</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white flex-shrink-0 ml-4" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="overflow-y-auto">
          <div className="p-10 text-left text-xl text-gray-300 leading-relaxed">
            {Array.isArray(content) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
                {content.map((item) => (
                  <div key={item} className="flex items-center space-x-4">
                    <div className={`w-2.5 h-2.5 rounded-full ${dotColorClass} flex-shrink-0`}></div>
                    <p className="text-3xl text-gray-200">{item}</p>
                  </div>
                ))}
              </div>
            ) : typeof content === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


