'use client';
import { useState } from 'react';
import { Asset } from '@/lib/assets';

interface Props { asset: Asset; }

export default function TradePanel({ asset }: Props) {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('500');
  const [submitted, setSubmitted] = useState(false);

  const usdAmount = parseFloat(amount) || 0;
  const receive = usdAmount / asset.price;
  const fee = usdAmount * 0.001;

  const formatReceive = (val: number) =>
    val < 0.01 ? val.toFixed(6) : val > 100 ? val.toFixed(2) : val.toFixed(4);

  const formatPrice = (price: number) =>
    price > 1000 ? `$${price.toLocaleString()}` : `$${price.toFixed(2)}`;

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 12 }}>
        TRADE {asset.key}
      </div>

      {/* Side toggle */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginBottom: 14, background: 'var(--bg-tertiary)', padding: 3, borderRadius: 6 }}>
        {(['buy', 'sell'] as const).map(s => (
          <button
            key={s}
            onClick={() => setSide(s)}
            style={{
              padding: '7px',
              border: 'none',
              borderRadius: 4,
              background: side === s ? (s === 'buy' ? 'var(--green)' : 'var(--red)') : 'transparent',
              color: side === s ? '#fff' : 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.06em',
              transition: 'all 0.15s',
            }}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Amount input */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 5 }}>Amount (USD)</div>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>$</span>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 10px 9px 22px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border)',
              borderRadius: 5,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Quick amounts */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
        {[100, 500, 1000, 5000].map(amt => (
          <button key={amt} onClick={() => setAmount(String(amt))} style={{
            flex: 1, padding: '4px 0',
            background: 'var(--bg-tertiary)', border: '1px solid var(--border)',
            borderRadius: 3, color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)', fontSize: 10, cursor: 'pointer',
          }}>
            ${amt >= 1000 ? `${amt / 1000}k` : amt}
          </button>
        ))}
      </div>

      {/* Receive */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 5 }}>You receive ({asset.unit})</div>
        <div style={{
          padding: '9px 10px',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border)',
          borderRadius: 5,
          fontFamily: 'var(--font-mono)',
          fontSize: 14,
          color: asset.color,
        }}>
          {formatReceive(receive)} <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>{asset.unit}</span>
        </div>
      </div>

      {/* Order summary */}
      <div style={{ padding: '8px 10px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: 5, marginBottom: 12 }}>
        {[
          { label: 'Market price', value: formatPrice(asset.price) },
          { label: 'Network fee (0.1%)', value: `$${fee.toFixed(2)}` },
          { label: 'Settlement', value: asset.chain },
        ].map(row => (
          <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{row.label}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)' }}>{row.value}</span>
          </div>
        ))}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: '11px',
          background: submitted ? 'var(--green)' : side === 'buy' ? 'var(--green)' : 'var(--red)',
          border: 'none',
          borderRadius: 5,
          color: '#fff',
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          letterSpacing: '0.06em',
          transition: 'opacity 0.15s',
          opacity: submitted ? 0.7 : 1,
        }}
      >
        {submitted ? 'ORDER PLACED' : `${side === 'buy' ? 'BUY' : 'SELL'} ${asset.key}`}
      </button>

      <div style={{ fontSize: 10, color: 'var(--text-muted)', textAlign: 'center', marginTop: 8 }}>
        Powered by Ndeipi rails · ABSA custody · Polygon settlement
      </div>
    </div>
  );
}
