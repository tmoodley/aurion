'use client';
import { useState } from 'react';
import { Asset } from '@/lib/assets';

export default function TradePanel({ asset }: { asset: Asset }) {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('500');
  const [done, setDone] = useState(false);

  const usd = parseFloat(amount) || 0;
  const receive = usd / asset.price;
  const fee = usd * 0.001;
  const fmt = (p: number) => p > 1000 ? '$' + p.toLocaleString() : '$' + p.toFixed(2);
  const fmtReceive = (v: number) => v < 0.01 ? v.toFixed(6) : v > 100 ? v.toFixed(2) : v.toFixed(4);

  const s: Record<string, React.CSSProperties> = {
    label: { fontSize: 9, color: '#4A4844', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', marginBottom: 6, display: 'block' },
    input: {
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
    },
    quickBtn: (v: string): React.CSSProperties => ({
      flex: 1,
      background: amount === v ? 'rgba(201,168,76,0.1)' : 'transparent',
      border: `1px solid ${amount === v ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.07)'}`,
      color: amount === v ? '#C9A84C' : '#4A4844',
      fontFamily: 'IBM Plex Mono, monospace',
      fontSize: 10,
      padding: '5px 4px',
      borderRadius: 2,
      cursor: 'pointer',
    }),
    row: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 },
    rowLabel: { fontSize: 10, color: '#4A4844' },
    rowVal: { fontSize: 10, color: '#8A8880', fontFamily: 'IBM Plex Mono, monospace' },
  };

  if (done) return (
    <div style={{ padding: 16, textAlign: 'center' }}>
      <div style={{ fontSize: 28, marginBottom: 8 }}>✓</div>
      <div style={{ fontFamily: 'IBM Plex Mono, monospace', color: '#2ECC8A', fontSize: 13, marginBottom: 4 }}>Order submitted</div>
      <div style={{ fontSize: 11, color: '#4A4844', marginBottom: 16 }}>
        {side === 'buy' ? 'Buying' : 'Selling'} {fmtReceive(receive)} {asset.name}
      </div>
      <button onClick={() => setDone(false)} style={{ ...s.quickBtn(''), flex: 'none', padding: '6px 16px', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.4)' }}>
        New order
      </button>
    </div>
  );

  return (
    <div style={{ padding: 16 }}>
      {/* Side toggle */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
        {(['buy', 'sell'] as const).map(t => (
          <button key={t} onClick={() => setSide(t)} style={{
            flex: 1,
            background: side === t ? (t === 'buy' ? 'rgba(46,204,138,0.12)' : 'rgba(224,82,82,0.12)') : 'transparent',
            border: `1px solid ${side === t ? (t === 'buy' ? '#2ECC8A' : '#E05252') : 'rgba(255,255,255,0.07)'}`,
            color: side === t ? (t === 'buy' ? '#2ECC8A' : '#E05252') : '#4A4844',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: 11,
            padding: '7px',
            borderRadius: 2,
            cursor: 'pointer',
            letterSpacing: '0.06em',
          }}>
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      <label style={s.label}>AMOUNT (USD)</label>
      <input
        style={s.input}
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="0.00"
        type="number"
      />

      <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
        {['100', '500', '1000', '5000'].map(v => (
          <button key={v} style={s.quickBtn(v)} onClick={() => setAmount(v)}>
            ${v === '1000' ? '1K' : v === '5000' ? '5K' : v}
          </button>
        ))}
      </div>

      <div style={{ background: '#131820', borderRadius: 3, padding: '10px 12px', marginBottom: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={s.row}><span style={s.rowLabel}>Price</span><span style={s.rowVal}>{fmt(asset.price)}</span></div>
        <div style={s.row}><span style={s.rowLabel}>You receive</span><span style={{ ...s.rowVal, color: '#C9A84C' }}>{fmtReceive(receive)} {asset.name}</span></div>
        <div style={s.row}><span style={s.rowLabel}>Fee (0.1%)</span><span style={s.rowVal}>${fee.toFixed(2)}</span></div>
        <div style={{ ...s.row, marginBottom: 0, paddingTop: 6, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={s.rowLabel}>Total</span>
          <span style={{ ...s.rowVal, color: '#E8E4D9' }}>${(usd + fee).toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={() => setDone(true)}
        style={{
          width: '100%',
          background: side === 'buy' ? 'rgba(46,204,138,0.12)' : 'rgba(224,82,82,0.12)',
          border: `1px solid ${side === 'buy' ? '#2ECC8A' : '#E05252'}`,
          color: side === 'buy' ? '#2ECC8A' : '#E05252',
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: 11,
          padding: '10px',
          borderRadius: 2,
          cursor: 'pointer',
          letterSpacing: '0.08em',
        }}
      >
        {side === 'buy' ? 'BUY' : 'SELL'} {asset.name}
      </button>
    </div>
  );
}
