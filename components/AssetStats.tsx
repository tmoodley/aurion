'use client';
import { Asset } from '@/lib/assets';

const SIGNAL_COLORS: Record<string, string> = {
  BUY: '#2ECC8A',
  ACCUMULATE: '#4A9ECC',
  HOLD: '#C9A84C',
  SELL: '#E05252',
};

export default function AssetStats({ asset }: { asset: Asset }) {
  const up = asset.changePct >= 0;
  const fmt = (p: number) => p > 1000 ? '$' + p.toLocaleString() : '$' + p.toFixed(2);

  const s: Record<string, React.CSSProperties> = {
    bar: {
      height: 44,
      background: '#0F1318',
      borderBottom: '1px solid rgba(201,168,76,0.12)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      gap: 24,
      flexShrink: 0,
    },
    name: {
      fontFamily: 'IBM Plex Mono, monospace',
      fontWeight: 600,
      fontSize: 14,
      color: asset.color,
      letterSpacing: '0.06em',
    },
    fullName: {
      fontSize: 11,
      color: '#4A4844',
    },
    price: {
      fontFamily: 'IBM Plex Mono, monospace',
      fontSize: 18,
      fontWeight: 500,
      color: '#E8E4D9',
    },
    chg: {
      fontFamily: 'IBM Plex Mono, monospace',
      fontSize: 12,
      color: up ? '#2ECC8A' : '#E05252',
    },
    stat: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 1,
    },
    statLabel: {
      fontSize: 9,
      color: '#4A4844',
      letterSpacing: '0.1em',
      fontFamily: 'IBM Plex Mono, monospace',
    },
    statVal: {
      fontFamily: 'IBM Plex Mono, monospace',
      fontSize: 12,
      color: '#8A8880',
    },
    divider: {
      width: 1,
      height: 24,
      background: 'rgba(255,255,255,0.07)',
    },
    signal: {
      marginLeft: 'auto',
      padding: '3px 10px',
      border: `1px solid ${SIGNAL_COLORS[asset.signal]}`,
      borderRadius: 2,
      fontFamily: 'IBM Plex Mono, monospace',
      fontSize: 10,
      color: SIGNAL_COLORS[asset.signal],
      letterSpacing: '0.08em',
    },
  };

  return (
    <div style={s.bar}>
      <div>
        <div style={s.name}>{asset.name}</div>
        <div style={s.fullName}>{asset.fullName}</div>
      </div>
      <div style={s.divider} />
      <div>
        <div style={s.price}>{fmt(asset.price)}</div>
        <div style={s.chg}>{up ? '+' : ''}{asset.change24h.toFixed(asset.price > 100 ? 0 : 2)} ({up ? '+' : ''}{asset.changePct.toFixed(2)}%)</div>
      </div>
      <div style={s.divider} />
      <div style={s.stat}>
        <span style={s.statLabel}>24H HIGH</span>
        <span style={s.statVal}>{fmt(asset.high24h)}</span>
      </div>
      <div style={s.stat}>
        <span style={s.statLabel}>24H LOW</span>
        <span style={s.statVal}>{fmt(asset.low24h)}</span>
      </div>
      <div style={s.stat}>
        <span style={s.statLabel}>VOLUME</span>
        <span style={s.statVal}>{asset.volume24h}</span>
      </div>
      <div style={s.stat}>
        <span style={s.statLabel}>CHAIN</span>
        <span style={s.statVal}>{asset.chain}</span>
      </div>
      <div style={s.signal}>{asset.signal}</div>
    </div>
  );
}
