import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import event from '@/data/event.json'
import logoWhite from '@/assets/images/logo-white.png'
import logo from '@/assets/images/logo.png'

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-18">
          <a href="#" className="flex items-center gap-2 relative">
            <img
              src={logoWhite}
              alt="I be connect"
              className={`h-8 md:h-10 w-auto transition-opacity duration-300 ${scrolled ? 'opacity-0' : 'opacity-100'}`}
            />
            <img
              src={logo}
              alt="I be connect"
              className={`h-8 md:h-10 w-auto transition-opacity duration-300 absolute ${scrolled ? 'opacity-100' : 'opacity-0'}`}
            />
          </a>
          <Button href={event.entryUrl} size="small">
            申し込む
          </Button>
        </div>
      </div>
    </header>
  )
}
