'use client';
import { ASSETS, AssetKey } from '@/lib/assets';

interface Props {
  selected: AssetKey;
  onSelect: (k: AssetKey) => void;
}

export default function AssetSidebar({ selected, onSelect }: Props) {
  const keys: AssetKey[] = ['BTC', 'AGD', 'COOP', 'NDX', 'COPPER'];

  const s: Record<string, React.CSSProperties> = {
    sidebar: {
      width: 160,
      flexShrink: 0,
      background: '#0E1117',
      borderRight: '1px solid rgba(201,168,76,0.15)',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
    },
    sectionLabel: {
      fontSize: 9,
      color: '#4A4844',
      letterSpacing: '0.12em',
      padding: '10px 12px 6px',
      fontFamily: 'IBM Plex Mono, monospace',
    },
    item: (active: boolean): React.CSSProperties => ({
      padding: '10px 12px',
      cursor: 'pointer',
      background: active ? '#161D26' : 'transparent',
      borderLeft: active ? '2px solid #C9A84C' : '2px solid transparent',
      transition: 'all 0.15s',
    }),
    assetName: (active: boolean): React.CSSProperties => ({
      fontFamily: 'IBM Plex Mono, monospace',
      fontSize: 12,
      fontWeight: 500,
      color: active ? '#C9A84C' : '#E8E4D9',
      letterSpacing: '0.04em',
    }),
    fullName: {
      fontSize: 10,
      color: '#4A4844',
      marginTop: 1,
    },
    priceRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 4,
    },
    price: {
      fontFamily: 'IBM Plex Mono, monospace',
      fontSize: 11,
      color: '#8A8880',
    },
    divider: {
      height: 1,
      background: 'rgba(255,255,255,0.05)',
      margin: '4px 12px',
    },
    oracleBox: {
      margin: 10,
      padding: '8px 10px',
      background: '#131820',
      border: '1px solid rgba(201,168,76,0.12)',
      borderRadius: 3,
      marginTop: 'auto',
    },
    oracleLabel: {
      fontSize: 9,
      color: '#4A4844',
      fontFamily: 'IBM Plex Mono, monospace',
      letterSpacing: '0.08em',
    },
    oracleVal: {
      fontSize: 11,
      color: '#2ECC8A',
      fontFamily: 'IBM Plex Mono, monospace',
      marginTop: 3,
    },
  };

  const fmt = (p: number) =>
    p > 1000 ? '$' + p.toLocaleString() : p < 100 ? '$' + p.toFixed(2) : '$' + p.toFixed(2);

  return (
    <div style={s.sidebar}>
      <div style={s.sectionLabel}>MARKETS</div>
      {keys.map((k) => {
        const a = ASSETS[k];
        const active = k === selected;
        const up = a.changePct >= 0;
        return (
          <div key={k} style={s.item(active)} onClick={() => onSelect(k)}>
            <div style={s.assetName(active)}>{a.name}</div>
            <div style={s.fullName}>{a.fullName}</div>
            <div style={s.priceRow}>
              <span style={s.price}>{fmt(a.price)}</span>
              <span style={{ fontSize: 10, color: up ? '#2ECC8A' : '#E05252', fontFamily: 'IBM Plex Mono, monospace' }}>
                {up ? '+' : ''}{a.changePct.toFixed(2)}%
              </span>
            </div>
          </div>
        );
      })}

      <div style={s.divider} />
      <div style={s.oracleBox}>
        <div style={s.oracleLabel}>NODEBOSS ORACLE</div>
        <div style={s.oracleVal}>200 nodes</div>
        <div style={{ fontSize: 10, color: '#4A4844', marginTop: 2 }}>Zambia / Global</div>
      </div>
    </div>
  );
}
