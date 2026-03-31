'use client';
import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function FormField({ label, error, ...props }: Props) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
        {label.toUpperCase()}
      </label>
      <input
        {...props}
        style={{
          width: '100%',
          padding: '9px 12px',
          background: 'var(--bg-tertiary)',
          border: error ? '1px solid var(--red)' : '1px solid var(--border)',
          borderRadius: 5,
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          outline: 'none',
          transition: 'border-color 0.15s',
          ...props.style,
        }}
        onFocus={e => { e.target.style.borderColor = 'var(--border-bright)'; }}
        onBlur={e => { e.target.style.borderColor = error ? 'var(--red)' : 'var(--border)'; }}
      />
      {error && <div style={{ fontSize: 11, color: 'var(--red)', marginTop: 4 }}>{error}</div>}
    </div>
  );
}
