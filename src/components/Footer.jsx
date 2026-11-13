import React from 'react';
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  ArrowUpRight,
  Shield,
  Heart
} from 'lucide-react';
import Logo from './Logo';

// Crisp custom vector icons for social media
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

export default function Footer({ onOpenLegal, onOpenAdmin }) {
  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Choose Us', href: '#why-choose-us' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const serviceLinks = [
    { name: 'Web Development', href: '#services' },
    { name: 'IT Training', href: '#services' },
    { name: 'Robotics & AI', href: '#services' },
    { name: 'Digital Solutions', href: '#services' },
    { name: 'Software Development', href: '#services' },
    { name: 'Career & Skill Development', href: '#services' }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com' },
    { name: 'Facebook', icon: FacebookIcon, href: 'https://facebook.com' },
    { name: 'LinkedIn', icon: LinkedinIcon, href: 'https://linkedin.com' },
    { name: 'YouTube', icon: YoutubeIcon, href: 'https://youtube.com' },
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#040711',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '5rem',
        paddingBottom: '2.5rem'
      }}
    >
      {/* Background Accent Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-150px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.12), transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem 2rem',
            marginBottom: '4rem'
          }}
        >
          {/* Col 1: Brand & Bio */}
          <div style={{ maxWidth: '360px' }}>
            <Logo size="md" />
            <p
              style={{
                marginTop: '1.25rem',
                color: 'var(--text-muted)',
                fontSize: '0.925rem',
                lineHeight: 1.7
              }}
            >
              Matrix Innovations delivers innovative technology, digital solutions, and high-impact skill development. We empower individuals, students, and businesses to build ideas and lead in the digital era.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.75rem' }}>
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Matrix Innovations on ${item.name}`}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(15, 26, 56, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'var(--text-secondary)',
                      transition: 'all 0.25s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.2)';
                      e.currentTarget.style.color = '#38BDF8';
                      e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.5)';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(15, 26, 56, 0.7)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4
              style={{
                color: '#FFFFFF',
                fontSize: '1.05rem',
                fontWeight: 700,
                letterSpacing: '0.02em',
                marginBottom: '1.25rem',
                position: 'relative',
                display: 'inline-block'
              }}
            >
              Quick Links
              <span
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: 0,
                  width: '24px',
                  height: '2px',
                  backgroundColor: '#06B6D4',
                  borderRadius: '2px'
                }}
              />
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.925rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      transition: 'color 0.2s ease, transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#38BDF8';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4
              style={{
                color: '#FFFFFF',
                fontSize: '1.05rem',
                fontWeight: 700,
                letterSpacing: '0.02em',
                marginBottom: '1.25rem',
                position: 'relative',
                display: 'inline-block'
              }}
            >
              Our Services
              <span
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: 0,
                  width: '24px',
                  height: '2px',
                  backgroundColor: '#10B981',
                  borderRadius: '2px'
                }}
              />
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {serviceLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.925rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      transition: 'color 0.2s ease, transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#34D399';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4
              style={{
                color: '#FFFFFF',
                fontSize: '1.05rem',
                fontWeight: 700,
                letterSpacing: '0.02em',
                marginBottom: '1.25rem',
                position: 'relative',
                display: 'inline-block'
              }}
            >
              Contact Matrix
              <span
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: 0,
                  width: '24px',
                  height: '2px',
                  backgroundColor: '#3B82F6',
                  borderRadius: '2px'
                }}
              />
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin size={18} color="#06B6D4" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                  Lucknow, Uttar Pradesh, India
                </span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={18} color="#10B981" style={{ flexShrink: 0 }} />
                <a
                  href="mailto:info@matrixinnovations.in"
                  style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  info@matrixinnovations.in
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={18} color="#3B82F6" style={{ flexShrink: 0 }} />
                <a
                  href="tel:+919876543210"
                  style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  +91 98765 43210
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Globe size={18} color="#06B6D4" style={{ flexShrink: 0 }} />
                <a
                  href="https://matrixinnovations.in"
                  style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  www.matrixinnovations.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.875rem',
            color: 'var(--text-dim)'
          }}
        >
          <div>
            © 2026 Matrix Innovations. All Rights Reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button
              onClick={() => onOpenLegal('privacy')}
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                background: 'none',
                border: 'none',
                padding: 0
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#38BDF8')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              Privacy Policy
            </button>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            <button
              onClick={() => onOpenLegal('terms')}
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                background: 'none',
                border: 'none',
                padding: 0
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#38BDF8')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              Terms & Conditions
            </button>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            <button
              onClick={onOpenAdmin}
              style={{
                color: '#06B6D4',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                borderRadius: '6px',
                padding: '3px 10px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#06B6D4';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.1)';
                e.currentTarget.style.color = '#06B6D4';
              }}
            >
              <Shield size={13} />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
