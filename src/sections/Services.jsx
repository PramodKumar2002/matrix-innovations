import React from 'react';
import {
  Globe,
  Code2,
  GraduationCap,
  Cpu,
  Layers,
  TrendingUp,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

export default function Services({ onSelectService }) {
  const services = [
    {
      id: 'web-dev',
      icon: Globe,
      color: '#06B6D4',
      glow: 'rgba(6, 182, 212, 0.25)',
      title: 'Web Development',
      desc: 'High-speed, responsive web applications, modern Single Page Applications (SPAs), and robust full-stack platforms engineered with React and cutting-edge web technologies.',
      tags: ['React.js & Next.js', 'Responsive UI/UX', 'REST & GraphQL', 'SEO & Performance']
    },
    {
      id: 'software-dev',
      icon: Code2,
      color: '#3B82F6',
      glow: 'rgba(59, 130, 246, 0.25)',
      title: 'Software Development',
      desc: 'Bespoke enterprise software, scalable cloud microservices, database management, and custom business tools designed to automate and elevate your workflow.',
      tags: ['Custom Architecture', 'Cloud Microservices', 'Secure APIs', 'Database Optimization']
    },
    {
      id: 'it-training',
      icon: GraduationCap,
      color: '#10B981',
      glow: 'rgba(16, 185, 129, 0.25)',
      title: 'IT Training',
      desc: 'Practical, industry-aligned training programs in full-stack development, modern programming languages, and cloud systems with real-world project portfolios.',
      tags: ['Hands-On Projects', 'Industry Mentorship', 'Live Coding Labs', 'Recognized Certification']
    },
    {
      id: 'robotics-ai',
      icon: Cpu,
      color: '#8B5CF6',
      glow: 'rgba(139, 92, 246, 0.25)',
      title: 'Robotics & AI',
      desc: 'Applied robotics workshops, microcontrollers, embedded IoT hardware, sensor telemetry, computer vision, and Machine Learning model integration.',
      tags: ['ROS & Microcontrollers', 'Applied Machine Learning', 'Computer Vision', 'IoT Prototyping']
    },
    {
      id: 'digital-solutions',
      icon: Layers,
      color: '#F59E0B',
      glow: 'rgba(245, 158, 11, 0.25)',
      title: 'Digital Solutions',
      desc: 'End-to-end digital transformation consulting, cloud infrastructure migration, modern user interfaces, and automated business tools to accelerate digital readiness.',
      tags: ['Cloud Migration', 'Digital Transformation', 'UI/UX Design Systems', 'Workflow Automation']
    },
    {
      id: 'career-dev',
      icon: TrendingUp,
      color: '#EC4899',
      glow: 'rgba(236, 72, 153, 0.25)',
      title: 'Career & Skill Development',
      desc: 'Comprehensive career roadmaps, technical interview preparation, personalized 1-on-1 mentorship, resume reviews, and industry placement assistance.',
      tags: ['Interview Coaching', 'Portfolio Curation', 'Resume Optimization', 'Placement Assistance']
    }
  ];

  const handleInquire = (serviceTitle) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="section" style={{ backgroundColor: '#050814' }}>
      <div className="container">
        {/* Section Header */}
        <SectionTitle
          badge="OUR CORE SERVICES"
          title="Transformative Technology & Training Services"
          highlightWord="Technology & Training"
          subtitle="Explore our comprehensive suite of modern software development, robotics laboratories, IT training curricula, and digital growth solutions."
        />

        {/* Services Responsive Grid (Desktop: 3 cols, Tablet: 2 cols, Mobile: 1 col) */}
        <div className="services-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="glass-card service-card"
                style={{
                  padding: '2.25rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 'var(--radius-xl)',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(175deg, rgba(14, 25, 54, 0.75) 0%, rgba(8, 14, 32, 0.85) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {/* Top Subtle Color Accent Bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '2rem',
                    right: '2rem',
                    height: '2px',
                    background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
                    opacity: 0.6
                  }}
                />

                <div>
                  {/* Service Icon Container */}
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: `${service.color}15`,
                      color: service.color,
                      border: `1.5px solid ${service.color}40`,
                      boxShadow: `0 0 20px ${service.glow}`,
                      marginBottom: '1.5rem',
                      transition: 'transform 0.3s ease'
                    }}
                    className="service-icon-box"
                  >
                    <Icon size={28} />
                  </div>

                  {/* Service Title */}
                  <h3
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      marginBottom: '0.85rem'
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.94rem',
                      lineHeight: 1.65,
                      marginBottom: '1.5rem'
                    }}
                  >
                    {service.desc}
                  </p>

                  {/* Tags / Capabilities */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.45rem',
                      marginBottom: '2rem'
                    }}
                  >
                    {service.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          padding: '0.28rem 0.7rem',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div style={{ paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <button
                    onClick={() => handleInquire(service.title)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: service.color,
                      transition: 'gap 0.2s ease, opacity 0.2s ease'
                    }}
                    className="service-inquire-btn"
                  >
                    <span>Inquire for {service.title}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .service-card:hover {
          transform: translateY(-8px);
          border-color: rgba(6, 182, 212, 0.4) !important;
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.7), 0 0 30px -5px rgba(6, 182, 212, 0.25) !important;
        }

        .service-card:hover .service-icon-box {
          transform: scale(1.08) rotate(3deg);
        }

        .service-card:hover .service-inquire-btn {
          gap: 0.8rem;
        }
      `}</style>
    </section>
  );
}
