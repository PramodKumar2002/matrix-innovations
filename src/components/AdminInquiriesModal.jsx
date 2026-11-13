import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  RefreshCw,
  Trash2,
  Mail,
  Phone,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Search,
  Key
} from 'lucide-react';

export default function AdminInquiriesModal({ isOpen, onClose }) {
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('matrix_admin_key') || 'test_admin_matrix_secret_key_98765';
  });
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const rawBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const baseUrl = (rawBaseUrl !== undefined ? rawBaseUrl : 'http://127.0.0.1:8000').replace(/\/+$/, '');

  const fetchMessages = async (keyToUse = apiKey) => {
    if (!keyToUse.trim()) {
      setError('Please provide an Admin API Key.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const apiUrl = baseUrl ? `${baseUrl}/api/contact?limit=100` : '/api/contact?limit=100';

    try {
      const res = await fetch(apiUrl, {
        headers: {
          'X-Admin-API-Key': keyToUse.trim(),
          'Accept': 'application/json'
        }
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Invalid Admin API Key. Please check the key configured in backend/.env.');
        }
        if (res.status === 503) {
          throw new Error('Database service unavailable. Check MONGODB_URI in backend/.env.');
        }
        throw new Error(`Server returned error status ${res.status}`);
      }

      const data = await res.json();
      setMessages(data.messages || []);
      localStorage.setItem('matrix_admin_key', keyToUse.trim());
    } catch (err) {
      console.error('Failed to load contact messages:', err);
      let msg = err.message || 'Unable to connect to backend.';
      if (msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
        msg = 'Backend server is not running on port 8000. Start backend using "npm run backend".';
      }
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleDelete = async (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      const deleteUrl = baseUrl ? `${baseUrl}/api/contact/${messageId}` : `/api/contact/${messageId}`;
      const res = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'X-Admin-API-Key': apiKey.trim()
        }
      });

      if (!res.ok) throw new Error('Failed to delete message.');

      setMessages((prev) => prev.filter((m) => m.id !== messageId));
      setSuccessMsg('Message deleted successfully.');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      alert(err.message || 'Error deleting message.');
    }
  };

  if (!isOpen) return null;

  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      m.name?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.email?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.subject?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.message?.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(2, 6, 23, 0.85)',
        backdropFilter: 'blur(12px)',
        padding: '1rem',
        animation: 'fadeIn 0.25s ease'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0a1026',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          borderRadius: '16px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(6, 182, 212, 0.15)',
          overflow: 'hidden'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.1) 0%, rgba(15, 26, 56, 0.5) 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: 'rgba(6, 182, 212, 0.15)',
                color: '#06B6D4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                Admin Portal: Contact Inquiries
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                View and manage messages received from the Contact Us form (MongoDB Atlas)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Controls Bar */}
        <div
          style={{
            padding: '1rem 1.75rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            backgroundColor: 'rgba(12, 20, 48, 0.6)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.85rem'
          }}
        >
          {/* API Key Input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: '1 1 300px' }}>
            <Key size={16} color="#06B6D4" />
            <input
              type="password"
              placeholder="Admin API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              style={{
                flex: 1,
                background: 'rgba(10, 16, 36, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                padding: '0.45rem 0.75rem',
                color: '#FFFFFF',
                fontSize: '0.85rem'
              }}
            />
            <button
              onClick={() => fetchMessages(apiKey)}
              disabled={isLoading}
              className="btn btn-secondary"
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <RefreshCw size={14} className={isLoading ? 'spin-icon' : ''} />
              <span>{isLoading ? 'Loading...' : 'Refresh'}</span>
            </button>
          </div>

          {/* Quick links & Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <Search
                size={14}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-dim)'
                }}
              />
              <input
                type="text"
                placeholder="Search inquiries..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                style={{
                  background: 'rgba(10, 16, 36, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  padding: '0.45rem 0.75rem 0.45rem 2rem',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  width: '180px'
                }}
              />
            </div>

            <a
              href="http://127.0.0.1:8000/docs"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.8rem',
                color: '#38BDF8',
                padding: '0.45rem 0.75rem',
                borderRadius: '8px',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.2)'
              }}
            >
              <span>Swagger Docs</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Alerts / Error banners */}
        {error && (
          <div
            style={{
              padding: '0.85rem 1.75rem',
              background: 'rgba(239, 68, 68, 0.15)',
              borderBottom: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#FCA5A5',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              fontSize: '0.85rem'
            }}
          >
            <AlertCircle size={18} color="#EF4444" style={{ flexShrink: 0 }} />
            <div>{error}</div>
          </div>
        )}

        {successMsg && (
          <div
            style={{
              padding: '0.85rem 1.75rem',
              background: 'rgba(16, 185, 129, 0.15)',
              borderBottom: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#A7F3D0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              fontSize: '0.85rem'
            }}
          >
            <CheckCircle size={18} color="#10B981" style={{ flexShrink: 0 }} />
            <div>{successMsg}</div>
          </div>
        )}

        {/* Modal Body: List of messages */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem 1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          {isLoading && messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <RefreshCw size={28} className="spin-icon" style={{ margin: '0 auto 1rem auto', color: '#06B6D4' }} />
              <p>Connecting to backend and fetching inquiries...</p>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '3.5rem 1rem',
                color: 'var(--text-muted)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '12px',
                border: '1px dashed rgba(255, 255, 255, 0.1)'
              }}
            >
              <Mail size={36} style={{ color: 'var(--text-dim)', marginBottom: '0.75rem' }} />
              <h4 style={{ color: '#FFFFFF', marginBottom: '0.25rem' }}>No Inquiries Found</h4>
              <p style={{ fontSize: '0.85rem' }}>
                {messages.length === 0
                  ? 'No contact submissions found in MongoDB yet. Submit one from the website form to test.'
                  : 'No messages match your search filter.'}
              </p>
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <div
                key={msg.id}
                className="glass-card"
                style={{
                  padding: '1.25rem 1.5rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(15, 24, 52, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Message Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#FFFFFF' }}>
                        {msg.name}
                      </span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '100px',
                          backgroundColor: 'rgba(6, 182, 212, 0.15)',
                          color: '#06B6D4',
                          fontWeight: 700,
                          textTransform: 'uppercase'
                        }}
                      >
                        {msg.subject || 'General'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <a
                        href={`mailto:${msg.email}`}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#38BDF8' }}
                      >
                        <Mail size={14} />
                        <span>{msg.email}</span>
                      </a>

                      {msg.phone && (
                        <a
                          href={`tel:${msg.phone}`}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#10B981' }}
                        >
                          <Phone size={14} />
                          <span>{msg.phone}</span>
                        </a>
                      )}

                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-dim)' }}>
                        <Clock size={14} />
                        <span>{new Date(msg.created_at).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(msg.id)}
                    title="Delete inquiry"
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.25)',
                      borderRadius: '8px',
                      color: '#F87171',
                      padding: '0.45rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#EF4444';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                      e.currentTarget.style.color = '#F87171';
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Message Body */}
                <div
                  style={{
                    backgroundColor: 'rgba(8, 14, 32, 0.7)',
                    padding: '0.85rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                    border: '1px solid rgba(255, 255, 255, 0.04)'
                  }}
                >
                  {msg.message}
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'right' }}>
                  ID: {msg.id}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '1rem 1.75rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            backgroundColor: 'rgba(10, 16, 36, 0.8)'
          }}
        >
          <div>
            Total Messages: <strong style={{ color: '#FFFFFF' }}>{messages.length}</strong>
          </div>
          <button
            onClick={onClose}
            className="btn btn-secondary"
            style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem' }}
          >
            Close
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .spin-icon {
          animation: spin 0.8s linear infinite;
        }
      `}</style>
    </div>
  );
}
