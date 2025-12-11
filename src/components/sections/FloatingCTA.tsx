import { useState, useEffect } from 'react'
import event from '@/data/event.json'

export function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector('#hero')
      const closing = document.querySelector('#closing')

      const heroRect = hero?.getBoundingClientRect()
      const closingRect = closing?.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const pastHero = heroRect ? heroRect.bottom < 0 : false
      const beforeClosing = closingRect ? closingRect.top > windowHeight : true

      setVisible(pastHero && beforeClosing)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-4">
        <a
          href={event.entryUrl}
          className="block w-full bg-gradient-cta text-white text-center font-bold py-4 rounded-full shadow-lg"
        >
          今すぐ申し込む
        </a>
      </div>
    </div>
  )
}
