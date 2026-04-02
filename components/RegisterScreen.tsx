'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';

interface Props {
  onSwitchToLogin: () => void;
}

export default function RegisterScreen({ onSwitchToLogin }: Props) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !pass) { setError('All fields required.'); return; }
    if (pass !== confirm) { setError('Passwords do not match.'); return; }
    if (pass.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true); setError('');
    await register({
      firstName: name.split(' ')[0],
      lastName: name.split(' ').slice(1).join(' ') || '',
      email,
      password: pass,
      country: '',
      phone: '',
      corridor: '',
    });
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
  const lbl: React.CSSProperties = { fontSize: 9, color: '#4A4844', letterSpacing: '0.1em', display: 'block', marginBottom: 5 };

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
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '0.14em', color: '#C9A84C', marginBottom: 6 }}>AURION</div>
          <div style={{ fontSize: 10, color: '#4A4844', letterSpacing: '0.12em' }}>NDEIPI TRADING TERMINAL</div>
        </div>

        <div style={{
          background: '#0E1117',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: 4,
          padding: '28px 28px 24px',
        }}>
          <div style={{ fontSize: 11, color: '#8A8880', marginBottom: 20, letterSpacing: '0.06em' }}>CREATE ACCOUNT</div>

          <label style={lbl}>FULL NAME</label>
          <input style={inp} value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />

          <label style={lbl}>EMAIL</label>
          <input style={inp} value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" type="email" />

          <label style={lbl}>PASSWORD</label>
          <input style={inp} value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" type="password" />

          <label style={lbl}>CONFIRM PASSWORD</label>
          <input style={inp} value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="••••••••" type="password"
            onKeyDown={e => e.key === 'Enter' && handleRegister()} />

          {error && <div style={{ fontSize: 11, color: '#E05252', marginBottom: 10 }}>{error}</div>}

          <button
            onClick={handleRegister}
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
            {loading ? 'CREATING ACCOUNT...' : 'REGISTER'}
          </button>

          <div style={{ textAlign: 'center', marginTop: 18, fontSize: 10, color: '#4A4844' }}>
            Have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', fontFamily: 'IBM Plex Mono, monospace', fontSize: 10 }}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
