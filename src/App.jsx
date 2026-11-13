import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import AdminInquiriesModal from './components/AdminInquiriesModal';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import WhyChooseUs from './sections/WhyChooseUs';
import Contact from './sections/Contact';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalType, setLegalType] = useState('privacy'); // 'privacy' | 'terms'
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenLegal = (type) => {
    setLegalType(type);
    setLegalModalOpen(true);
  };

  const handleCloseLegal = () => {
    setLegalModalOpen(false);
  };

  const handleSelectService = (serviceTitle) => {
    setSelectedService(serviceTitle);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Top Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main style={{ flex: '1 0 auto' }}>
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. About Section with Animated Statistics */}
        <About />

        {/* 3. Services Section with Responsive Cards */}
        <Services onSelectService={handleSelectService} />

        {/* 4. Why Choose Us Section */}
        <WhyChooseUs />

        {/* 5. Contact Us Section */}
        <Contact prefilledSubject={selectedService} />
      </main>

      {/* Corporate Dark Footer */}
      <Footer onOpenLegal={handleOpenLegal} onOpenAdmin={() => setAdminModalOpen(true)} />

      {/* Accessible Legal Modal for Privacy Policy & Terms */}
      <LegalModal
        isOpen={legalModalOpen}
        type={legalType}
        onClose={handleCloseLegal}
      />

      {/* Admin Portal Modal to view and manage inquiries */}
      <AdminInquiriesModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 900,
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: 'rgba(10, 18, 42, 0.85)',
            backdropFilter: 'blur(10px)',
            border: '1.5px solid rgba(6, 182, 212, 0.5)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5), 0 0 15px rgba(6, 182, 212, 0.3)',
            color: '#38BDF8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#06B6D4';
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(10, 18, 42, 0.85)';
            e.currentTarget.style.color = '#38BDF8';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
