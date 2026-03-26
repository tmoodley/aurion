'use client';
import { Asset } from '@/lib/assets';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Props { asset: Asset; }

export default function AssetStats({ asset }: Props) {
  const formatPrice = (price: number) =>
    price > 1000 ? `$${price.toLocaleString()}` : `$${price.toFixed(2)}`;

  const isUp = asset.delta >= 0;

  const stats = [
    { label: '24H HIGH', value: formatPrice(asset.price * 1.015) },
    { label: '24H LOW', value: formatPrice(asset.price * 0.984) },
    { label: 'VOLUME', value: asset.volume },
    { label: 'MARKET', value: asset.market },
  ];

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border)',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      flexWrap: 'wrap',
    }}>
      <div>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)' }}>
          {asset.key} / USD
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 2 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 600, color: asset.color }}>
            {formatPrice(asset.price)}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: isUp ? 'var(--green)' : 'var(--red)' }}>
            {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              {isUp ? '+' : ''}{asset.delta.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div style={{ width: 1, height: 32, background: 'var(--border)' }} />

      {stats.map(s => (
        <div key={s.label}>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)', marginBottom: 2 }}>{s.label}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-secondary)' }}>{s.value}</div>
        </div>
      ))}

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6,
        padding: '4px 12px', background: `${asset.signalColor}15`,
        border: `1px solid ${asset.signalColor}40`, borderRadius: 4 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: asset.signalColor }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: asset.signalColor, letterSpacing: '0.06em' }}>
          {asset.signal}
        </span>
      </div>
    </div>
  );
}
