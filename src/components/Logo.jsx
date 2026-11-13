import React from 'react';
import matrixLogoImg from '../assets/matrix-logo.jpg';

export default function Logo({ size = 'md', showText = true, className = '' }) {
  const sizeMap = {
    sm: { img: 36, textMain: '1rem', textSub: '0.62rem' },
    md: { img: 44, textMain: '1.2rem', textSub: '0.7rem' },
    lg: { img: 56, textMain: '1.45rem', textSub: '0.8rem' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        textDecoration: 'none',
        userSelect: 'none'
      }}
    >
      <div
        className="logo-badge"
        style={{
          width: `${currentSize.img}px`,
          height: `${currentSize.img}px`,
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.2))',
          border: '1.5px solid rgba(6, 182, 212, 0.4)',
          boxShadow: '0 0 16px rgba(6, 182, 212, 0.25)',
          flexShrink: 0,
          transition: 'all 0.3s ease'
        }}
      >
        <img
          src={matrixLogoImg}
          alt="Matrix Innovations Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span
            style={{
              fontFamily: "'Space Grotesk', 'Plus Jakarta Sans', sans-serif",
              fontSize: currentSize.textMain,
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            MATRIX
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                boxShadow: '0 0 8px #10B981',
                display: 'inline-block'
              }}
            />
          </span>
          <span
            style={{
              fontSize: currentSize.textSub,
              fontWeight: 700,
              letterSpacing: '0.22em',
              color: '#06B6D4',
              textTransform: 'uppercase',
              marginTop: '2px'
            }}
          >
            INNOVATIONS
          </span>
        </div>
      )}
    </div>
  );
}
