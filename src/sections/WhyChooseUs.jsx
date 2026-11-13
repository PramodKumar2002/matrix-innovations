import React from 'react';
import {
  Award,
  Terminal,
  Cpu,
  Users,
  Briefcase,
  Rocket,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

export default function WhyChooseUs() {
  const points = [
    {
      icon: Award,
      badge: 'Curriculum Excellence',
      title: 'Industry-Focused Learning',
      desc: 'Our curricula and engineering practices are directly aligned with the tech industry’s current benchmarks, ensuring students and teams learn in-demand skills.',
      color: '#10B981'
    },
    {
      icon: Terminal,
      badge: 'Hands-on Execution',
      title: 'Practical Projects',
      desc: 'Move beyond dry textbook theory. Every module is anchored in real-world software architecture, robotics builds, and deployable production codebases.',
      color: '#06B6D4'
    },
    {
      icon: Cpu,
      badge: 'Modern Stacks',
      title: 'Modern Technologies',
      desc: 'Deep exposure to next-generation tech: React, Next.js, Cloud APIs, Artificial Intelligence models, ROS Robotics, and automated IoT pipelines.',
      color: '#3B82F6'
    },
    {
      icon: Users,
      badge: 'Elite Mentorship',
      title: 'Experienced Trainers',
      desc: 'Learn directly from practicing software developers and robotics researchers who bring real engineering experience and one-on-one code reviews.',
      color: '#8B5CF6'
    },
    {
      icon: Briefcase,
      badge: 'Career Success',
      title: 'Career-Oriented Approach',
      desc: 'Structured placement support, resume tailoring, portfolio curation, and technical interview simulations to fast-track your tech career.',
      color: '#F59E0B'
    },
    {
      icon: Rocket,
      badge: 'Enterprise Growth',
      title: 'Innovative Solutions',
      desc: 'Bespoke software and digital tools engineered to eliminate bottlenecks, modernize workflows, and foster long-term commercial scalability.',
      color: '#EC4899'
    }
  ];

  return (
    <section id="why-choose-us" className="section" style={{ backgroundColor: '#070D1F' }}>
      <div className="container">
        {/* Section Header */}
        <SectionTitle
          badge="WHY MATRIX INNOVATIONS"
          title="Why Choose Matrix Innovations?"
          highlightWord="Matrix Innovations?"
          subtitle="Empowering future tech leaders and modern organizations with industry-grade software, robotics, and career-driven training."
        />

        {/* 6 Grid Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}
          className="why-grid"
        >
          {points.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card why-card"
                style={{
                  padding: '2.25rem 2rem',
                  borderRadius: 'var(--radius-xl)',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(165deg, rgba(15, 27, 58, 0.7) 0%, rgba(8, 15, 34, 0.85) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.35s ease'
                }}
              >
                {/* Glowing Corner Indicator */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${item.color}35 0%, transparent 70%)`,
                    pointerEvents: 'none'
                  }}
                />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: `${item.color}18`,
                      color: item.color,
                      border: `1px solid ${item.color}45`
                    }}
                  >
                    <Icon size={24} />
                  </div>

                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '0.3rem 0.8rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {item.badge}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginBottom: '0.75rem'
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.94rem',
                    lineHeight: 1.65
                  }}
                >
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Value Proposition Callout Banner */}
        <div
          className="glass-card"
          style={{
            marginTop: '3.5rem',
            padding: '2.5rem 2rem',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.15) 50%, rgba(37, 99, 235, 0.15) 100%)',
            border: '1px solid rgba(6, 182, 212, 0.35)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem'
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10B981', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              <Sparkles size={16} /> ACCELERATE YOUR GROWTH TODAY
            </div>
            <h4 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>
              Ready to build the future with Matrix Innovations?
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Join hundreds of students, professionals, and innovative enterprises transforming ideas into reality in Lucknow and beyond.
            </p>
          </div>

          <a
            href="#contact"
            className="btn btn-primary"
            style={{ padding: '0.85rem 2rem' }}
          >
            <span>Start Your Journey</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      <style>{`
        .why-card:hover {
          transform: translateY(-6px);
          border-color: rgba(6, 182, 212, 0.45) !important;
          box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.7), 0 0 25px rgba(6, 182, 212, 0.2) !important;
        }

        @media (max-width: 480px) {
          .why-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
