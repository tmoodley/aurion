'use client';
import { ASSETS, AssetKey } from '@/lib/assets';

interface Props {
  selected: AssetKey;
  onSelect: (key: AssetKey) => void;
}

export default function AssetSidebar({ selected, onSelect }: Props) {
  const formatPrice = (price: number) =>
    price > 1000 ? `$${price.toLocaleString()}` : `$${price.toFixed(2)}`;

  return (
    <div style={{
      width: 200,
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border)',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ padding: '12px 14px 8px', borderBottom: '1px solid var(--border)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>MARKETS</span>
      </div>

      {Object.values(ASSETS).map((asset) => {
        const isSelected = asset.key === selected;
        return (
          <button
            key={asset.key}
            onClick={() => onSelect(asset.key)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '10px 14px',
              background: isSelected ? 'rgba(201,168,76,0.08)' : 'transparent',
              borderLeft: isSelected ? `2px solid ${asset.color}` : '2px solid transparent',
              border: 'none',
              borderRight: 'none',
              borderTop: 'none',
              borderBottom: '1px solid var(--border)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'background 0.15s',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: isSelected ? asset.color : 'var(--text-primary)' }}>
                {asset.key}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                {formatPrice(asset.price)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{asset.name}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: asset.delta >= 0 ? 'var(--green)' : 'var(--red)' }}>
                {asset.delta >= 0 ? '+' : ''}{asset.delta.toFixed(1)}%
              </span>
            </div>
          </button>
        );
      })}

      {/* Ndeipi rail indicator */}
      <div style={{ marginTop: 'auto', padding: '12px 14px', borderTop: '1px solid var(--border)' }}>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.06em' }}>ORACLE NETWORK</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} className="animate-pulse-gold" />
          <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Ndeipi rails live</span>
        </div>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>NodeBoss: 200 nodes</div>
        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Migodi-Auric: active</div>
      </div>
    </div>
  );
}
