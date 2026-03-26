'use client';
import { useState } from 'react';
import { ONRAMPS } from '@/lib/assets';
import { ArrowRight } from 'lucide-react';

export default function OnrampPanel() {
  const [selected, setSelected] = useState('mpesa');
  const [amount, setAmount] = useState('100');

  const active = ONRAMPS.find(r => r.id === selected);

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 12 }}>
        DIASPORA ONRAMP
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 14 }}>
        {ONRAMPS.map(r => (
          <button
            key={r.id}
            onClick={() => setSelected(r.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 10px',
              background: selected === r.id ? 'var(--bg-hover)' : 'var(--bg-tertiary)',
              border: selected === r.id ? `1px solid ${r.color}55` : '1px solid var(--border)',
              borderRadius: 5,
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <span style={{ fontSize: 16 }}>{r.icon}</span>
            <div>
              <div style={{ fontSize: 12, color: selected === r.id ? r.color : 'var(--text-primary)', fontWeight: 500 }}>{r.name}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{r.desc}</div>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div className="animate-slide-up">
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 5 }}>Send amount ({active.name})</div>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                background: 'var(--bg-tertiary)',
                border: `1px solid ${active.color}55`,
                borderRadius: 5,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                outline: 'none',
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            background: 'var(--bg-tertiary)',
            borderRadius: 5,
            border: '1px solid var(--border)',
            marginBottom: 12,
          }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{active.name} → AGD</span>
            <ArrowRight size={14} color="var(--text-muted)" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gold)' }}>
              ~{(parseFloat(amount) * 0.97).toFixed(2)} AGD
            </span>
          </div>

          <button style={{
            width: '100%',
            padding: '10px',
            background: `${active.color}22`,
            border: `1px solid ${active.color}55`,
            borderRadius: 5,
            color: active.color,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            letterSpacing: '0.06em',
          }}>
            INITIATE TRANSFER
          </button>

          <div style={{ fontSize: 10, color: 'var(--text-muted)', textAlign: 'center', marginTop: 8 }}>
            3% fee · Settles to Afro Gold Dollar · Polygon network
          </div>
        </div>
      )}
    </div>
  );
}
