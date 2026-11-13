import React from 'react';

export default function SectionTitle({
  badge,
  title,
  highlightWord,
  subtitle,
  align = 'center',
  className = ''
}) {
  return (
    <div
      className={`section-header ${className}`}
      style={{
        textAlign: align,
        margin: align === 'center' ? '0 auto 3.5rem auto' : '0 0 3.5rem 0',
        maxWidth: align === 'center' ? '760px' : '100%'
      }}
    >
      {badge && (
        <div className="section-badge">
          <span className="section-badge-dot" />
          <span>{badge}</span>
        </div>
      )}

      {title && (
        <h2 className="section-title">
          {highlightWord ? (
            <>
              {title.split(highlightWord)[0]}
              <span className="gradient-brand-text">{highlightWord}</span>
              {title.split(highlightWord)[1]}
            </>
          ) : (
            title
          )}
        </h2>
      )}

      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
