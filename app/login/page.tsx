'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import AuthLayout from '@/components/AuthLayout';
import FormField from '@/components/FormField';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please enter your email and password.'); return; }
    setLoading(true);
    setError('');
    const ok = await login(email, password);
    setLoading(false);
    if (ok) router.push('/');
    else setError('Invalid credentials. Try any email + password for this demo.');
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your AURION trading account"
    >
      <form onSubmit={handleSubmit}>
        <FormField
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
        />
        <FormField
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        {error && (
          <div style={{ padding: '8px 12px', background: 'rgba(224,82,82,0.1)', border: '1px solid rgba(224,82,82,0.3)', borderRadius: 5, fontSize: 12, color: 'var(--red)', marginBottom: 14 }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <span style={{ fontSize: 12, color: 'var(--gold)', cursor: 'pointer' }}>Forgot password?</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '11px',
            background: loading ? 'var(--bg-tertiary)' : 'var(--gold)',
            border: 'none',
            borderRadius: 5,
            color: loading ? 'var(--text-muted)' : '#090B0E',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            letterSpacing: '0.08em',
            transition: 'all 0.15s',
            marginBottom: 16,
          }}
        >
          {loading ? 'AUTHENTICATING...' : 'SIGN IN'}
        </button>

        {/* Demo hint */}
        <div style={{ padding: '8px 12px', background: 'rgba(201,168,76,0.06)', border: '1px solid var(--border)', borderRadius: 5, fontSize: 11, color: 'var(--text-muted)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          Demo: enter any email + password to sign in
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, textAlign: 'center' }}>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>No account? </span>
          <span
            onClick={() => router.push('/register')}
            style={{ fontSize: 13, color: 'var(--gold)', cursor: 'pointer', fontWeight: 500 }}
          >
            Create one
          </span>
        </div>
      </form>
    </AuthLayout>
  );
}
