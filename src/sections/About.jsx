import React from 'react';
import {
  Code,
  Cpu,
  GraduationCap,
  Briefcase,
  Award,
  Users,
  Layers,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import StatCounter from '../components/StatCounter';
import aboutTechImg from '../assets/about-tech.jpg';

export default function About() {
  const pillars = [
    {
      icon: Code,
      title: 'Software Development & Digital Solutions',
      desc: 'Building high-performance web applications, scalable enterprise software, and cloud architectures tailored for modern enterprise workflows.'
    },
    {
      icon: Cpu,
      title: 'Robotics, AI & Innovation Labs',
      desc: 'Empowering students and creators with practical robotics kits, computer vision, AI integrations, and embedded systems engineering.'
    },
    {
      icon: GraduationCap,
      title: 'Industry-Aligned IT Training',
      desc: 'Bridging the skill gap with structured mentoring, hands-on production codebases, and career-oriented technical certifications.'
    },
    {
      icon: Briefcase,
      title: 'Accelerating Business Growth',
      desc: 'Helping organizations streamline operations, modernize legacy infrastructure, and achieve digital transformation in a rapidly evolving market.'
    }
  ];

  return (
    <section id="about" className="section" style={{ backgroundColor: '#070D1F' }}>
      <div className="container">
        {/* Section Header */}
        <SectionTitle
          badge="ABOUT MATRIX INNOVATIONS"
          title="About Matrix Innovations"
          highlightWord="Matrix Innovations"
          subtitle="Pioneering technology solutions, hands-on IT training, and robotics development to empower individuals and businesses worldwide."
        />

        {/* Content & Visual 2-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3.5rem',
            alignItems: 'center',
            marginBottom: '4.5rem'
          }}
          className="about-grid"
        >
          {/* Left Column: Descriptive Story & Pillars */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#10B981',
                marginBottom: '0.75rem'
              }}
            >
              <Sparkles size={16} /> EMPOWERING DIGITAL TRANSFORMATION
            </div>

            <h3
              style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.3,
                marginBottom: '1.25rem'
              }}
            >
              Driving the Future of Technology, Software & Innovation
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
              At <strong>Matrix Innovations</strong>, we believe every breakthrough starts with a bold idea. Based in Lucknow, Uttar Pradesh, our team operates at the intersection of modern software development, cutting-edge robotics, practical IT training, and strategic digital solutions.
            </p>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Whether you are an aspiring engineer seeking hands-on skills in AI and web development or an enterprise looking to scale with resilient digital infrastructure, Matrix Innovations provides the tools, mentorship, and engineering expertise to shape the future.
            </p>

            {/* Core Pillars List */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              {pillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="glass-card"
                    style={{
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(15, 26, 56, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.06)'
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(6, 182, 212, 0.12)',
                        color: '#22D3EE',
                        marginBottom: '0.75rem'
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.35rem' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: High-Tech Illustration & Image Frame */}
          <div style={{ position: 'relative' }}>
            {/* Ambient Background Glow */}
            <div
              style={{
                position: 'absolute',
                inset: '-10px',
                borderRadius: 'var(--radius-xl)',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.25), rgba(37, 99, 235, 0.2))',
                filter: 'blur(25px)',
                zIndex: 0
              }}
            />

            <div
              className="glass-card"
              style={{
                position: 'relative',
                zIndex: 1,
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.65)'
              }}
            >
              <img
                src={aboutTechImg}
                alt="Matrix Innovations Technology and Robotics Lab"
                style={{
                  width: '100%',
                  height: '460px',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'contrast(1.05) brightness(0.95)',
                  transition: 'transform 0.5s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
              />

              {/* Floating Overlay Badge Top */}
              <div
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  left: '1.25rem',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(5, 8, 20, 0.85)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(6, 182, 212, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#FFFFFF'
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    boxShadow: '0 0 10px #10B981'
                  }}
                />
                AI & Robotics Innovation Hub
              </div>

              {/* Floating Overlay Card Bottom */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.25rem',
                  right: '1.25rem',
                  left: '1.25rem',
                  padding: '1.25rem 1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(10, 17, 40, 0.88)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.5)'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#38BDF8', fontWeight: 700, textTransform: 'uppercase' }}>
                    Corporate & Student Excellence
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF' }}>
                    Lucknow, Uttar Pradesh, India
                  </div>
                </div>

                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #10B981, #06B6D4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    flexShrink: 0
                  }}
                >
                  <Award size={22} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Row (Requested 4 stats: 500+ Students, 50+ Projects, 20+ Workshops, 10+ Tech Domains) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem'
          }}
        >
          <StatCounter
            target={500}
            suffix="+"
            label="Students Trained"
            icon={Users}
            duration={2000}
          />

          <StatCounter
            target={50}
            suffix="+"
            label="Projects Delivered"
            icon={Code}
            duration={1800}
          />

          <StatCounter
            target={20}
            suffix="+"
            label="Workshops Conducted"
            icon={Award}
            duration={1600}
          />

          <StatCounter
            target={10}
            suffix="+"
            label="Technology Domains"
            icon={Cpu}
            duration={1400}
          />
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .about-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </section>
  );
}
