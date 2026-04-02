'use client';
import { useState } from 'react';

const RAILS = [
  { id: 'mpesa', label: 'M-Pesa', region: 'Kenya / TZ', color: '#2ECC8A' },
  { id: 'mtn', label: 'MTN MoMo', region: 'Ghana / UG', color: '#F7931A' },
  { id: 'absa', label: 'ABSA Bank', region: 'Zambia / SA', color: '#E05252' },
  { id: 'cowries', label: 'Cowries', region: 'Nigeria', color: '#C9A84C' },
  { id: 'airtel', label: 'Airtel Money', region: 'ZM / MW', color: '#E05252' },
  { id: 'swift', label: 'SWIFT / Wire', region: 'Global', color: '#4A9ECC' },
];

export default function OnrampPanel() {
  const [selected, setSelected] = useState('absa');
  const [amount, setAmount] = useState('100');
  const rail = RAILS.find(r => r.id === selected)!;
  const agdAmount = (parseFloat(amount) || 0) / 62.4;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 9, color: '#4A4844', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', marginBottom: 10 }}>
        SELECT PAYMENT RAIL
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 14 }}>
        {RAILS.map(r => (
          <button
            key={r.id}
            onClick={() => setSelected(r.id)}
            style={{
              background: selected === r.id ? `${r.color}14` : 'transparent',
              border: `1px solid ${selected === r.id ? r.color + '66' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: 3,
              padding: '8px 10px',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <div style={{ fontSize: 11, color: selected === r.id ? r.color : '#8A8880', fontFamily: 'IBM Plex Mono, monospace' }}>
              {r.label}
            </div>
            <div style={{ fontSize: 9, color: '#4A4844', marginTop: 2 }}>{r.region}</div>
          </button>
        ))}
      </div>

      <div style={{ fontSize: 9, color: '#4A4844', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', marginBottom: 6 }}>
        AMOUNT (USD)
      </div>
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        style={{
          width: '100%',
          background: '#131820',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: 3,
          color: '#E8E4D9',
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: 14,
          padding: '8px 10px',
          outline: 'none',
          marginBottom: 10,
        }}
      />

      <div style={{ background: '#131820', borderRadius: 3, padding: '10px 12px', marginBottom: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <span style={{ fontSize: 10, color: '#4A4844' }}>Via</span>
          <span style={{ fontSize: 10, color: rail.color, fontFamily: 'IBM Plex Mono, monospace' }}>{rail.label}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <span style={{ fontSize: 10, color: '#4A4844' }}>Corridor</span>
          <span style={{ fontSize: 10, color: '#8A8880', fontFamily: 'IBM Plex Mono, monospace' }}>{rail.region}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 6, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={{ fontSize: 10, color: '#4A4844' }}>You receive (AGD)</span>
          <span style={{ fontSize: 11, color: '#C9A84C', fontFamily: 'IBM Plex Mono, monospace' }}>{agdAmount.toFixed(4)} AGD</span>
        </div>
      </div>

      <button style={{
        width: '100%',
        background: 'rgba(201,168,76,0.08)',
        border: '1px solid rgba(201,168,76,0.35)',
        color: '#C9A84C',
        fontFamily: 'IBM Plex Mono, monospace',
        fontSize: 11,
        padding: '10px',
        borderRadius: 2,
        cursor: 'pointer',
        letterSpacing: '0.08em',
      }}>
        INITIATE ONRAMP
      </button>
    </div>
  );
}
