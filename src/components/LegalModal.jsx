import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

export default function LegalModal({ isOpen, onClose, type }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions';
  const Icon = isPrivacy ? ShieldCheck : FileText;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        backgroundColor: 'rgba(5, 8, 20, 0.85)',
        backdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0A1128',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.5rem 2rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(15, 26, 58, 0.5)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(6, 182, 212, 0.15)',
                color: '#22D3EE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Icon size={20} />
            </div>
            <div>
              <h3 id="modal-title" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF' }}>
                {title}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Effective Date: January 1, 2026 • Matrix Innovations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div
          style={{
            padding: '2rem',
            overflowY: 'auto',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            color: 'var(--text-secondary)'
          }}
        >
          {isPrivacy ? (
            <>
              <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem', fontSize: '1.05rem' }}>
                1. Information We Collect
              </h4>
              <p style={{ marginBottom: '1.25rem' }}>
                Matrix Innovations collects personal identification details (name, email address, phone number, and professional interest) strictly when you voluntarily submit our inquiry or contact forms for IT training, software solutions, or technical consulting.
              </p>

              <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem', fontSize: '1.05rem' }}>
                2. How We Use Your Information
              </h4>
              <p style={{ marginBottom: '1.25rem' }}>
                Your information is used solely to respond to your specific inquiries, deliver customized training schedules, provide software development consultations, and send important service updates. We do not sell or share your personal data with third-party marketers.
              </p>

              <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem', fontSize: '1.05rem' }}>
                3. Data Security & Storage
              </h4>
              <p style={{ marginBottom: '1.25rem' }}>
                We employ modern encryption protocols, SSL security, and industry-standard storage practices to safeguard all client and student communication from unauthorized access or alteration.
              </p>

              <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem', fontSize: '1.05rem' }}>
                4. Contact Our Privacy Office
              </h4>
              <p>
                If you have questions regarding this Privacy Policy or your personal records, please reach out to us at{' '}
                <span style={{ color: '#38BDF8' }}>privacy@matrixinnovations.in</span> or visit our offices in Lucknow, Uttar Pradesh, India.
              </p>
            </>
          ) : (
            <>
              <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem', fontSize: '1.05rem' }}>
                1. Agreement to Terms
              </h4>
              <p style={{ marginBottom: '1.25rem' }}>
                By accessing or using the services, website, training courses, and technical solutions offered by Matrix Innovations, you agree to be bound by these Terms and Conditions and our standard operating policies.
              </p>

              <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem', fontSize: '1.05rem' }}>
                2. Professional Services & IT Training
              </h4>
              <p style={{ marginBottom: '1.25rem' }}>
                Matrix Innovations provides specialized software engineering, robotics labs, IT bootcamps, and digital solutions. Project timelines, deliverables, course curriculums, and certifications are governed under mutual agreements and student program guidelines.
              </p>

              <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem', fontSize: '1.05rem' }}>
                3. Intellectual Property Rights
              </h4>
              <p style={{ marginBottom: '1.25rem' }}>
                All proprietary code, course materials, courseware, robotics modules, and brand assets displayed on this site are the exclusive intellectual property of Matrix Innovations. Unauthorized distribution or duplication without prior written consent is strictly prohibited.
              </p>

              <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem', fontSize: '1.05rem' }}>
                4. Governing Law & Jurisdiction
              </h4>
              <p>
                These terms are governed in accordance with the laws of India. Any legal disputes arising out of service engagements shall be subject to the exclusive jurisdiction of the competent courts in Lucknow, Uttar Pradesh.
              </p>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '1.25rem 2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'flex-end',
            background: 'rgba(15, 26, 58, 0.5)'
          }}
        >
          <button
            onClick={onClose}
            className="btn btn-secondary"
            style={{ padding: '0.55rem 1.5rem', fontSize: '0.9rem' }}
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
