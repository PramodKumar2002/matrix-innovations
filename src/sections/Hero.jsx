import React from 'react';
import { ArrowRight, Sparkles, Terminal, Cpu, ShieldCheck, Zap, Layers } from 'lucide-react';
import Button from '../components/Button';

export default function Hero() {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '130px',
        paddingBottom: '5rem',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 20%, #0c183a 0%, #050814 70%)'
      }}
    >
      {/* Background Subtle Tech Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)',
          pointerEvents: 'none'
        }}
      />

      {/* Ambient Gradient Orbs */}
      <div
        className="animate-pulse-slow"
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />
      <div
        className="animate-pulse-slow"
        style={{
          position: 'absolute',
          top: '25%',
          right: '8%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, rgba(37, 99, 235, 0.12) 50%, transparent 75%)',
          filter: 'blur(70px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3.5rem',
            alignItems: 'center'
          }}
          className="hero-grid"
        >
          {/* Hero Left Column: Main Typography & CTAs */}
          <div style={{ maxWidth: '680px' }}>
            {/* Small Badge */}
            <div
              className="section-badge"
              style={{
                marginBottom: '1.5rem',
                backgroundColor: 'rgba(6, 182, 212, 0.08)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                boxShadow: '0 0 16px rgba(6, 182, 212, 0.2)'
              }}
            >
              <span className="section-badge-dot" />
              <span style={{ letterSpacing: '0.12em' }}>INNOVATION • TECHNOLOGY • GROWTH</span>
            </div>

            {/* Main Heading */}
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                marginBottom: '1.5rem'
              }}
            >
              Building Ideas.{' '}
              <span className="gradient-brand-text" style={{ display: 'inline-block' }}>
                Creating Innovation.
              </span>{' '}
              Shaping the Future.
            </h1>

            {/* Supporting Text */}
            <p
              style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
                maxWidth: '620px'
              }}
            >
              Matrix Innovations delivers innovative technology, digital solutions and skill development to help individuals and businesses grow in the digital world.
            </p>

            {/* Hero Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.25rem',
                alignItems: 'center'
              }}
            >
              <Button
                variant="primary"
                size="lg"
                href="#services"
                icon={ArrowRight}
                onClick={(e) => handleScrollTo(e, 'services')}
              >
                Explore More
              </Button>

              <Button
                variant="secondary"
                size="lg"
                href="#contact"
                onClick={(e) => handleScrollTo(e, 'contact')}
              >
                Contact Us
              </Button>
            </div>

            {/* Bottom Value Badges */}
            <div
              style={{
                marginTop: '3.5rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '2rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10B981'
                  }}
                >
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>Industry Standard</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Certified Training & Tech</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(6, 182, 212, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#06B6D4'
                  }}
                >
                  <Cpu size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>AI & Robotics</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Hands-On Innovation Lab</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(59, 130, 246, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#3B82F6'
                  }}
                >
                  <Zap size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>Scalable Growth</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Empowering Businesses</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Column: Interactive Tech Visual Console */}
          <div className="hero-console-col" style={{ position: 'relative' }}>
            {/* Outer Glow Halo */}
            <div
              style={{
                position: 'absolute',
                inset: '-15px',
                borderRadius: 'var(--radius-xl)',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(6, 182, 212, 0.25), rgba(37, 99, 235, 0.2))',
                filter: 'blur(20px)',
                zIndex: 0
              }}
            />

            {/* Console Terminal Card */}
            <div
              className="glass-card"
              style={{
                position: 'relative',
                zIndex: 1,
                borderRadius: 'var(--radius-xl)',
                border: '1px solid rgba(6, 182, 212, 0.35)',
                background: 'linear-gradient(165deg, rgba(13, 24, 54, 0.9) 0%, rgba(7, 13, 30, 0.95) 100%)',
                boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.7)',
                overflow: 'hidden'
              }}
            >
              {/* Terminal Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.5rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  background: 'rgba(255, 255, 255, 0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                  <span style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                  <span style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                  <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                    matrix-innovations-runtime.sys
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.75rem',
                    color: '#10B981',
                    fontWeight: 700
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#10B981',
                      boxShadow: '0 0 8px #10B981'
                    }}
                  />
                  LIVE SYSTEM
                </div>
              </div>

              {/* Terminal Content */}
              <div style={{ padding: '1.75rem', fontFamily: "'Fira Code', monospace, sans-serif", fontSize: '0.9rem' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                  <span style={{ color: '#06B6D4' }}>$</span> matrix-cli deploy --stack=enterprise-fullstack
                </div>

                <div
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    marginBottom: '1.25rem',
                    fontSize: '0.86rem'
                  }}
                >
                  <p style={{ color: '#93C5FD', margin: '0 0 0.4rem 0' }}>
                    <span style={{ color: '#F472B6' }}>const</span> <span style={{ color: '#38BDF8' }}>MatrixCore</span> = {'{'}
                  </p>
                  <p style={{ color: '#CBD5E1', margin: '0 0 0.4rem 1rem' }}>
                    mission: <span style={{ color: '#34D399' }}>"Empowering Innovation"</span>,
                  </p>
                  <p style={{ color: '#CBD5E1', margin: '0 0 0.4rem 1rem' }}>
                    domains: [<span style={{ color: '#FDE047' }}>"AI"</span>, <span style={{ color: '#FDE047' }}>"Robotics"</span>, <span style={{ color: '#FDE047' }}>"Web Development"</span>, <span style={{ color: '#FDE047' }}>"Training"</span>],
                  </p>
                  <p style={{ color: '#CBD5E1', margin: '0 0 0.4rem 1rem' }}>
                    headquarters: <span style={{ color: '#34D399' }}>"Lucknow, UP, India"</span>,
                  </p>
                  <p style={{ color: '#CBD5E1', margin: '0 0 0.4rem 1rem' }}>
                    status: <span style={{ color: '#34D399' }}>"Ready to Transform"</span>
                  </p>
                  <p style={{ color: '#93C5FD', margin: 0 }}>{'};'}</p>
                </div>

                {/* Status Chips */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '0.85rem'
                  }}
                >
                  <div
                    style={{
                      background: 'rgba(16, 185, 129, 0.08)',
                      border: '1px solid rgba(16, 185, 129, 0.25)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem'
                    }}
                  >
                    <Layers size={18} color="#10B981" />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Architecture</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF' }}>Scalable & Cloud Native</div>
                    </div>
                  </div>

                  <div
                    style={{
                      background: 'rgba(6, 182, 212, 0.08)',
                      border: '1px solid rgba(6, 182, 212, 0.25)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem'
                    }}
                  >
                    <Sparkles size={18} color="#06B6D4" />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Learning Hub</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF' }}>Practical & Hands-On</div>
                    </div>
                  </div>
                </div>

                {/* Interactive Tech Badge Pills */}
                <div
                  style={{
                    marginTop: '1.25rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}
                >
                  {['React.js', 'Node.js', 'Python AI', 'ROS Robotics', 'Cloud Systems', 'IoT Automation'].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.3rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </section>
  );
}
