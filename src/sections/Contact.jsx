import React, { useState } from 'react';
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Send,
  User,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

export default function Contact({ prefilledSubject = '' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: prefilledSubject || 'Web Development',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Sync if prefilledSubject changes from Services section
  React.useEffect(() => {
    if (prefilledSubject) {
      setFormData((prev) => ({ ...prev, subject: prefilledSubject }));
    }
  }, [prefilledSubject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (apiError) {
      setApiError(null);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    } else if (!/^[\d+\-\s()]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid contact number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a message or inquiry details';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    setApiError(null);

    // Read backend base URL from Vite environment variables (fallback to local backend port 8000)
   const rawBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '';
   const baseUrl = rawBaseUrl.replace(/\/+$/, '');
   const apiUrl = baseUrl ? `${baseUrl}/api/contact` : '/api/contact';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || null,
          subject: formData.subject.trim(),
          message: formData.message.trim()
        })
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMsg =
          data?.message ||
          (data?.errors && data.errors.join(' | ')) ||
          'Failed to submit your message. Please try again later.';
        throw new Error(errorMsg);
      }

      setIsSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: 'Web Development',
        message: ''
      });

      // Clear success banner after 6 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 6000);
    } catch (err) {
      console.error('Contact submission error:', err);
      let errMsg = err.message || 'Unable to connect to server.';
      if (errMsg.includes('Failed to fetch') || errMsg.includes('NetworkError') || errMsg.includes('Load failed')) {
        errMsg = 'Backend server is not running on port 8000. Start backend using "npm run backend" or "cd backend && npm run dev".';
      }
      setApiError(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section" style={{ backgroundColor: '#050814' }}>
      <div className="container">
        {/* Section Header */}
        <SectionTitle
          badge="GET IN TOUCH"
          title="Contact Matrix Innovations"
          highlightWord="Matrix Innovations"
          subtitle="Reach out to discuss your software project, enroll in our tech training programs, or explore robotics partnerships in Lucknow."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3.5rem',
            alignItems: 'flex-start'
          }}
          className="contact-grid"
        >
          {/* Left Column: Direct Info & Location */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#06B6D4',
                marginBottom: '0.75rem'
              }}
            >
              <Sparkles size={16} /> COLLABORATE WITH US
            </div>

            <h3
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.25,
                marginBottom: '1.25rem'
              }}
            >
              Let's Build Something Amazing Together
            </h3>

            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1.05rem',
                lineHeight: 1.7,
                marginBottom: '2.5rem'
              }}
            >
              Whether you are an ambitious student aiming to learn cutting-edge technology, an entrepreneur launching a digital product, or an organization seeking software development in Lucknow, our team is eager to connect.
            </p>

            {/* Contact Information Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {/* Location */}
              <div
                className="glass-card"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.25rem',
                  padding: '1.25rem 1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(15, 26, 56, 0.5)'
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(6, 182, 212, 0.12)',
                    color: '#06B6D4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <MapPin size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                    Office Location
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF' }}>
                    Lucknow, Uttar Pradesh, India
                  </div>
                </div>
              </div>

              {/* Email */}
              <div
                className="glass-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  padding: '1.25rem 1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(15, 26, 56, 0.5)'
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    color: '#10B981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                    Official Email
                  </div>
                  <a
                    href="mailto:info@matrixinnovations.in"
                    style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#38BDF8')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  >
                    info@matrixinnovations.in
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div
                className="glass-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  padding: '1.25rem 1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(15, 26, 56, 0.5)'
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(59, 130, 246, 0.12)',
                    color: '#3B82F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Phone size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                    Phone & WhatsApp
                  </div>
                  <a
                    href="tel:+919876543210"
                    style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#38BDF8')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  >
                    +91 98765 43210 / +91 80090 12345
                  </a>
                </div>
              </div>

              {/* Website */}
              <div
                className="glass-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  padding: '1.25rem 1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(15, 26, 56, 0.5)'
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(236, 72, 153, 0.12)',
                    color: '#EC4899',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Globe size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                    Official Website
                  </div>
                  <a
                    href="https://matrixinnovations.in"
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#38BDF8')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  >
                    www.matrixinnovations.in
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Hours Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.65rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: 'var(--text-muted)',
                fontSize: '0.85rem'
              }}
            >
              <Clock size={16} color="#10B981" />
              <span>Office Hours: Monday – Saturday: 9:00 AM – 7:00 PM IST</span>
            </div>
          </div>

          {/* Right Column: Modern Contact Form */}
          <div style={{ position: 'relative' }}>
            {/* Ambient Form Glow */}
            <div
              style={{
                position: 'absolute',
                inset: '-15px',
                borderRadius: 'var(--radius-xl)',
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(16, 185, 129, 0.2))',
                filter: 'blur(30px)',
                zIndex: 0
              }}
            />

            <div
              className="glass-card"
              style={{
                position: 'relative',
                zIndex: 1,
                padding: '2.5rem 2rem',
                borderRadius: 'var(--radius-xl)',
                background: 'linear-gradient(165deg, rgba(14, 25, 54, 0.9) 0%, rgba(8, 14, 34, 0.96) 100%)',
                border: '1px solid rgba(6, 182, 212, 0.35)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)'
              }}
            >
              <h4 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.4rem' }}>
                Send Us a Message
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                Fill out the form below and an engineer or program coordinator will reply within 24 hours.
              </p>

              {/* Success Notification Alert */}
              {isSuccess && (
                <div
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid #10B981',
                    color: '#A7F3D0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1.75rem',
                    animation: 'fadeIn 0.3s ease'
                  }}
                >
                  <CheckCircle size={22} color="#10B981" style={{ flexShrink: 0 }} />
                  <div style={{ fontSize: '0.9rem' }}>
                    <strong style={{ color: '#FFFFFF' }}>Thank you!</strong> Your message has been sent successfully. Matrix Innovations will be in touch shortly.
                  </div>
                </div>
              )}

              {/* API Error Notification Alert */}
              {apiError && (
                <div
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid #EF4444',
                    color: '#FCA5A5',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1.75rem',
                    animation: 'fadeIn 0.3s ease'
                  }}
                >
                  <AlertCircle size={22} color="#EF4444" style={{ flexShrink: 0 }} />
                  <div style={{ fontSize: '0.9rem' }}>
                    <strong style={{ color: '#FFFFFF' }}>Submission Error:</strong> {apiError}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* Full Name */}
                <div style={{ marginBottom: '1.35rem' }}>
                  <label
                    htmlFor="fullName"
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      marginBottom: '0.4rem'
                    }}
                  >
                    Full Name <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <div className="form-input-wrapper">
                    <User size={18} className="input-icon" />
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={errors.fullName ? 'has-error' : ''}
                      required
                    />
                  </div>
                  {errors.fullName && (
                    <span className="error-text">
                      <AlertCircle size={14} /> {errors.fullName}
                    </span>
                  )}
                </div>

                {/* Email Address & Phone Number Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.25rem',
                    marginBottom: '1.35rem'
                  }}
                >
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--text-secondary)',
                        marginBottom: '0.4rem'
                      }}
                    >
                      Email Address <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <div className="form-input-wrapper">
                      <Mail size={18} className="input-icon" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="rahul@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'has-error' : ''}
                        required
                      />
                    </div>
                    {errors.email && (
                      <span className="error-text">
                        <AlertCircle size={14} /> {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--text-secondary)',
                        marginBottom: '0.4rem'
                      }}
                    >
                      Phone Number <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <div className="form-input-wrapper">
                      <Phone size={18} className="input-icon" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? 'has-error' : ''}
                        required
                      />
                    </div>
                    {errors.phone && (
                      <span className="error-text">
                        <AlertCircle size={14} /> {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject Selection */}
                <div style={{ marginBottom: '1.35rem' }}>
                  <label
                    htmlFor="subject"
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      marginBottom: '0.4rem'
                    }}
                  >
                    Inquiry Subject
                  </label>
                  <div className="form-input-wrapper">
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="Software Development">Software Development</option>
                      <option value="IT Training">IT Training & Courses</option>
                      <option value="Robotics & AI">Robotics & AI Solutions</option>
                      <option value="Digital Solutions">Digital Solutions</option>
                      <option value="Career & Skill Development">Career & Skill Development</option>
                      <option value="Corporate Partnership">Corporate Partnership</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <label
                    htmlFor="message"
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      marginBottom: '0.4rem'
                    }}
                  >
                    Your Message <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <div className="form-input-wrapper" style={{ alignItems: 'flex-start' }}>
                    <MessageSquare size={18} className="input-icon" style={{ marginTop: '14px' }} />
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell us about your project requirements or training interest..."
                      value={formData.message}
                      onChange={handleChange}
                      className={errors.message ? 'has-error' : ''}
                      required
                    />
                  </div>
                  {errors.message && (
                    <span className="error-text">
                      <AlertCircle size={14} /> {errors.message}
                    </span>
                  )}
                </div>

                {/* Send Message Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.95rem',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.65rem'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        style={{
                          width: '18px',
                          height: '18px',
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderTopColor: '#FFFFFF',
                          borderRadius: '50%',
                          display: 'inline-block',
                          animation: 'spin 0.8s linear infinite'
                        }}
                      />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr 1.15fr !important;
          }
        }

        .form-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(10, 18, 42, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-md);
          transition: all 0.25s ease;
        }

        .form-input-wrapper:focus-within {
          border-color: #06B6D4;
          box-shadow: 0 0 16px rgba(6, 182, 212, 0.35);
          background: rgba(15, 26, 56, 0.9);
        }

        .form-input-wrapper .input-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-muted);
          pointer-events: none;
          transition: color 0.25s ease;
        }

        .form-input-wrapper:focus-within .input-icon {
          color: #06B6D4;
        }

        .form-input-wrapper input,
        .form-input-wrapper select,
        .form-input-wrapper textarea {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: #FFFFFF;
          font-family: inherit;
          font-size: 0.95rem;
          padding: 0.85rem 1rem 0.85rem 2.85rem;
          border-radius: var(--radius-md);
        }

        .form-input-wrapper select option {
          background-color: #0B132B;
          color: #FFFFFF;
        }

        .form-input-wrapper textarea {
          resize: vertical;
          min-height: 110px;
        }

        .form-input-wrapper input::placeholder,
        .form-input-wrapper textarea::placeholder {
          color: var(--text-dim);
        }

        .error-text {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          color: #F87171;
          margin-top: 0.4rem;
          padding-left: 0.2rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
