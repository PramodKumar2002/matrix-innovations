import React, { useEffect, useState, useRef } from 'react';

export default function StatCounter({ target, label, suffix = '+', icon: Icon, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime = null;

          const animateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease-out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeProgress * target);
            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(animateCount);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(animateCount);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [target, duration, hasAnimated]);

  return (
    <div
      ref={elementRef}
      className="glass-card stat-card"
      style={{
        padding: '1.75rem 1.25rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(180deg, rgba(16, 28, 60, 0.7) 0%, rgba(10, 17, 40, 0.8) 100%)'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #10B981, #06B6D4, #3B82F6)'
        }}
      />
      {Icon && (
        <div
          style={{
            width: '42px',
            height: '42px',
            margin: '0 auto 0.85rem auto',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(6, 182, 212, 0.1)',
            color: '#22D3EE',
            border: '1px solid rgba(6, 182, 212, 0.25)'
          }}
        >
          <Icon size={22} />
        </div>
      )}
      <div
        style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          fontFamily: "'Space Grotesk', 'Plus Jakarta Sans', sans-serif",
          lineHeight: 1.1,
          marginBottom: '0.4rem',
          background: 'linear-gradient(135deg, #FFFFFF 30%, #38BDF8 70%, #10B981 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        {count}
        {suffix}
      </div>
      <div
        style={{
          fontSize: '0.9rem',
          fontWeight: 600,
          color: 'var(--text-muted)',
          letterSpacing: '0.02em',
          textTransform: 'uppercase'
        }}
      >
        {label}
      </div>
    </div>
  );
}
