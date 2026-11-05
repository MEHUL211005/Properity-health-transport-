import { useState } from 'react'
import { contact } from '../../data/content'
import Brand from '../common/Brand'

const navigation = [
  ['Services', '#services'],
  ['Why Us', '#why-us'],
  ['Coverage', '#coverage'],
  ['Refer a Patient', '#portal'],
  ['Contact', '#contact'],
  ['Staff', '#portal'],
  ['AI Dispatch', '#portal'],
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="site-header" id="top">
      <div className="header-inner">
        <Brand showName />
        <button
          className="menu-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
            {menuOpen ? <path d="m18 6-12 12M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} id="primary-navigation" aria-label="Main navigation">
          {navigation.map(([label, href]) => (
            <a href={href} key={label} onClick={closeMenu}>{label}</a>
          ))}
          <a className="button button-dark header-call" href={`tel:${contact.phone}`}>Call Now</a>
        </nav>
      </div>
    </header>
  )
}
