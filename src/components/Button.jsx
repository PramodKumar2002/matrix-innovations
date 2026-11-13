import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  loading = false,
  ...props
}) {
  const sizeClasses = {
    sm: 'padding: 0.55rem 1.25rem; font-size: 0.85rem;',
    md: 'padding: 0.85rem 1.85rem; font-size: 0.975rem;',
    lg: 'padding: 1.05rem 2.25rem; font-size: 1.05rem;'
  };

  const content = (
    <>
      {loading ? (
        <span
          style={{
            width: '16px',
            height: '16px',
            border: '2px solid rgba(255,255,255,0.3)',
            borderTopColor: '#FFFFFF',
            borderRadius: '50%',
            display: 'inline-block',
            animation: 'spin 0.8s linear infinite',
            marginRight: '0.5rem'
          }}
        />
      ) : (
        Icon && iconPosition === 'left' && <Icon size={18} style={{ flexShrink: 0 }} />
      )}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && (
        <Icon size={18} style={{ flexShrink: 0, transition: 'transform 0.2s ease' }} />
      )}
    </>
  );

  const buttonStyle = {
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.65rem',
    borderRadius: 'var(--radius-full)',
    fontWeight: 600,
    transition: 'all var(--transition-normal)',
    textDecoration: 'none'
  };

  if (href) {
    return (
      <a
        href={href}
        className={`btn btn-${variant} ${className}`}
        style={buttonStyle}
        onClick={onClick}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
}
