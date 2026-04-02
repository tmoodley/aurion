'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';

interface Props {
  onSwitchToRegister: () => void;
}

export default function LoginScreen({ onSwitchToRegister }: Props) {
  const { login } = useAuth();
  const [email, setEmail] = useState('ty@ndeipi.io');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !pass) { setError('Enter email and password.'); return; }
    setLoading(true); setError('');
    const ok = await login(email, pass);
    if (!ok) { setError('Invalid credentials.'); setLoading(false); }
  };

  const inp: React.CSSProperties = {
    width: '100%',
    background: '#131820',
    border: '1px solid rgba(201,168,76,0.2)',
    borderRadius: 3,
    color: '#E8E4D9',
    fontFamily: 'IBM Plex Mono, monospace',
    fontSize: 12,
    padding: '9px 11px',
    outline: 'none',
    marginBottom: 10,
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#090B0E',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'IBM Plex Mono, monospace',
    }}>
      <div style={{ width: 360 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '0.14em', color: '#C9A84C', marginBottom: 6 }}>
            AURION
          </div>
          <div style={{ fontSize: 10, color: '#4A4844', letterSpacing: '0.12em' }}>
            NDEIPI TRADING TERMINAL
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: '#0E1117',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: 4,
          padding: '28px 28px 24px',
        }}>
          <div style={{ fontSize: 11, color: '#8A8880', marginBottom: 20, letterSpacing: '0.06em' }}>
            SIGN IN
          </div>

          <label style={{ fontSize: 9, color: '#4A4844', letterSpacing: '0.1em', display: 'block', marginBottom: 5 }}>EMAIL</label>
          <input
            style={inp}
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            type="email"
          />

          <label style={{ fontSize: 9, color: '#4A4844', letterSpacing: '0.1em', display: 'block', marginBottom: 5 }}>PASSWORD</label>
          <input
            style={inp}
            value={pass}
            onChange={e => setPass(e.target.value)}
            placeholder="••••••••"
            type="password"
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />

          {error && (
            <div style={{ fontSize: 11, color: '#E05252', marginBottom: 10, fontFamily: 'IBM Plex Mono, monospace' }}>{error}</div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? 'rgba(201,168,76,0.06)' : 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.4)',
              color: '#C9A84C',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: 11,
              padding: '11px',
              borderRadius: 2,
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '0.1em',
              marginTop: 4,
            }}
          >
            {loading ? 'AUTHENTICATING...' : 'SIGN IN'}
          </button>

          <div style={{ textAlign: 'center', marginTop: 18, fontSize: 10, color: '#4A4844' }}>
            No account?{' '}
            <button
              onClick={onSwitchToRegister}
              style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', fontFamily: 'IBM Plex Mono, monospace', fontSize: 10 }}
            >
              Register
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 9, color: '#2A2824', letterSpacing: '0.08em' }}>
          POWERED BY NDEIPI ORACLE NETWORK · NODEBOSS
        </div>
      </div>
    </div>
  );
}
