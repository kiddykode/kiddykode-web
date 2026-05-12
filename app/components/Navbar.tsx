'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '/',          label: 'Home'     },
  { href: '/about',     label: 'About'    },
  { href: '/programs',  label: 'Programs' },
  { href: '/#schools',  label: 'Schools'  },
  { href: '/#parents',  label: 'Parents'  },
  { href: '/#impact',   label: 'Impact'   },
  { href: '/stories',   label: 'Stories'  },
  { href: '/#chapters', label: 'Chapters' },
  { href: '/#studio',   label: 'Studio'   },
]

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <header 
      className={`nav border-b transition-all duration-300 sticky top-0 z-50 ${
        isScrolled 
          ? 'border-[var(--color-line)] bg-[var(--color-sand-50)]/95 shadow-sm' 
          : 'border-transparent bg-[var(--color-sand-50)]/80 backdrop-blur-md'
      }`} 
      data-screen-label="Nav"
    >
      <div className="wrap flex items-center justify-between h-[72px] lg:h-[84px]">
        <Link href="/" className="logo flex-shrink-0 transition-transform duration-200 hover:scale-105" aria-label="KiddyKode home">
          <Image className="logo-img" src="/kiddykode-logo.png" alt="KiddyKode" width={48} height={48} />
        </Link>
        
        <nav className="hidden lg:flex items-center justify-center flex-grow px-8">
          <ul className="flex items-center gap-8 xl:gap-10">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href || pathname?.startsWith(href + '/') && href !== '/'
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`text-[15px] font-medium tracking-tight transition-all duration-200 relative py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[var(--color-accent)] after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                      isActive ? 'text-[var(--color-ink-900)] after:scale-x-100' : 'text-[var(--color-ink-700)] hover:text-[var(--color-ink-900)]'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="nav-actions flex items-center gap-3">
          <Link href="/partners" className="btn btn--ghost hidden sm:inline-flex !py-2.5 !px-5 text-[14px]">Partner With Us</Link>
          <Link href="/programs" className="btn btn--primary hidden sm:inline-flex !py-2.5 !px-5 text-[14px]">
            Join a Program <span className="arrow">→</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 -mr-2 text-[var(--color-ink-700)] lg:hidden focus:outline-none"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 top-[72px] bg-[var(--color-sand-50)]/98 backdrop-blur-xl z-40 transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col p-8 gap-1 overflow-y-auto h-full pb-32">
          {navLinks.map(({ href, label }, index) => {
            const isActive = pathname === href || pathname?.startsWith(href + '/') && href !== '/'
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-2xl py-4 font-medium tracking-tight border-b border-[var(--color-line-soft)] transition-all duration-300 ${
                  isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                } ${
                  isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-ink-900)]'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {label}
              </Link>
            )
          })}
          
          <div className={`mt-8 flex flex-col gap-4 transition-all duration-500 delay-300 ${
            isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <Link
              href="/partners"
              onClick={() => setIsMenuOpen(false)}
              className="btn btn--ghost justify-center py-4"
            >
              Partner With Us
            </Link>
            <Link
              href="/programs"
              onClick={() => setIsMenuOpen(false)}
              className="btn btn--primary justify-center py-4"
            >
              Join a Program <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
