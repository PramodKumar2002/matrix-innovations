import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Why Us', href: '#why-choose-us', id: 'why-choose-us' },
    { name: 'Contact Us', href: '#contact', id: 'contact' },
  ];

  // Scroll listener for sticky styling & active section detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Detect active section
      const sections = ['hero', 'about', 'services', 'why-choose-us', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: isScrolled ? '72px' : '88px',
        backgroundColor: isScrolled ? 'rgba(5, 8, 20, 0.88)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
        borderBottom: isScrolled ? '1px solid rgba(6, 182, 212, 0.18)' : '1px solid transparent',
        boxShadow: isScrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.6)' : 'none',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div
        className="container"
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Left Side: Matrix Innovations Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          style={{ display: 'inline-flex', alignItems: 'center' }}
          aria-label="Matrix Innovations Home"
        >
          <Logo size={isScrolled ? 'sm' : 'md'} />
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '2rem'
          }}
          className="desktop-nav"
        >
          <ul
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              listStyle: 'none',
              padding: '0.35rem 0.5rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(15, 26, 56, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(8px)'
            }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    style={{
                      display: 'inline-block',
                      padding: '0.5rem 1.15rem',
                      fontSize: '0.925rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                      borderRadius: 'var(--radius-full)',
                      background: isActive ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(6, 182, 212, 0.25))' : 'transparent',
                      border: isActive ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid transparent',
                      boxShadow: isActive ? '0 0 14px rgba(6, 182, 212, 0.25)' : 'none',
                      transition: 'all 0.25s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#38BDF8';
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Quick CTA Button */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn btn-primary"
            style={{
              padding: '0.65rem 1.45rem',
              fontSize: '0.88rem'
            }}
          >
            <span>Inquire Now</span>
            <ArrowRight size={15} />
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: 'rgba(15, 26, 56, 0.7)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            color: '#FFFFFF',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          {mobileMenuOpen ? <X size={22} color="#06B6D4" /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Overlay / Drawer */}
      <div
        className="mobile-nav-drawer"
        style={{
          position: 'fixed',
          top: isScrolled ? '72px' : '88px',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(5, 8, 20, 0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: mobileMenuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '2rem 1.5rem 3rem 1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          overflowY: 'auto',
          animation: 'fadeIn 0.25s ease'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--brand-cyan)',
              marginBottom: '0.5rem'
            }}
          >
            Navigation Menu
          </div>
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? 'rgba(6, 182, 212, 0.12)' : 'rgba(15, 26, 56, 0.5)',
                  border: isActive ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
                  color: isActive ? '#38BDF8' : '#F8FAFC',
                  fontSize: '1.05rem',
                  fontWeight: 600
                }}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#10B981',
                      boxShadow: '0 0 8px #10B981'
                    }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile Drawer Bottom Section */}
        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38BDF8', fontWeight: 700, marginBottom: '0.35rem' }}>
              <Sparkles size={16} /> Matrix Innovations Hub
            </div>
            Lucknow, Uttar Pradesh, India • Empowering Digital Growth
          </div>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <span>Contact Us Today</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
          .mobile-nav-drawer {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
