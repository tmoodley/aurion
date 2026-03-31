'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, RegisterData } from '@/lib/auth';
import AuthLayout from '@/components/AuthLayout';
import FormField from '@/components/FormField';

const COUNTRIES = ['Canada', 'United States', 'United Kingdom', 'Zimbabwe', 'Zambia', 'Kenya', 'Nigeria', 'Ghana', 'South Africa', 'Tanzania', 'Uganda', 'Other'];
const CORRIDORS = [
  'Toronto → Lusaka',
  'Toronto → Harare',
  'Toronto → Nairobi',
  'London → Lagos',
  'London → Accra',
  'New York → Lusaka',
  'New York → Nairobi',
  'Other corridor',
];

const STEPS = ['Account', 'Identity', 'Corridor'];

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState<RegisterData & { confirmPassword: string }>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    phone: '',
    corridor: '',
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const validateStep = () => {
    if (step === 0) {
      if (!form.firstName || !form.lastName) return 'Please enter your full name.';
      if (!form.email || !form.email.includes('@')) return 'Please enter a valid email.';
      if (form.password.length < 6) return 'Password must be at least 6 characters.';
      if (form.password !== form.confirmPassword) return 'Passwords do not match.';
    }
    if (step === 1) {
      if (!form.country) return 'Please select your country.';
      if (!form.phone) return 'Please enter your phone number.';
    }
    if (step === 2) {
      if (!form.corridor) return 'Please select your remittance corridor.';
    }
    return '';
  };

  const nextStep = () => {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError('');
    setStep(s => s + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateStep();
    if (err) { setError(err); return; }
    setLoading(true);
    setError('');
    const ok = await register(form);
    setLoading(false);
    if (ok) router.push('/');
  };

  const selectStyle = {
    width: '100%',
    padding: '9px 12px',
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border)',
    borderRadius: 5,
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-sans)',
    fontSize: 14,
    outline: 'none',
    marginBottom: 14,
    appearance: 'none' as const,
    cursor: 'pointer',
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join AURION — trade Bitcoin and production-backed gold"
    >
      {/* Step indicator */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
        {STEPS.map((s, i) => (
          <div key={s} style={{ flex: 1 }}>
            <div style={{
              height: 2,
              borderRadius: 1,
              background: i <= step ? 'var(--gold)' : 'var(--border)',
              marginBottom: 4,
              transition: 'background 0.2s',
            }} />
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: i <= step ? 'var(--gold)' : 'var(--text-muted)', letterSpacing: '0.04em' }}>
              {s}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 0: Account */}
        {step === 0 && (
          <div className="animate-slide-up">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <FormField label="First name" type="text" placeholder="Tyrone" value={form.firstName} onChange={set('firstName')} />
              <FormField label="Last name" type="text" placeholder="Moodley" value={form.lastName} onChange={set('lastName')} />
            </div>
            <FormField label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} />
            <FormField label="Password" type="password" placeholder="Min 6 characters" value={form.password} onChange={set('password')} />
            <FormField label="Confirm password" type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={set('confirmPassword')} />
          </div>
        )}

        {/* Step 1: Identity */}
        {step === 1 && (
          <div className="animate-slide-up">
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                COUNTRY OF RESIDENCE
              </label>
              <select value={form.country} onChange={set('country')} style={selectStyle}>
                <option value="">Select country...</option>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <FormField label="Phone number" type="tel" placeholder="+1 416 555 0192" value={form.phone} onChange={set('phone')} />
            <div style={{ padding: '10px 12px', background: 'rgba(201,168,76,0.06)', border: '1px solid var(--border)', borderRadius: 5, fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Identity verification (KYC) is required to unlock full trading limits. You can start with limited access and complete KYC from your profile.
            </div>
          </div>
        )}

        {/* Step 2: Corridor */}
        {step === 2 && (
          <div className="animate-slide-up">
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                REMITTANCE CORRIDOR
              </label>
              <select value={form.corridor} onChange={set('corridor')} style={selectStyle}>
                <option value="">Select your corridor...</option>
                {CORRIDORS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 14 }}>
              {['M-Pesa', 'ABSA', 'MTN', 'Airtel', 'Cowries', 'SWIFT'].map(r => (
                <div key={r} style={{ padding: '7px 8px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: 4, textAlign: 'center', fontSize: 11, color: 'var(--text-secondary)' }}>
                  {r}
                </div>
              ))}
            </div>
            <div style={{ padding: '10px 12px', background: 'rgba(46,204,138,0.06)', border: '1px solid rgba(46,204,138,0.2)', borderRadius: 5, fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              AURION automatically matches you to the lowest-fee onramp for your corridor. Powered by Ndeipi infrastructure rails.
            </div>
          </div>
        )}

        {error && (
          <div style={{ padding: '8px 12px', background: 'rgba(224,82,82,0.1)', border: '1px solid rgba(224,82,82,0.3)', borderRadius: 5, fontSize: 12, color: 'var(--red)', margin: '12px 0' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
          {step > 0 && (
            <button
              type="button"
              onClick={() => { setStep(s => s - 1); setError(''); }}
              style={{
                flex: 1, padding: '11px',
                background: 'transparent',
                border: '1px solid var(--border)',
                borderRadius: 5,
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
                fontSize: 13, cursor: 'pointer', letterSpacing: '0.06em',
              }}
            >
              BACK
            </button>
          )}
          {step < 2 ? (
            <button
              type="button"
              onClick={nextStep}
              style={{
                flex: 1, padding: '11px',
                background: 'var(--gold)', border: 'none', borderRadius: 5,
                color: '#090B0E', fontFamily: 'var(--font-mono)',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.08em',
              }}
            >
              CONTINUE
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1, padding: '11px',
                background: loading ? 'var(--bg-tertiary)' : 'var(--gold)',
                border: 'none', borderRadius: 5,
                color: loading ? 'var(--text-muted)' : '#090B0E',
                fontFamily: 'var(--font-mono)',
                fontSize: 13, fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '0.08em',
              }}
            >
              {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>
          )}
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 16, textAlign: 'center' }}>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Already have an account? </span>
          <span onClick={() => router.push('/login')} style={{ fontSize: 13, color: 'var(--gold)', cursor: 'pointer', fontWeight: 500 }}>
            Sign in
          </span>
        </div>
      </form>
    </AuthLayout>
  );
}
